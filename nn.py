import os
import re
import sys
import urllib3
import requests

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

os.environ['SSL_CERT_FILE'] = '/etc/ssl/cert.pem'
os.environ['REQUESTS_CA_BUNDLE'] = '/etc/ssl/cert.pem'

PUBLIC_URL = "https://disk.yandex.ru/d/trP0tdta3healQ"
TARGET_EXTENSIONS = ['js', 'html', 'css']
OUTPUT_DIR = "lab3-react"
FILE_FILTER = "var03"

API_BASE = "https://cloud-api.yandex.net/v1/disk/public/resources"


def normalize_extensions(exts):
    return {e.lower().lstrip('.') for e in exts}


def get_public_meta(public_key, path=None):
    params = {'public_key': public_key}
    if path:
        params['path'] = path
    try:
        response = requests.get(API_BASE, params=params, timeout=15, verify=False)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"  [!] HTTP ошибка: {e}")
        return None
    ctype = response.headers.get('Content-Type', '')
    if 'application/json' not in ctype:
        print(f"  [!] Сервер вернул не JSON ({ctype}).")
        print("     ", response.text[:200])
        return None
    return response.json()


def get_download_url(public_key, path):
    params = {'public_key': public_key, 'path': path}
    try:
        response = requests.get(
            f"{API_BASE}/download",
            params=params,
            timeout=15,
            verify=False,
        )
        response.raise_for_status()
        return response.json().get('href')
    except Exception as e:
        print(f"  [!] Не удалось получить ссылку для {path}: {e}")
        return None


def download_file(url, local_path):
    try:
        with requests.get(url, stream=True, timeout=60, verify=False) as r:
            r.raise_for_status()
            os.makedirs(os.path.dirname(local_path) or '.', exist_ok=True)
            with open(local_path, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
        print(f"  [+] Скачан: {local_path}")
        return True
    except Exception as e:
        print(f"  [!] Ошибка скачивания {local_path}: {e}")
        return False


def folder_to_task_name(folder_name):
    match = re.search(r'№\s*(\d+)', folder_name)
    if match:
        return f"task{match.group(1)}"
    if 'итоговое' in folder_name.lower():
        return 'task_final'
    return None


def handle_file(public_key, item, local_dir, target_exts, base_name, counter):
    name = item.get('name', '')
    path = item.get('path')
    ext = os.path.splitext(name)[1].lower().lstrip('.')

    if ext not in target_exts:
        return

    if FILE_FILTER and FILE_FILTER.lower() not in name.lower():
        return

    if base_name is None:
        new_name = name
    else:
        counter[base_name] = counter.get(base_name, 0) + 1
        suffix = f"_{counter[base_name]}" if counter[base_name] > 1 else ""
        new_name = f"{base_name}{suffix}{os.path.splitext(name)[1]}"

    print(f"[*] {name}  ->  {new_name}")
    url = get_download_url(public_key, path)
    if url:
        download_file(url, os.path.join(local_dir, new_name))


def process_folder(public_key, remote_path, local_dir, target_exts, base_name, counter):
    meta = get_public_meta(public_key, remote_path)
    if not meta:
        return
    if meta.get('type') != 'dir':
        handle_file(public_key, meta, local_dir, target_exts, base_name, counter)
        return

    items = meta.get('_embedded', {}).get('items', [])
    for item in items:
        item_type = item.get('type')
        item_name = item.get('name')
        item_path = item.get('path')
        local_path = os.path.join(local_dir, item_name)

        if item_type == 'dir':
            sub_base = folder_to_task_name(item_name) or base_name
            process_folder(public_key, item_path, local_path, target_exts, sub_base, counter)
        elif item_type == 'file':
            handle_file(public_key, item, local_dir, target_exts, base_name, counter)


def main():
    if not PUBLIC_URL:
        print("Укажите PUBLIC_URL в настройках скрипта.")
        sys.exit(1)

    target_exts = normalize_extensions(TARGET_EXTENSIONS)

    print(f"[*] Подключение к ресурсу: {PUBLIC_URL}")
    root_meta = get_public_meta(PUBLIC_URL)
    if not root_meta:
        print("Не удалось получить информацию. Проверьте ссылку.")
        sys.exit(1)

    print(f"[*] Тип ресурса: {root_meta.get('type')}")
    print(f"[*] Имя: {root_meta.get('name')}")

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"[*] Сохраняем в: {os.path.abspath(OUTPUT_DIR)}")
    print(f"[*] Ищем расширения: {', '.join(sorted(target_exts))}")
    print(f"[*] Фильтр по имени: {FILE_FILTER}")
    print("-" * 50)

    counter = {}

    if root_meta.get('type') == 'dir':
        items = root_meta.get('_embedded', {}).get('items', [])
        for item in items:
            item_type = item.get('type')
            item_name = item.get('name')
            item_path = item.get('path')
            local_path = os.path.join(OUTPUT_DIR, item_name)

            if item_type == 'dir':
                base_name = folder_to_task_name(item_name)
                process_folder(PUBLIC_URL, item_path, local_path, target_exts, base_name, counter)
            elif item_type == 'file':
                handle_file(PUBLIC_URL, item, OUTPUT_DIR, target_exts, None, counter)
    else:
        handle_file(PUBLIC_URL, root_meta, OUTPUT_DIR, target_exts, None, counter)

    print("-" * 50)
    print("[+] Готово.")


if __name__ == "__main__":
    main()
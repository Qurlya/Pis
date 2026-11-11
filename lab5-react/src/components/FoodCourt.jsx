const foodCourtItems = [
  'Более 20 кафе и ресторанов',
  'Детская зона с аниматорами',
  'Wi-Fi и зарядные станции',
  'Ежедневно с 10:00 до 22:00',
]

function FoodCourt() {
  return (
    <section className="food-court">
      <div className="food-court-copy">
        <h2>Фуд-корт</h2>
        <p>
          На третьем этаже ТЦ «Галерея» работает уютный фуд-корт более чем на
          400 посадочных мест. Здесь представлены кухни мира: итальянская,
          японская, кавказская и домашние десерты, а также кофейни с
          собственным зерном.
        </p>
        <ul className="food-court-list">
          {foodCourtItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <figure className="food-court-figure">
        <img src="/image.jpg" alt="Фуд-корт ТЦ «Галерея»" />
        <figcaption>Панорама фуд-корта ТЦ «Галерея»</figcaption>
      </figure>
    </section>
  )
}

export default FoodCourt

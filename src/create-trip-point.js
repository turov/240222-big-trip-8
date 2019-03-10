export default (point) => {
  const tripPoint = document.createElement(`article`);
  tripPoint.classList.add(`trip-point`);
  tripPoint.innerHTML = ` <i class="trip-icon">${point.type}</i>
  <h3 class="trip-point__title">${point.title}</h3>
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${point.time}</span>
    <span class="trip-point__duration">1h 30m</span>
  </p>
  <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
  <ul class="trip-point__offers">
    ${point.offers.map((element) => {
    return `<li>
      <button class="trip-point__offer">${element} +&euro;&nbsp;20</button>
    </li>`;
  }).join(``)}
  </ul>`;
  return tripPoint;
};

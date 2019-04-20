import moment from 'moment';

const createOffersTemplate = (offers) => offers
  .filter((offer) => offer.accepted)
  .map((offer) => (
    `<li>
      <button class="trip-point__offer">
        ${offer.title} +&euro;&nbsp;${offer.price}
      </button>
    </li>`
  ))
  .join(``);


const createTimetableTemplate = (point) => (
  `<span class="trip-point__timetable">
    ${point.time.timeStart} — ${point.time.timeEnd}
  </span>`
);

const createDurationTemplate = (point) => (
  `<span class="trip-point__duration">
    ${moment(point.time.timeEnd - point.time.timeStart).format(`hh:mm`)}
  </span>`
);

export const createPointTemplate = (point) => (
  `<article class="trip-point">
    <i class="trip-icon">${point.type}</i>
    <h3 class="trip-point__title">${point.city}</h3>
    <p class="trip-point__schedule">
      ${createTimetableTemplate(point)}
      ${createDurationTemplate(point)}
    </p>
    <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
    <ul class="trip-point__offers">
      ${createOffersTemplate(point.offers)}
    </ul>
  </article>`
);

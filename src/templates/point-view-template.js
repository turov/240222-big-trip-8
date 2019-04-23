import moment from 'moment';

const createOffersTemplate = (offers) => offers
  .filter((offer) => offer.accepted)
  .map((offer) => (
    `<li>
      <button class="trip-point__offer">
        ${offer.title} +&euro;&nbsp;${offer.price}
      </button>
    </li>`
  )).splice(0, 3)
  .join(``);

const createTimeDuration = (time) => {
  const duration = moment(((moment(time.end)).diff(moment(time.start)))).format(`HH:mm`);

  // @TODO
  return duration;
};

export const createPointTemplate = ({point}) => (
  `<article class="trip-point">
    <i class="trip-icon">${point.type}</i>
    <h3 class="trip-point__title">${point.city}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">
        ${moment(point.time.start).format(`HH:mm`)} <br>
        ${moment(point.time.end).format(`HH:mm`)}
      </span>
      <span class="trip-point__duration">
        ${createTimeDuration(point.time)}
      </span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
    <ul class="trip-point__offers">
      ${createOffersTemplate(point.offers)}
    </ul>
  </article>`
);

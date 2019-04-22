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


// const createTimetable = (time) => (`${moment(time.start).format(`H:mm`)} - ${moment(time.end).format(`H:mm`)}`);

const createTimeDuration = (time) => {
  const duration = moment.duration(moment(time.end).diff(moment(time.start)));
  const days = duration.days();
  return days > 0 ? `${days}D ${duration.hours()}H ${duration.minutes()}M` : `${duration.hours()}H ${duration.minutes()}M`;
};

const getTime = (timestamp) => {
  const date = new Date();
  date.setTime(timestamp);
  return date;
};

export const createPointTemplate = ({point}) => (
  `<article class="trip-point">
    <i class="trip-icon">${point.type}</i>
    <h3 class="trip-point__title">${point.city}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">
        ${getTime(point.time.start).getHours()} : ${getTime(point.time.start).getMinutes()} - ${getTime(point.time.end).getHours()} : ${getTime(point.time.end).getMinutes()}
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

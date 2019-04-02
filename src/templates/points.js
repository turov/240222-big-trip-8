import moment from 'moment';

const createOffersTemplate = (point) => {
  const content = (point.offers).map((element) => {
    return `<li>
            <button class="trip-point__offer">${element} +&euro;&nbsp;20</button>
        </li>`;
  }).join(``);

  return (
    `<ul class="trip-point__offers">
      ${content}
    </ul>`
  );
};

const createTimetableTemplate = (point) => `<span class="trip-point__timetable">${moment(point.time.timeStart).format(`hh:mm`)} — ${moment(point.time.timeEnd).format(`hh:mm`)}</span>`;

const createDurationTemplate = (point) => `<span class="trip-point__duration">${moment(moment(point.time.timeEnd).diff(moment(point.time.timeStart))).format(`H`)}h ${moment(moment(point.time.timeEnd).diff(moment(point.time.timeStart))).format(`mm`)}m</span>`;

export const createPointTemplate = (point) => {
  return (
    `<article class="trip-point">
      <i class="trip-icon">${point.type}</i>
      <h3 class="trip-point__title">${point.city}</h3>
      <p class="trip-point__schedule"></p>
        ${createTimetableTemplate(point)}
        ${createDurationTemplate(point)}
      </p>
      <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
      ${createOffersTemplate(point)}
    </article>`
  );
};

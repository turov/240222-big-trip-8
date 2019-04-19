import moment from 'moment';

const content = (array) => array.map((element) => {
  if (element.accepted) {
    return `<li>
          <button class="trip-point__offer">${element.title} +&euro;&nbsp;${element.price}</button>
       </li>`;
  }
}).join(``);


const createTimetableTemplate = (point) => `<span class="trip-point__timetable">${point.time.timeStart} — ${point.time.timeEnd}</span>`;

const createDurationTemplate = (point) => `<span class="trip-point__duration">${moment(point.time.timeEnd - point.time.timeStart).format(`hh:mm`)}</span>`;

export const createPointTemplate = (point) => {
  return (
    `<article class="trip-point">
      <i class="trip-icon">${point.type}</i>
      <h3 class="trip-point__title">${point.city}</h3>
      <p class="trip-point__schedule">
        ${createTimetableTemplate(point)}
        ${createDurationTemplate(point)}

      </p>
      <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
      <ul class="trip-point__offers">



        ${content(point.offers)}
      </ul>
    </article>`
  );
};

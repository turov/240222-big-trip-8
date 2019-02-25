export const tripFilter = document.querySelector(`.trip-filter`);
export const tripContainer = document.querySelector(`.trip-day__items`);

export const getRandomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

export const FILTER_PROPS = [{
  value: `everything`,
  checked: `checked`,
  disabled: ``
},
{
  value: `future`,
  checked: ``,
  disabled: ``
},
{
  value: `past`,
  checked: ``,
  disabled: ``
}
];

// @TODO
export const tripFilter = document.querySelector(`.trip-filter`);
export const tripContainer = document.querySelector(`.trip-day__items`);

// Случайный порядок в массиве
export const mixArray = () => {
  return Math.random() - 0.5;
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

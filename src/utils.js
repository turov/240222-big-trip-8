export const tripFilter = document.querySelector(`.trip-filter`);
export const tripContainer = document.querySelector(`.trip-day__items`);

// Функция нахождения случайного числа от min до max
export const getRandomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// Функция нахождения случайного числа от min до max кратного num
export const getRandomInt = (min, max, num) => {
  let number = Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
  if (number < 10) {
    return (`0` + number);
  } else {
    return number;
  }
};

// Случайный элемент массива
export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Случайное булево значение
export const getRandomBoolean = () => {
  return (Math.random() >= 0.5);
};

// Случайный порядок в массиве
export const mixArray = () => {
  return Math.random() - 0.5;
};

// Функция получения даты
// getHours getDate getMonth getYear getMinuts
export const getDate = (timeStamp) => {
  const date = new Date();
  date.setTime(timeStamp);
  return date;
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

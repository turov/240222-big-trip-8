import {getRandomItem, generateRandomInteger} from '../lib/random';

const PRICE_LIMIT_MIN = 1;
const PRICE_LIMIT_MAX = 100;
const OFFERS = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];
const CITITES = [
  `Amsterdam`,
  `Geneva`,
  `Charmonix`,
  `Paris`,
  `London`
];
const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const TYPES = {
  taxi: `🚕`,
  bus: `🚌`,
  train: `🚂`,
  ship: `🛳`,
  transport: `🚊`,
  drive: `🚘`,
  flight: `✈️`,
  checkin: `🏨`,
  sightseeing: `🏛`,
  restaraunt: `🍴`
};

export {TYPES};

const generateText = (items, min, max) => (
  items
  .slice(0, items.length)
  .sort(() => Math.random() - 0.5)
  .slice(0, generateRandomInteger(min, max)
  )
);

const getTime = () => {
  const generateRandomDate = (Date.now() + (generateRandomInteger(1, 24) * generateRandomInteger(1, 60) * 60 * 1000));
  const time = {
    timeStart: generateRandomDate,
    timeEnd: generateRandomDate + generateRandomInteger(60000, 90000)
  };
  return time;
};

export const generatePointData = () => {
  const point = {
    type: getRandomItem(Object.values(TYPES)),
    description: generateText(DESCRIPTIONS, 1, 3).join(` `),
    city: getRandomItem(CITITES),
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    offers: generateText(OFFERS, 0, 2),
    time: getTime(),
    price: generateRandomInteger(PRICE_LIMIT_MIN, PRICE_LIMIT_MAX),
    isFavorite: false
  };
  return point;
};

export const generatePointsData = (count) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push(generatePointData());
  }
  return points;
};

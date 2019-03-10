import {getRandomItem, getRandomInteger, mixArray, getRandomInt} from './utils.js';

const types = {
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
const cities = [`Amsterdam`, `Geneva`, `Charmonix`, `Paris`, `London`];
const offers = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];
const titleString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getTitle = () => {
  const titles = titleString.split(`.`);
  return titles.sort(mixArray).splice(0, getRandomInteger(1, 2)).join(`.`);
};

const getCity = () => {
  return getRandomItem(cities);
};

const getType = () => {
  return getRandomItem(Object.values(types));
};

const getPicture = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

const getOffers = () => {
  offers.sort(mixArray);
  let offerList = offers.slice(0, getRandomInteger(0, 3));
  return offerList;
};

const getTime = () => {
  let time = getRandomInteger(1, 23);
  const timeString = time + `:` + getRandomInt(0, 55, 5) + `&mdash;` + (time + 1) + `:` + getRandomInt(0, 55, 5);
  return timeString;
};

const getPrice = () => {
  return getRandomInteger(1, 100);
};

export const generatePoint = () => {
  const point = {
    type: getType(),
    title: getTitle(),
    city: getCity(),
    picture: getPicture(),
    offers: getOffers(),
    time: getTime(),
    price: getPrice(),
  };
  return point;
};

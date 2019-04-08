export const generateRandomInteger = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));
export const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];
export const getRandomBoolean = () => Math.random() >= 0.5;

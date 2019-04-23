import moment from 'moment';

export default {
  type: `🚂`,
  description: ``,
  city: ``,
  pictures: [],
  offers: ``,
  time: {
    start: moment().unix(),
    end: moment().add(5, `hour`).unix(),
  },
  price: 0,
  isFavorite: false
};

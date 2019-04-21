import {TYPES} from '../mocks/points';

export default class ModelPoint {
  static normalizeType(type) {
    if (type === `check-in`) {
      return TYPES[`checkin`];
    }

    if (type === `🚂`) {
      return TYPES[`train`];
    }

    return TYPES[type];
  }

  static normalizeOffer(offer) {
    offer.id = offer.title.toLowerCase().replace(/ /g, `-`);
    return offer;
  }

  static parsePoint(data) {
    return {
      id: data.id,
      type: ModelPoint.normalizeType(data.type),
      price: data[`base_price`],
      city: data.destination.name,
      description: data.destination.description,
      time: {
        start: data[`date_from`],
        end: data[`date_to`],
      },
      pictures: data.destination.pictures,
      offers: data.offers.map(ModelPoint.normalizeOffer),
      isFavourite: data[`is_favorite`],
    };
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}

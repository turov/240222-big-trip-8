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

  // backend -> model
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

  static parseDestination(data) {
    return data.name;
  }

  static parseDestinations(data) {
    return data.map(ModelPoint.parseDestination);
  }

  // model -> backend
  static toRAW(data) {
    return {
      'id': data.id,
      'price': data.price,
      'destination': {
        'name': data.city,
        'description': data.description,
        'pictures': data.pictures
      },
      'date_from': data.time.start,
      'date_to': data.time.end,
      'offers': data.offers,
      'is_favorite': data.isFavourite,
      'type': data.type

      // @TODO
    };
  }
}

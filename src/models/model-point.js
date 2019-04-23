import _ from 'lodash';
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
    const offers = _.get(data, `destination.offers`, []);

    return {
      id: _.get(data, `id`, null),
      type: ModelPoint.normalizeType(_.get(data, `type`, null)),
      price: _.get(data, `base_price`, null),
      city: _.get(data, `destination.name`, null),
      description: _.get(data, `destination.description`, null),
      time: {
        start: _.get(data, `date_from`, null),
        end: _.get(data, `date_to`, null)
      },
      pictures: _.get(data, `destination.pictures`, []),
      offers: offers.map(ModelPoint.normalizeOffer),
      isFavourite: _.get(data, `is_favorite`, false)
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
  // @TODO
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

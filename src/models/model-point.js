import _ from 'lodash';
import {TYPES} from '../mocks/types';

const NUMBER_THOUSAND = 1000;

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

  static normalizeTime(time) {
    return Math.round(time / NUMBER_THOUSAND);
  }

  static normalizeOffer(offer) {
    offer.id = offer.title.toLowerCase().replace(/ /g, `-`);
    return offer;
  }

  static parsePoint(data) {
    const offers = _.get(data, `offers`, []);

    return {
      id: _.get(data, `id`, null),
      type: ModelPoint.normalizeType(_.get(data, `type`, null)),
      price: _.get(data, `base_price`, 0),
      city: _.get(data, `destination.name`, ``),
      description: _.get(data, `destination.description`, ``),
      time: {
        start: parseInt(_.get(data, `date_from`), 10),
        end: parseInt(_.get(data, `date_to`), 10)
      },
      pictures: _.get(data, `destination.pictures`, []),
      offers: Array.isArray(offers) ? offers.map(ModelPoint.normalizeOffer) : [],
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
      'base_price': data.price,
      'destination': {
        'name': data.city,
        'description': data.description,
        'pictures': data.pictures
      },
      'description': data.description,
      'date_from': data.time.start,
      'date_to': data.time.end,
      'offers': data.offers,
      'is_favorite': data.isFavourite,
      'type': data.type

      // @TODO
    };
  }
}

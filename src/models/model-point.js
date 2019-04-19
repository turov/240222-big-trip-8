import {TYPES} from '../mocks/points';

export default class ModelPoint {
  static parsePoint(data) {
    let pointData = {
      time: {}
    };
    pointData.type = TYPES[(data.type)];
    pointData.price = data[`base_price`];
    pointData.city = data.destination.name;
    pointData.description = data.destination.description;
    pointData.time.timeStart = data[`date_from`];
    pointData.time.timeEnd = data[`date_to`];
    pointData.pictures = data.destination.pictures;
    pointData.offers = data.offers;
    pointData.isFavourite = data[`is_favorite`];
    pointData.id = data.id;
    return pointData;
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}

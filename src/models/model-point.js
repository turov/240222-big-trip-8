import {TYPES} from '../mocks/points';

export default class ModelPoint {
  static parsePoint(data) {
    let pointData = { // @CHECK
      time: {}
    };

    if (data.type === `check-in`) {
      data.type = `checkin`;
    } else if (data.type === `🚂`) {
      data.type = `train`;
    } else {
      data.type = data.type;
    }

    pointData.id = data.id;
    pointData.type = TYPES[(data.type)];
    pointData.price = data[`base_price`];
    pointData.city = data.destination.name;
    pointData.description = data.destination.description;
    pointData.time.timeStart = data[`date_from`];
    pointData.time.timeEnd = data[`date_to`];
    pointData.pictures = data.destination.pictures;
    pointData.offers = data.offers;
    pointData.isFavourite = data[`is_favorite`];

    return pointData;
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}

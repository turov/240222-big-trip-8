import ModelPoint from '../models/model-point';

const STATUS_OK = 200;
const STATUS_REDIRECT = 300;

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= STATUS_OK & response.status < STATUS_REDIRECT) {
    return response;
  }
};

const toJSON = (response) => response.json();

export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then(toJSON)
      .then((data) => {
        return data;
      })
      .then(ModelPoint.parsePoints);
  }

  createPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(ModelPoint.toRAW(point)),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelPoint.parseTask);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(toJSON)
      .then((data) => {
        return data;
      })
      .then(ModelPoint.parseDestinations);
  }

  updatePoints(points = []) {
    return Promise.all(
        points.map((point) => this.updatePoint(point))
    );
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(ModelPoint.toRAW(point)),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelPoint.parseTask);
  }

  deletePoint({id}) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}


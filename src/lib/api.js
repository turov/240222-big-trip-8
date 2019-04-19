import ModelPoint from '../models/model-point';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const GOOD_REQUEST = 200;
const REDIRECT_REQUEST = 300;

const checkStatus = (response) => {
  if (response.status >= GOOD_REQUEST & response.status < REDIRECT_REQUEST) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => response.json();
// const toSet = (response) => new Set(Array.from(response));

// const mapOfferToModel = (offer, index) => {
//   /// @TODO
//   return null;
// };

// const offersToObj = (response) => (
//   response
//     .json()
//     .then((items) =>
//       Promise.resolve(items.map(mapOfferToModel))
//     )
// );

// export default class API {
//   constructor({endPoint, authorization}) {
//     this._endPoint = endPoint;
//     this._authorization = authorization;
//   }

//   consoleView(customURL) {
//     console.log(this._load({url: customURL})
//     .then(toJSON));
//   }

//   getPoints() {
//     return this._load({url: `points`})
//     .then(toJSON)
//     .then((data) => Promise.resolve(ModelPoint.sortEventsByDate(data)));
//   }

//   getDestinations() {
//     return this._load({url: `destinations`})
//       .then(toJSON)
//       .then(toSet);
//   }

//   getOffers() {
//     return this._load({url: `offers`}).then(offersToObj);
//   }

//   createPoint({point}) {
//     return this._load({
//       url: `points`,
//       method: Method.POST,
//       body: JSON.stringify(point),
//       headers: new Headers({'Content-Type': `application/json`})
//     })
//       .then(toJSON);
//   }

//   updatePoint({id, data}) {
//     return this._load({
//       url: `points/${id}`,
//       method: Method.PUT,
//       body: JSON.stringify(data),
//       headers: new Headers({'Content-Type': `application/json`})
//     })
//       .then(toJSON);
//   }

//   deletePoint({id}) {
//     return this._load({url: `points/${id}`, method: Method.DELETE});
//   }

//   _load({url, method = Method.GET, body = null, headers = new Headers()}) {
//     headers.append(`Authorization`, this._authorization);

//     return fetch(`${this._endPoint}/${url}`, {method, body, headers})
//       .then(checkStatus)
//       .catch((err) => {
//         console.error(`fetch error: ${err}`);
//         throw err;
//       });
//   }
// };

export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then(toJSON)
      .then(ModelPoint.parsePoints);
  }

  createPoint({point}) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelPoint.parseTask);
  }

  updatePoint({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelPoint.parseTask);
  }

  deleteTask({id}) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}


export const createPointEditTemplate = (point) => {
  return (
    `<article class="point">
       <form action="" method="get">
        <header class="point__header">
          <label class="point__date">
            choose day
            <input class="point__input" type="text" placeholder="MAR 18" name="day">
          </label>

        <div class="travel-way">
          <label class="travel-way__label" for="travel-way__toggle">${point.type}</label>

          <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

          <div class="travel-way__select">
            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travelway" value="taxi">
              <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travelway" value="bus">
              <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travelway" value="train">
              <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travelway" value="train" checked>
              <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
            </div>

            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travelway" value="checkin">
              <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travelway" value="sightseeing">
              <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
            </div>
          </div>
        </div>

        <div class="point__destination-wrap">
          <label class="point__destination-label" for="destination">Flight to</label>
          <input class="point__destination-input" list="destination-select" id="destination" value="${point.city}" name="destination">
          <datalist id="destination-select">
            <option value="airport"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="hotel"></option>
          </datalist>
        </div>

        <label class="point__time">
          choose time
          <input class="point__input point__input--time-start" type="text" value="${point.time.timeStart}" name="timeStart" placeholder="00:00">
          <input class="point__input point__input--time-end" type="text" value="${point.time.timeEnd}" name="timeEnd" placeholder="00:00">
        </label>

        <label class="point__price">
          write price
          <span class="point__price-currency">€</span>
          <input class="point__input" type="text" value="${point.price}" name="price">
        </label>

        <div class="point__buttons">
          <button class="point__button point__button--save" type="submit">Save</button>
          <button class="point__button" type="reset">Delete</button>
        </div>

        <div class="paint__favorite-wrap">
          <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${point.isFavorite ? `checked` : ``}>
          <label class="point__favorite" for="favorite">favorite</label>
        </div>
      </header>

      <section class="point__details">
        <section class="point__offers">
          <h3 class="point__details-title">offers</h3>

          <div class="point__offers-wrap">
          ${(point.offers).map((element) => {
      return `<input class="point__offers-input visually-hidden" type="checkbox" id="${element.toLowerCase().replace(/ /g, `-`)}" name="offer" value="${element.toLowerCase().replace(/ /g, `-`)}">
            <label for="${element.toLowerCase().replace(/ /g, `-`)}" class="point__offers-label">
              <span class="point__offer-service">${element}</span> + €<span class="point__offer-price">30</span>
            </label>`;
    }).join(``)}
          </div>

        </section>
        <section class="point__destination">
          <h3 class="point__details-title">Destination</h3>
          <p class="point__destination-text">${point.description}</p>
          <div class="point__destination-images">
            <img src="${point.picture}" alt="picture from place" class="point__destination-image">
            <img src="http://picsum.photos/300/200?r=1234" alt="picture from place" class="point__destination-image">
            <img src="http://picsum.photos/300/100?r=12345" alt="picture from place" class="point__destination-image">
            <img src="http://picsum.photos/200/300?r=123456" alt="picture from place" class="point__destination-image">
            <img src="http://picsum.photos/100/300?r=1234567" alt="picture from place" class="point__destination-image">
          </div>
        </section>
        <input type="hidden" class="point__total-price" name="total-price" value="">
      </section>
    </form>
  </article>`
  );
};

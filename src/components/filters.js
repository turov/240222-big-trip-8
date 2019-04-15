import Filter from './filter';
import Component from './component';

export default class FiltersComponent extends Component {

  constructor(data) {
    super(data);

    this._filterComponents = [];
  }

  get template() {
    return `<form class="trip-filter"></form>`;
  }

  render() {
    const element = super.render();

    this._filterComponents = this._data.map((filterData) => new Filter(filterData));

    this._filterComponents.forEach((filterComponent) => {
      filterComponent.render();
      filterComponent.onFilter = (filterId) => {
        switch (filterId) {
          case `filter-everything`:
            console.log(`фильтр всё`);
            break;
          case `filter-future`:
            console.log('фильтр предстоящие');
            break;
          case `filter-past`:
            console.log('фильтр прошедее');
            break;
        }
      };

      element.appendChild(filterComponent.render());
    });

    return element;
  }

  unrender() {
    this._filterComponents.forEach((filterComponent) => {
      filterComponent.unrender();
    });

    this._Filtercomponents = null;

    super.unrender();
  }

}

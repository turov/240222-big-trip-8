import BaseComponent from './component';
import ViewComponent from './point-view';
import EditComponent from './point-edit';

export default class PointsComponent extends BaseComponent {
  constructor(data = {points: []}) {
    super(data);

    this._viewComponents = [];
    this._editComponents = [];
  }

  get template() {
    return `<div class="trip-day__items"></div>`;
  }

  set onPointsChanged(fn) {
    this._pointsChangedCallback = fn;
  }

  render() {
    const element = super.render();

    this._viewComponents = this._data.points.map((point) => new ViewComponent(point));
    this._editComponents = this._data.points.map((point) => new EditComponent(point));

    this._viewComponents.forEach((viewComponent, index) => {
      const editComponent = this._editComponents[index];

      viewComponent.onEdit = () => {
        editComponent.render();
        element.replaceChild(editComponent.element, viewComponent.element);
        viewComponent.unrender();
      };

      editComponent.onSubmit = (newPointData) => {
        viewComponent.update(newPointData);
        viewComponent.render();
        element.replaceChild(viewComponent.element, editComponent.element);
        editComponent.unrender();

        const updateIndex = this._viewComponents.findIndex((component) => component === viewComponent);
        this._data.points[updateIndex] = newPointData;

        if (typeof this._pointsChangedCallback === `function`) {
          this._pointsChangedCallback(this._data.points, newPointData);
        }
      };

      editComponent.onDelete = () => {
        element.removeChild(editComponent.element);
        editComponent.unrender();
        viewComponent.unrender();

        const deleteIndex = this._viewComponents.findIndex((component) => component === viewComponent);

        this._viewComponents.splice(deleteIndex, 1);
        this._editComponents.splice(deleteIndex, 1);
        this._data.points.splice(deleteIndex, 1);

        if (typeof this._pointsChangedCallback === `function`) {
          this._pointsChangedCallback(this._data.points);
        }
      };

      element.appendChild(viewComponent.render());
    });

    return element;
  }

  unrender() {
    this._viewComponents.forEach((component) => {
      if (this.element.contains(component.element)) {
        this.element.removeChild(component.element);
      }
      component.unrender();
    });

    this._editComponents.forEach((component) => {
      if (this.element.contains(component.element)) {
        this.element.removeChild(component.element);
      }
      component.unrender();
    });

    this._viewComponents = null;
    this._editComponents = null;

    super.unrender();
  }
}

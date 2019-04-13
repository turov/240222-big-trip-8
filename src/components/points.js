import BaseComponent from './component';
import ViewComponent from './point-view';
import EditComponent from './point-edit';

export default class PointsComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this._viewComponents = [];
    this._editComponents = [];
  }

  get template() {
    return `<div class="trip-day__items"></div>`;
  }

  render() {
    const element = super.render();

    this._viewComponents = this._data.map((point) => new ViewComponent(point));
    this._editComponents = this._data.map((point) => new EditComponent(point));

    this._viewComponents.forEach((viewComponent, index) => {
      const editComponent = this._editComponents[index];

      viewComponent.onEdit = () => {
        editComponent.render();
        element.replaceChild(editComponent.element, viewComponent.element);
        viewComponent.unrender();
      };

      editComponent.onSubmit = (newData) => {
        viewComponent.update(newData);
        viewComponent.render();
        element.replaceChild(viewComponent.element, editComponent.element);
        editComponent.unrender();
      };

      editComponent.onDelete = () => {
        editComponent.unrender();
        this._data[index] = null;
      };

      element.appendChild(viewComponent.render());
    });

    return element;
  }


  unrender() {
    this._viewComponents.forEach((component) => {
      this._element.removeChild(component.element);
      component.unrender();
    });

    this._editComponents.forEach((component) => {
      this._element.removeChild(component.element);
      component.unrender();
    });

    this._viewComponents = null;
    this._editComponents = null;

    super.unrender();
  }
}

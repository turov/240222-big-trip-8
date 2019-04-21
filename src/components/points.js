import BaseComponent from './component';
import ViewComponent from './point-view';
import EditComponent from './point-edit';

const KEYCODE_ESC = 27;

export default class PointsComponent extends BaseComponent {
  constructor(data = {points: [], filterBy: null}) {
    super(data);

    this._viewComponents = [];
    this._editComponents = [];

    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  }

  get template() {
    return `<div class="trip-day__items"></div>`;
  }

  set onPointChanged(fn) {
    this._pointChangedCallback = fn;
  }

  set onPointDeleted(fn) {
    this._pointDeletedCallback = fn;
  }

  render() {
    const element = super.render();

    const points = this._data.filterBy
      ? this._data.points.filter(this._data.filterBy)
      : this._data.points.slice();

    this._viewComponents = points.map((point) => new ViewComponent(point));
    this._editComponents = points.map((point) => new EditComponent(point));

    this._viewComponents.forEach((viewComponent, index) => {
      const editComponent = this._editComponents[index];

      viewComponent.onEdit = () => {
        element.replaceChild(editComponent.render(), viewComponent.element);
        viewComponent.unrender();
      };

      editComponent.onSubmit = (newPointData, blockForm, unblockForm) => {
        const updateIndex = this._viewComponents.findIndex((component) => component === viewComponent);
        this._data.points[updateIndex] = newPointData;

        const blockEditComponent = () => {
          blockForm();
        }

        const unblockEditComponent = () => {
          unblockForm();
          viewComponent.update(newPointData);
          viewComponent.render();
          element.replaceChild(viewComponent.element, editComponent.element);
          editComponent.unrender();
        }

        if (typeof this._pointChangedCallback === `function`) {
          this._pointChangedCallback(
            this._data.points,
            newPointData,
            blockEditComponent,
            unblockEditComponent
          );
        }
      };

      editComponent.onDelete = (deletedPoint) => {
        element.removeChild(editComponent.element);
        editComponent.unrender();
        viewComponent.unrender();

        const deleteIndex = this._viewComponents.findIndex((component) => component === viewComponent);

        this._viewComponents.splice(deleteIndex, 1);
        this._editComponents.splice(deleteIndex, 1);
        this._data.points.splice(deleteIndex, 1);

        if (typeof this._pointDeletedCallback === `function`) {
          this._pointDeletedCallback(this._data.points, deletedPoint);
        }
      };

      element.appendChild(viewComponent.render());
    });

    return element;
  }

  _onDocumentKeyDown(e) {
    if (e.keyCode === KEYCODE_ESC) {
      this._editComponents.forEach((editComponent, index) => {
        if (editComponent.state.isRendered) {
          const viewComponent = this._viewComponents[index];
          viewComponent.render();
          this.element.replaceChild(viewComponent.element, editComponent.element);
          editComponent.unrender();
        }
      });
      e.preventDefault();
    }
  }

  _addListeners() {
    document.addEventListener(`keydown`, this._onDocumentKeyDown);
  }

  _removeListeners() {
    document.removeEventListener(`keydown`, this._onDocumentKeyDown);
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

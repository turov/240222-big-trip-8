import BaseComponent from './component';
import ViewComponent from './point-view';
import EditComponent from './point-edit';
import emptyPoint from '../mocks/empty-point';

const KEYCODE_ESC = 27;

const dataDefault = {
  points: [],
  destinations: [],
  filterBy: null
};

export default class Points extends BaseComponent {
  constructor(data = dataDefault) {
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

  set onPointCreated(fn) {
    this._pointCreatedCallback = fn;
  }

  renderCreatePoint() {
    const {destinations} = this._data;
    this._createComponent = new EditComponent({point: emptyPoint, destinations});

    this._createComponent.onSubmit = (newPointData, {block, unblock}) => {
      const nextPoints = this._data.points.slice();
      nextPoints.unshift(newPointData);

      const callback = {
        block,
        unblock,
        revert: () => {
          const {prevElement, nextElement} = this._createComponent.rerender({
            point: emptyPoint
          });

          this._element.replaceChild(nextElement, prevElement);
        },
        commit: () => {
          const {prevElement, nextElement} = this._createComponent.rerender({
            point: emptyPoint
          });

          this._element.replaceChild(nextElement, prevElement);
          this._createComponent.hide();

          const viewComponent = new ViewComponent({point: newPointData});
          const editComponent = new EditComponent({point: newPointData, destinations});

          this._viewComponents.push(viewComponent);
          this._editComponents.push(editComponent);

          this._element.appendChild(viewComponent.render());
        }
      };

      if (typeof this._pointCreatedCallback === `function`) {
        this._pointCreatedCallback(nextPoints, newPointData, callback);
      }
    };

    this._createComponent.onDelete = () => {
      const {prevElement, nextElement} = this._createComponent.rerender({
        point: emptyPoint
      });

      this._element.replaceChild(nextElement, prevElement);
      this._createComponent.hide();
    };

    this._element.appendChild(this._createComponent.render());
    this._createComponent.hide();
  }

  renderEditViewComponents() {
    const {destinations, filterBy, points} = this._data;
    const filteredPoints = filterBy ? points.filter(filterBy) : points.slice();

    this._viewComponents = filteredPoints.map((point) => new ViewComponent({point}));
    this._editComponents = filteredPoints.map((point) => new EditComponent({point, destinations}));

    this._viewComponents.forEach((viewComponent, index) => {
      const editComponent = this._editComponents[index];

      viewComponent.onEdit = () => {
        this._element.replaceChild(editComponent.render(), viewComponent.element);
        viewComponent.unrender();
      };

      editComponent.onSubmit = (nextPointData, {block, unblock}) => {
        const updateIndex = this._viewComponents.findIndex((component) => component === viewComponent);
        const prevPoints = this._data.points;
        const nextPoints = this._data.points.slice();

        nextPoints[updateIndex] = nextPointData;

        const callback = {
          block,
          unblock,
          revert: () => {
            const {prevElement, nextElement} = editComponent.rerender({
              point: prevPoints[updateIndex]
            });

            this._element.replaceChild(nextElement, prevElement);
          },
          commit: () => {
            viewComponent.update({point: nextPointData});
            viewComponent.render();
            this._element.replaceChild(viewComponent.element, editComponent.element);

            editComponent.unrender();
            editComponent.update({point: nextPointData});
          }
        };

        if (typeof this._pointChangedCallback === `function`) {
          this._pointChangedCallback(nextPoints, nextPointData, callback);
        }
      };

      editComponent.onDelete = (deletedPoint, {block, unblock, shake, unshake}) => {
        const deleteIndex = this._viewComponents.findIndex((component) => component === viewComponent);

        const prevPoints = this._data.points;
        const nextPoints = this._data.points.slice();

        const callback = {
          block,
          unblock,
          shake,
          unshake,
          revert: () => {
            const {prevElement, nextElement} = editComponent.rerender({
              point: prevPoints[deleteIndex]
            });

            this._element.replaceChild(nextElement, prevElement);
          },
          commit: () => {
            this._viewComponents.splice(deleteIndex, 1);
            this._editComponents.splice(deleteIndex, 1);
            this._data.points.splice(deleteIndex, 1);

            this._element.removeChild(editComponent.element);
            editComponent.unrender();
          }
        };

        if (typeof this._pointDeletedCallback === `function`) {
          this._pointDeletedCallback(nextPoints, deletedPoint, callback);
        }
      };

      this._element.appendChild(viewComponent.render());
    });
  }

  render() {
    const element = super.render();

    this.renderCreatePoint();
    this.renderEditViewComponents();

    return element;
  }

  _onDocumentKeyDown(e) {
    if (e.keyCode === KEYCODE_ESC) {
      if (this._createComponent.isVisible) {
        this._createComponent.update({point: emptyPoint});
        this._createComponent.hide();
      }

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

  showCreatePoint() {
    this._createComponent.show();
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

    this._createComponent = null;
    this._viewComponents = null;
    this._editComponents = null;

    super.unrender();
  }
}

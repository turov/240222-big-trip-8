export const createFilterTemplate = (filter) => {
  return `<span><input
      type="radio"
      id="filter-${filter.name}"
      name="filter"
      value="${filter.name}"
      ${filter.isSelected ? `checked` : ``}
    >
    <label
      class="trip-filter__item"
      for="filter-${filter.name}"
      data-filter-id="${filter.name}"
    >
      ${filter.description}
    </label>
    </span>`;
};

export const createFiltersTemplate = () => (
  `<form class="trip-filter">
  </form>`
);

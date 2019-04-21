export const createFilterTemplate = (filter, total) => {
  return `<span><input
      type="radio"
      id="filter-${filter.name}"
      name="filter"
      value="${filter.name}"
      ${filter.isSelected ? `checked` : ``}
      ${total ? `` : `disabled`}
    >
    <label
      class="trip-filter__item"
      for="filter-${filter.name}"
      data-filter-id="${filter.name}"
    >
      ${filter.description}
      ${total ? total : ``}
    </label>
    </span>`;
};

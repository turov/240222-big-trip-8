export const createFilterTemplate = (filter) => {
  const filterElement = document.createElement(`span`);
  filter.innerHTML = `<input type="radio" id="filter-${filter.value}" name="filter" value="${filter.value}"
  ${filter.isChecked ? `checked` : ``}
  ${filter.isDisabled ? `disabled` : ``}
  >
  <label class="trip-filter__item" for="filter-${filter.value}">${filter.value}</label>`;
  return filterElement;
};

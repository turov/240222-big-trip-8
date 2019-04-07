export default (value, isChecked, isDisabled) => {
  const filter = document.createElement(`span`);
  filter.innerHTML = `<input type="radio" id="filter-${value}" name="filter" value="${value}"
  ${isChecked ? `checked` : ``}
  ${isDisabled ? `disabled` : ``}
  >
  <label class="trip-filter__item" for="filter-${value}">${value}</label>`;
  return filter;
};

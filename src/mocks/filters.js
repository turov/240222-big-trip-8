const NAMES = [`everything`, `future`, `past`];

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const createFilters = () => {
  const filters = NAMES.map((name) => ({
    name,
    isSelected: false,
    description: capitalize(name),
  }));

  filters[0].isSelected = true;

  return filters;
};

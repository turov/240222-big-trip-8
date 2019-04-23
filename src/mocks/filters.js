const THOUSAND_NUMBER = 1000;

export default [
  {
    name: `everything`,
    isSelected: true,
    description: `Everything`,
    filterBy: (point) => point
  },
  {
    name: `future`,
    isSelected: false,
    description: `Future`,
    filterBy: (point) => point.time.start > Date.now() / THOUSAND_NUMBER
  },
  {
    name: `past`,
    isSelected: false,
    description: `Past`,
    filterBy: (point) => point.time.end < Date.now() / THOUSAND_NUMBER
  }
];

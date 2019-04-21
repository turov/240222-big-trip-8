const createStatsItemTemplate = (name) => (
  `<div class="statistic__item statistic__item--${name}">
  <canvas class="statistic__${name}" width="900"></canvas>
</div>`
);

export const createStatisticsTemplate = (names) => (
  `<section class="statistic content-wrap visually-hidden" id="stats">
    ${names
      .map((name) =>
        createStatsItemTemplate(name)
      ).join(``)}
  </section>`
);

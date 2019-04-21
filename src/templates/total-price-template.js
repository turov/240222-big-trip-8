export const createTotalPriceTemplate = (data) => (
    `<p class="trip__total">
        Total: <span class="trip__total-cost">&euro;&nbsp;${data.price}</span>
    </p>`
);

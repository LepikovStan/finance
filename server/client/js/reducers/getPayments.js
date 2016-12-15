module.exports = (state, action) => {
    if (!state.payments) {
        state.payments = {
            last: [],
            future: []
        }
    }
    let {paymentsType} = action;

    if (!state.payments[paymentsType]) {
        console.error(`There is no type of payments like "${paymentsType}"`)
    }

    state.payments[paymentsType] = action.payments

    return state;
}

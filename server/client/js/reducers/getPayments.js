module.exports = (state, action) => {
    console.log('getpayments')
    state.payments = action.payments

    return state;
}

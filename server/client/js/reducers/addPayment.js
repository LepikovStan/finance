module.exports = (state, action) => {
    state.payments.push(action.payment);

    return state;
}

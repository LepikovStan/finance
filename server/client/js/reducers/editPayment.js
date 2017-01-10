module.exports = (state, action) => {
    let {payment} = action

    state.paymentToEdit = payment

    return state;
}

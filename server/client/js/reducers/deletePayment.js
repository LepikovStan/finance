module.exports = (state, action) => {
    let {paymentId, paymentType} = action
    let paymentIndex = null

    state.payments[paymentType].map((payment, index) => {
        if (payment.id === paymentId) {
            paymentIndex = index
        }
    })

    if (!isNaN(paymentIndex)) {
        state.payments[paymentType].splice(paymentIndex, 1)
    }

    return state;
}

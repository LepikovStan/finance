module.exports = (state, action) => {
    let {paymentId, paymentType} = action
    let paymentIndex = null

    state.payments[paymentType].map((payment, index) => {
        console.log(payment.id, paymentId)
        if (payment.id === paymentId) {
            paymentIndex = index
        }
    })
    console.log(paymentIndex, state.payments[paymentType])

    if (!isNaN(paymentIndex)) {
        state.payments[paymentType].splice(paymentIndex, 1)
    }

    return state;
}

module.exports = (state, action) => {
    let {payment} = action,
        paymentTime = new Date(payment.date).getTime();

    state.payments.push(payment);
    state.payments.sort((a, b) => {
        if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
            return 1;
        } else {
            return -1;
        }
    })

    return state;
}

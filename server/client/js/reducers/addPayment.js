module.exports = (state, action) => {
    let {payment} = action,
        paymentDate = new Date(payment.date).getTime();

    if (paymentDate <= Date.now()) {
        state.payments.last.push(payment);
    } else {
        state.payments.future.push(payment);
    }


    return state;
}

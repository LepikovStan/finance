module.exports = (state, action) => {
    let {payment} = action,
        paymentTime = new Date(payment.date).getTime();

    if (paymentTime <= Date.now()) {
        state.payments.last.push(payment);
        state.payments.last.sort((a, b) => {
            if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
                return 1;
            } else {
                return -1;
            }
        })
    } else {
        state.payments.future.push(payment);
        state.payments.future.sort((a, b) => {
            if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
                return -1;
            } else {
                return 1;
            }
        })
    }


    return state;
}

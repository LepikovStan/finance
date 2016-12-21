module.exports = (state, action) => {
    let {payment} = action,
        paymentDate = new Date(payment.date).getTime();

    if (paymentDate <= Date.now()) {
        state.payments.last.push(payment);
        state.payments.last.sort((a, b) => {
            if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
                return 1;
            } else {
                return -1;
            }
        })
        console.log('state.payments.last', state.payments.last)
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

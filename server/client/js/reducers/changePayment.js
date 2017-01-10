const _ = require('lodash')
const insert = (arr, item, dir) => {
    arr.push(item);
    arr.sort((a, b) => {
        if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
            return dir === 'desc' ? 1 : -1;
        } else {
            return dir === 'desc' ? -1 : 1;
        }
    })
}

module.exports = (state, action) => {
    let {payment} = action,
        paymentId = payment.id,
        payments = state.payments,
        expiredPayment = _.find(payments, {id: paymentId}),
        index = _.indexOf(payments, expiredPayment);

    if (payment.type === 'outgo') {
        payment.amount = -Math.abs(payment.amount)
    } else {
        payment.amount = Math.abs(payment.amount)
    }

    payments[index] = payment
    console.log('state.payments new', state.payments, payment)
    state.payments.sort((a, b) => {
        if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
            return 1;
        } else {
            return -1;
        }
    })

    return state;
}

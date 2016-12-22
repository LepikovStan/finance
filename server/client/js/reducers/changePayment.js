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
        paymentTime = new Date(payment.date).getTime(),
        isFuturePayment = paymentTime > Date.now(),
        expiredPayment,
        expiredPaymentIsLast = true,
        payments;

    expiredPayment = _.find(state.payments.last, {id: paymentId})
    if (!expiredPayment) {
        expiredPaymentIsLast = false;
        expiredPayment = _.find(state.payments.future, {id: paymentId})
    }

    if (expiredPaymentIsLast) {
        payments = state.payments.last;
    } else {
        payments = state.payments.future;
    }
    let expiredPaymentIndex = _.indexOf(payments, expiredPayment)
    payments.splice(expiredPaymentIndex, 1)

    if (isFuturePayment) {
        insert(state.payments.future, payment, 'asc')
    } else {
        insert(state.payments.last, payment, 'desc')
    }

    return state;

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

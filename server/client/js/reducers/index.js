const initState = require('../initState');
const reducers = {
    navMain: require('./mainmenu'),
    changeCategory: require('./changeCategory'),
    deleteCategory: require('./deleteCategory'),
    getCategories: require('./getCategories'),
    getCategoriesByType: require('./getCategoriesByType'),
    addCategory: require('./addCategory'),
    addPayment: require('./addPayment'),
    getPayments: require('./getPayments'),
    deletePayment: require('./deletePayment'),
    changePayment: require('./changePayment')
}

module.exports = (state = initState, action) => {
    if (reducers[action.type]) {
        return reducers[action.type](state, action)
    } else {
        console.warn(`No reducer for type=${action.type}`)
    }

    return state;
}

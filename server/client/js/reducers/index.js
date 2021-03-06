const initState = require('../initState');
const reducers = {
    navMain: require('./mainmenu'),
    changeCategory: require('./changeCategory'),
    deleteCategory: require('./deleteCategory'),
    editCategory: require('./editCategory'),
    getCategories: require('./getCategories'),
    getCategoriesByType: require('./getCategoriesByType'),
    addCategory: require('./addCategory'),
    addPayment: require('./addPayment'),
    getPayments: require('./getPayments'),
    deletePayment: require('./deletePayment'),
    changePayment: require('./changePayment'),
    editPayment: require('./editPayment'),
    authUser: require('./authUser'),
    logoutUser: require('./logoutUser')
}

module.exports = (state = initState, action) => {
    if (reducers[action.type]) {
        return reducers[action.type](state, action)
    } else {
        console.warn(`No reducer for type=${action.type}`)
    }

    return state;
}

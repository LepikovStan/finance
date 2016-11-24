const initState = require('../initState');
const reducers = {
    navMain: require('./mainmenu')
}

module.exports = (state = initState, action) => {
    if (reducers[action.type]) {
        return reducers[action.type](state, action)
    }

    return state;
}

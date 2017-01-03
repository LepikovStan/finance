const initState = require('../initState');

module.exports = (state, action) => {
    state.user = {status: 'guest'};

    return state;
}

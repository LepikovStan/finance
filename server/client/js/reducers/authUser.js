module.exports = (state, action) => {
    let {user: userForUpdate} = action,
        user = Object.assign({}, state.user, userForUpdate);

    state.user = user;

    return state;
}

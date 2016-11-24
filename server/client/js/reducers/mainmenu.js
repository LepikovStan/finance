module.exports = (state, action) => {
    state.mainmenu.active = action.path

    return state;
}

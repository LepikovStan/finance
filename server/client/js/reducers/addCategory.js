module.exports = (state, action) => {
    state.categories.push(action.category);

    return state;
}

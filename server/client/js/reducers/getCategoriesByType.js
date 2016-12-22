module.exports = (state, action) => {
    state.categoriesByType = action.categories

    return state;
}

module.exports = (state, action) => {
    state.categoriesByType = action.categories
    console.log('categoriesByType', action.categories)

    return state;
}

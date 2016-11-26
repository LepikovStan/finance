module.exports = (state, action) => {
    let {categoryId} = action
    let categoryIndex = null

    state.categories.map((category, index) => {
        if (category.id === categoryId) {
            categoryIndex = index
        }
    })

    if (!isNaN(categoryIndex)) {
        state.categories.splice(categoryIndex, 1)
    }

    return state;
}

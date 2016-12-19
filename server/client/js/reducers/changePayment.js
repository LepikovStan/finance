module.exports = (state, action) => {
    let categories = _.clone(state.categories);
    let changedCategory = action.category;
    categories.map((category, index) => {
        if (category.id === changedCategory.id) {
            categories[index] = changedCategory;
        }
    })
    state.categories = categories

    return state;
}

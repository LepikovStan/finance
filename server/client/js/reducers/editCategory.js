module.exports = (state, action) => {
    let {category} = action

    state.categoryToEdit = category

    return state;
}

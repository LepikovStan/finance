module.exports = (state, action) => {
    let {category} = action

    console.log('edit', category)

    state.categoryToEdit = category

    return state;
}

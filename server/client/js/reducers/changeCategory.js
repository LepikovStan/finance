module.exports = (state, action) => {
    $.ajax({
        url: `/category/${action.categoryId}`,
        method: 'PUT'
    })
    .then((category) => {
        console.log(state, category)
    })
    .catch((error) =>
        console.log('error', error)
    );

    return state;
}

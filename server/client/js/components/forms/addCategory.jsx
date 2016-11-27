module.exports = class extends React.Component {

    onSubmit(e) {
        e.preventDefault()
        let categoryName = this.categoryName.value

        if (categoryName) {
            $.ajax({
                url: '/category/new',
                method: 'POST',
                data: {
                    categoryName
                }
            })
            .then(({status, result: category}) => {
                store.dispatch({
                    type: 'addCategory',
                    category
                })
                this.form.reset()
            })
            .catch((error) => {
                console.log('error', error)
            })
        }
    }

    render() {
        return (
            <form className="add-category" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                <input type="text" placeholder="Название категории" ref={ (input) => this.categoryName = input } />
                <button>Добавить</button>
            </form>
        );
    }
}

const {Checkbox} = require('@blueprintjs/core')

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

    changeCategoryType() {}

    render() {
        return (
            <form className="add-category" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                <input className="pt-input" type="text" placeholder="Название категории" ref={ (input) => this.categoryName = input } />
                <fieldset>
                    <Checkbox checked="checked" onChange={this.changeCategoryType.bind(this, 'income')}>
                        В доходе
                    </Checkbox>
                    <Checkbox onChange={this.changeCategoryType.bind(this, 'outgo')}>
                        В расходе
                    </Checkbox>
                </fieldset>
                <button className="pt-button">Добавить</button>
            </form>
        );
    }
}

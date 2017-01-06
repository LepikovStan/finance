const {Checkbox} = require('@blueprintjs/core')

module.exports = class extends React.Component {

    constructor(props) {
        super(props);
        this.initState = {
            edit: false,
            name: '',
            income: true,
            outgo: true
        }

        if (props.edit) {
            this.state = props
        } else {
            this.state = this.initState
        }
    }

    onSubmit(e) {
        e.preventDefault()
        let categoryName = this.categoryName.value,
            type = 'addCategory',
            params = {
                url: '/category/new',
                method: 'POST'
            }

        if (this.props.edit) {
            type = 'changeCategory'
            params = {
                url: `/category/${this.state.id}`,
                method: 'PUT'
            }
        }

        if (categoryName) {
            $.ajax({
                url: params.url,
                method: params.method,
                data: {
                    category: this.state
                }
            })
            .then(({status, result: category}) => {
                store.dispatch({
                    type,
                    category
                })
                if (!this.props.edit) {
                    this.setState(this.initState)
                }
            })
            .catch((error) => {
                console.log('error', error)
            })
        }
    }

    cancel() {
        console.log('cancel')
    }

    changeCategoryType(type) {
        let state = {}
        state[type] = !this.state[type]
        this.setState(state)
    }

    changeCategpryName(e) {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        let {edit, name, income, outgo} = this.state,
            buttons = <div className="buttons">
                <button className="pt-button">Добавить</button>
            </div>;

        if (edit) {
            buttons = <div className="buttons">
                <button className="pt-button" onClick={this.onSubmit.bind(this)}>Сохранить</button>
                <button className="pt-button" onClick={this.cancel.bind(this)}>Отмена</button>
            </div>
        }

        return (
            <form className="add-category" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                <h3>
                    <span className="pt-icon-standard pt-icon-add"></span>
                    {edit ? 'Редактировать категорию' : 'Добавить новую категорию'}
                </h3>
                <input
                    onChange={this.changeCategpryName.bind(this)}
                    value={name}
                    className="pt-input"
                    type="text"
                    placeholder="Название категории"
                    ref={ (input) => this.categoryName = input } />
                <fieldset>
                    <Checkbox checked={income} onChange={this.changeCategoryType.bind(this, 'income')}>
                        В доходе
                    </Checkbox>
                    <Checkbox checked={outgo} onChange={this.changeCategoryType.bind(this, 'outgo')}>
                        В расходе
                    </Checkbox>
                </fieldset>
                {buttons}
            </form>
        );
    }
}

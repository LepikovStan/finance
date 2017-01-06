const {Checkbox} = require('@blueprintjs/core')

module.exports = class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            name: '',
            income: true,
            outgo: true
        }

    }

    onSubmit(e) {
        e.preventDefault()
        let categoryName = this.categoryName.value

        if (categoryName) {
            $.ajax({
                url: '/category/new',
                method: 'POST',
                data: {
                    category: this.state
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

    componentWillMount() {
        console.log('mount', this.state, this.props)
    }

    render() {
        let state = this.props.edit ? this.props : this.state

        let {edit, name, income, outgo} = state;
        console.log(state, edit, name, income, outgo);

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
                <button className="pt-button">Добавить</button>
            </form>
        );
    }
}

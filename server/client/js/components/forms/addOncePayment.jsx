const moment = require('moment');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        let today = moment().format("YYYY-MM-DD");

        this.state = {
            date: today
        }
    }

    onSubmit(e) {
        e.preventDefault()
        console.log('aedd', this.date, this.date.value);
    }

    componentWillMount() {
        store.subscribe(() => {
            this.setState({
                categories: store.getState().categories
            })
        })
        this.getCategories()
    }

    getCategories() {
        $.get('/categories-list')
            .then(({status, result: categories}) => {
                store.dispatch({
                    type: 'getCategories',
                    categories
                })
            });
    }

    changeDate() {
        this.setState({
            date: this.date.value
        })
    }

    render() {
        if (!this.state.categories) {
            return <div></div>
        }

        console.log('this.state.categories', this.state)
        let categoriesOptions = this.state.categories.map((category) => {
            return <option key={category.id} value={category.id}>{category.name}</option>
        })

        return (
            <form className="add-payment" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                <fieldset>
                    <input type="date" value={this.state.date} onChange={this.changeDate.bind(this)} ref={ (input) => this.date = input } />
                </fieldset>
                <fieldset>
                    <label>
                        Доход
                        <input type="radio" value="income" name="transactionCategory" checked="checked" ref={ (input) => this.incomeCategory = input } />
                    </label>
                    <label>
                        Расход
                        <input type="radio" value="outgo" name="transactionCategory" ref={ (input) => this.outgoCategory = input } />
                    </label>
                </fieldset>
                <fieldset>
                    <select>
                        {categoriesOptions}
                    </select>
                </fieldset>
                <fieldset></fieldset>
                <button>Добавить</button>
            </form>
        );
    }
}

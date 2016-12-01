const moment = require('moment');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        let today = moment().format("YYYY-MM-DD");

        this.state = {
            date: today,
            paymentValue: '',
            paymentTypes: {
                income: {
                    label: 'Доход',
                    checked: true
                },
                outgo: {
                    label: 'Расход',
                    checked: false
                }
            }
        }
    }

    onSubmit(e) {
        e.preventDefault()
        console.log('aedd');
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
            date: this.dateField.value
        })
    }

    changePaymentType(paymentTypes, e) {
        let paymentType = e.target.value;
        console.log('paymentTypes', paymentTypes, paymentType)

        Object
            .keys(paymentTypes)
            .map((name) => {
                if (name === paymentType) {
                    paymentTypes[name].checked = true
                } else {
                    paymentTypes[name].checked = false
                }
            });
        this.setState({
            paymentTypes
        })
    }

    changePaymentValue() {
        this.setState({
            paymentValue: this.paymentValueField.value
        })
    }

    render() {
        if (!this.state.categories) {
            return <div></div>
        }

        let categoriesOptions = this.state.categories.map((category) => {
            return <option key={category.id} value={category.id}>{category.name}</option>
        });
        let paymentTypes = _.clone(this.state.paymentTypes);
        let paymentTypesElems = Object
                                .keys(this.state.paymentTypes)
                                .map((name) => {
                                    let paymentType = this.state.paymentTypes[name];

                                    return (
                                        <label key={name}>
                                            {paymentType.label}
                                            <input
                                                type="radio"
                                                value={name}
                                                name="changePaymentType"
                                                checked={paymentType.checked} />
                                        </label>
                                    )
                                })

        return (
            <form className="add-payment" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                <fieldset>
                    <input type="date" value={this.state.date} onChange={this.changeDate.bind(this)} ref={ (input) => this.dateField = input } />
                </fieldset>
                <fieldset onChange={this.changePaymentType.bind(this, paymentTypes)}>
                    {paymentTypesElems}
                </fieldset>
                <fieldset>
                    <select>
                        {categoriesOptions}
                    </select>
                </fieldset>
                <fieldset>
                    <input
                        type="number"
                        value={this.state.paymentValue}
                        onChange={this.changePaymentValue.bind(this)}
                        ref={ (input) => this.paymentValueField = input } />
                </fieldset>
                <fieldset></fieldset>
                <fieldset></fieldset>
                <fieldset></fieldset>
                <button>Добавить</button>
            </form>
        );
    }
}

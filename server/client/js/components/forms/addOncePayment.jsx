const moment = require('moment');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        let today = moment().format("YYYY-MM-DD");

        this.state = {
            date: today,
            paymentValue: '',
            paymentCategory: '',
            paymentTypes: {
                income: {
                    label: 'Доход',
                    checked: true
                },
                outgo: {
                    label: 'Расход',
                    checked: false
                }
            },
            currentPaymentType: 'income'
        }
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
                    this.state.currentPaymentType = name
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

    onSubmit(e) {
        e.preventDefault()
        let params = {
            date: this.state.date,
            sum: this.state.paymentValue
            sign: this.state.currentPaymentType
        }

        $.ajax({
            url: '/category/new',
            method: 'POST',
            data: {
                categoryName
            }
        })
        .then(({status, result: payment}) => {
            /*store.dispatch({
                type: 'addCategory',
                category
            })*/
            this.form.reset()
        })
        .catch((error) => {
            console.log('error', error)
        })
        console.log('this.dateField', this.dateField.value);
        console.log('this.paymentValueField.value', this.paymentValueField.value);
        console.log('this.paymentTypes', this.state.paymentTypes);
        console.log('this.categoryField', this.categoryField.options[this.categoryField.selectedIndex].value);
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
                    <select ref={ (select) => this.categoryField = select }>
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

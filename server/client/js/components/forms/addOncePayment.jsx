const moment = require('moment');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        let today = moment().format("YYYY-MM-DD");

        this.state = {
            date: today,
            paymentValue: '',
            paymentCategory: {},
            paymentCategoryId: '',
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

    getInitState() {
        return {
            date: moment().format("YYYY-MM-DD"),
            paymentValue: 0,
            categoryId: this.state.categories[0]['id']
        };
    }

    componentWillMount() {
        store.subscribe(() => {
            let categories = store.getState().categories;

            this.setState({
                categories: store.getState().categories,
            })
            let categoryId = this.getCategoryId();

            this.setState({
                paymentCategory: _.find(categories, {id: categoryId}),
                paymentCategoryId: categoryId
            });
        })
        this.getCategories()
    }

    getCategoryId() {
        if (!this.categoryIdField) {
            return undefined;
        }

        return Number(this.categoryIdField.options[this.categoryIdField.selectedIndex].value);
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

    changeCategoryId() {
        let categories = this.state.categories,
            categoryId = this.getCategoryId();


        this.setState({
            paymentCategory: _.find(categories, {id: categoryId}),
            paymentCategoryId: categoryId
        });
    }

    resetForm() {
        this.setState(this.getInitState());
        this.form.reset();
    }

    onSubmit(e) {
        e.preventDefault()
        let params = {
            date: this.state.date,
            amount: this.state.paymentValue,
            type: this.state.currentPaymentType,
            categoryId: this.state.paymentCategoryId
        }

        $.ajax({
            url: '/payment/new',
            method: 'POST',
            data: params
        })
        .then(({status, result: payment}) => {
            if (status === 'ok'){
                store.dispatch({
                    type: 'addPayment',
                    payment
                })
                this.resetForm();
            }
        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    render() {
        if (!this.state.categories) {
            return <div></div>
        }

        let categoriesOptions = this.state.categories.map((category) => {
                return <option key={category.id} value={category.id}>{category.name}</option>
            }),
            category = this.state.paymentCategory,
            paymentTypes = _.clone(this.state.paymentTypes),
            paymentTypesElems = Object
                                .keys(this.state.paymentTypes)
                                .map((name) => {
                                    let paymentType = this.state.paymentTypes[name],
                                        disabled = !category[name];

                                    return (
                                        <label key={name}>
                                            {paymentType.label}
                                            <input
                                                type="radio"
                                                value={name}
                                                disabled={disabled}
                                                name="changePaymentType"
                                                checked={paymentType.checked} />
                                        </label>
                                    )
                                });

        return (
            <form className="add-payment" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                <fieldset>
                    <input type="date" value={this.state.date} defaultValue={moment().format("YYYY-MM-DD")} onChange={this.changeDate.bind(this)} ref={ (input) => this.dateField = input } />
                </fieldset>
                <fieldset onChange={this.changePaymentType.bind(this, paymentTypes)}>
                    {paymentTypesElems}
                </fieldset>
                <fieldset>
                    <select onChange={this.changeCategoryId.bind(this)} ref={ (select) => this.categoryIdField = select }>
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

const moment = require('moment');
const CategoriesField = require('components/blocks/categoriesField')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        let today = moment().format("YYYY-MM-DD");

        this.state = {
            date: today,
            paymentValue: ''
        }
    }

    getInitState() {
        return {
            date: moment().format("YYYY-MM-DD"),
            paymentValue: 0
        };
    }

    changeDate() {
        this.setState({
            date: this.dateField.value
        })
    }

    changePaymentValue() {
        this.setState({
            paymentValue: Number(this.paymentValueField.value)
        })
    }

    resetForm() {
        this.setState(this.getInitState());
    }

    changeCategoryParams(params) {
        this.params = Object.assign({}, this.params, {
            type: params.categoryType,
            categoryId: params.categoryId
        })
    }

    onSubmit(e) {
        e.preventDefault()

        this.params = Object.assign({}, this.params, {
            date: this.state.date,
            amount: Number(this.state.paymentValue)
        })

        $.ajax({
            url: '/payment/new',
            method: 'POST',
            data: this.params
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
        return (
            <form className="add-payment" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                <fieldset>
                    <input type="date" value={this.state.date} defaultValue={moment().format("YYYY-MM-DD")} onChange={this.changeDate.bind(this)} ref={ (input) => this.dateField = input } />
                </fieldset>
                <CategoriesField changeCategoryParams={this.changeCategoryParams.bind(this)} />
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

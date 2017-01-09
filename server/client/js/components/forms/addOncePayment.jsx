const moment = require('moment');
const CategoriesField = require('components/blocks/categoriesField')
const { DatePicker } = require('@blueprintjs/datetime')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        let today = new Date()

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

    changeDate(date) {
        this.setState({
            date
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
            type: params.paymentType,
            categoryId: params.categoryId
        })
    }

    onSubmit(e) {
        e.preventDefault()

        this.params = Object.assign({}, this.params, {
            date: moment(this.state.date).format("YYYY-MM-DD"),
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

    handleDayClick() {}

    render() {
        let {edit} = this.state,
            buttons = <div className="buttons">
                <button className="pt-button">Добавить</button>
            </div>

        return (
            <form className="add-form add-payment" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                <h3>
                    <span className="pt-icon-standard pt-icon-add"></span>
                    {edit ? 'Редактировать платёж' : 'Добавить новый платёж'}
                </h3>
                <fieldset>
                    <DatePicker
                        value={this.state.date}
                        defaultValue={new Date()}
                        onChange={this.changeDate.bind(this)} />
                </fieldset>
                <CategoriesField changeCategoryParams={this.changeCategoryParams.bind(this)} />
                <fieldset>
                    <input
                        type="number"
                        className="pt-input"
                        value={this.state.paymentValue}
                        onChange={this.changePaymentValue.bind(this)}
                        ref={ (input) => this.paymentValueField = input } />
                </fieldset>
                {buttons}
            </form>
        );
    }
}

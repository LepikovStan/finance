const moment = require('moment');
const CategoriesField = require('components/blocks/categoriesField')
const { DatePicker } = require('@blueprintjs/datetime')
moment.locale('ru')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);

        if (!props.edit) {
            props = {
                date: new Date(),
                amount: '',
                edit: false
            }
        }
        this.state = props
    }

    getInitState() {
        return {
            date: new Date(),
            amount: 0
        };
    }

    changeDate(date) {
        this.setState({
            date
        })
    }

    changePaymentValue() {
        this.setState({
            amount: this.paymentValueField.value
        })
    }

    resetForm() {
        this.setState(this.getInitState());
    }

    changeCategoryParams(params) {
        this.data = Object.assign({}, this.data, {
            type: params.paymentType,
            categoryId: params.categoryId
        })
    }

    onSubmit(e) {
        e.preventDefault()
        let params = {
                url: '/payment/new',
                method: 'POST'
            },
            type = 'addPayment';

        this.data = Object.assign({}, this.data, {
            date: moment(this.state.date).format("YYYY-MM-DD hh:mm:ss"),
            amount: Number(this.state.amount)
        })

        if (this.state.edit) {
            params = {
                url: `/payment/${this.state.id}`,
                method: 'PUT'
            }
            type = 'changePayment'
        }

        $.ajax({
            url: params.url,
            method: params.method,
            data: this.data
        })
        .then(({status, result: payment}) => {
            if (status === 'ok') {
                store.dispatch({
                    type,
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

    cancel(e) {
        e && e.preventDefault()
        store.dispatch({
            type: 'editPayment',
            payment: false
        })
    }

    render() {
        let {edit} = this.state,
            cN = edit ? 'add-form add-payment edit' : 'add-form add-payment',
            categoriesField = <CategoriesField changeCategoryParams={this.changeCategoryParams.bind(this)} />,
            buttons = <div className="buttons">
                <button className="pt-button">Добавить</button>
            </div>

        if (edit) {
            buttons = <div className="buttons">
                <button className="pt-button" onClick={this.onSubmit.bind(this)}>Сохранить</button>
                <button className="pt-button" onClick={this.cancel.bind(this)}>Отмена</button>
            </div>
            categoriesField = <CategoriesField
                paymentType={this.state.paymentType}
                categoryId={this.state.categoryId}
                changeCategoryParams={this.changeCategoryParams.bind(this)} />
        }

        return (
            <form className={cN} onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                <h3>
                    <span className="pt-icon-standard pt-icon-add"></span>
                    {edit ? 'Редактировать платёж' : 'Добавить новый платёж'}
                </h3>
                <fieldset>
                    <DatePicker
                        locale='ru'
                        value={this.state.date}
                        defaultValue={new Date()}
                        onChange={this.changeDate.bind(this)} />
                </fieldset>
                {categoriesField}
                <fieldset>
                    <input
                        type="number"
                        className="pt-input"
                        value={this.state.amount}
                        onChange={this.changePaymentValue.bind(this)}
                        ref={ (input) => this.paymentValueField = input } />
                </fieldset>
                {buttons}
            </form>
        );
    }
}

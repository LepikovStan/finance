const moment = require('moment');
const CategoriesField = require('components/blocks/categoriesField')
const _ = require('lodash')

module.exports = class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            editing: false
        };
    }

    componentWillMount() {
        store.subscribe(() => {
            let categories = store.getState().categories;

            this.setState({
                categories: store.getState().categories,
            })
        })
    }

    edit() {
        this.setState({editing: true})
    }

    delete(paymentId, paymentType) {
        $.ajax({
            url: `/payment/${paymentId}`,
            method: 'DELETE'
        })
        .then(({status}) => {
            if (status) {
                store.dispatch({
                    type: 'deletePayment',
                    paymentId,
                    paymentType
                })
            }
        })
        .catch((error) => {
            console.log('error', error)
        });
    }

    cancel() {
        this.setState({editing: false})
    }

    changePayment() {
        let amount = this.amountInput.value || this.props.amount;
        this.payment = Object.assign({}, this.payment, {
            id: this.props.id,
            date: this.dateInput.value,
            amount
        })

        $.ajax({
            url: `/payment/${this.payment.id}`,
            method: 'PUT',
            data: {
                payment: this.payment
            }
        })
        .then((res) => {
            if (res.status === 'ok') {
                store.dispatch({
                    type: 'changePayment',
                    payment: this.payment
                })
                this.setState({
                    editing: false
                })
            } else {
                throw new Error(res.message)
            }
        })
        .catch((error) => {
            console.error('error', error)
        });
    }

    changeCategoryParams(params) {
        this.payment = Object.assign({}, this.payment, {
            categoryId: Number(params.categoryId),
            type: params.paymentType,
            categoryName: params.categoryName
        });
    }

    changeAmount() {
        this.setState({
            amountChanged: this.amountInput.value
        })
    }

    changeDate() {
        this.setState({
            date: this.dateField.value
        })
    }

    render() {
        let {id, date, categoryName, amount, categoryId, paymentType, type} = this.props,
            dateCell,
            amountCell,
            categoryCell,
            editButtons = '';

        categoryId = Number(categoryId);
        if (this.payment && this.payment.type) {
            paymentType = this.payment.type;
        }

        date = moment(date);
        if (this.state.editing) {
            dateCell = <input type="date" onChange={this.changeDate.bind(this)} value={date.format("YYYY-MM-DD")} defaultValue={moment().format("YYYY-MM-DD")} ref={(dateInput) => {this.dateInput = dateInput}} />
            amountCell = <input type="number" onChange={this.changeAmount.bind(this)} value={this.state.amountChanged} placeholder={amount} ref={(amountInput) => this.amountInput = amountInput} />
            categoryCell = <CategoriesField paymentType={paymentType} categoryId={categoryId} categoryName={categoryName} changeCategoryParams={this.changeCategoryParams.bind(this)} />
            editButtons = <div>
                            <button onClick={this.changePayment.bind(this)}>сохранить</button>
                            <button onClick={this.cancel.bind(this)}>отмена</button>
                        </div>
        } else {
            dateCell = date.format('LL');
            amountCell = amount;
            categoryCell = categoryName
        }

        return (
            <tr key={id}>
                <td key={1}>{dateCell}</td>
                <td key={2}>{categoryCell}</td>
                <td key={3}>{amountCell}</td>
                <td key={4}>
                    {editButtons}
                    <button onClick={this.edit.bind(this, id)}>редактировать</button>
                    <button onClick={this.delete.bind(this, id, type)}>удалить</button>
                </td>
            </tr>
        );
    }
}

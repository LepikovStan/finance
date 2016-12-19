const moment = require('moment');

module.exports = class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            editing: false
        }
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

    save() {

    }

    cancel() {
        this.setState({editing: false})
    }

    render() {
        let {id, date, categoryName, amount, categoryId, type} = this.props,
            dateCell,
            amountCell,
            categoryCell,
            editButtons = '',
            categoriesOptions = this.state.categories.map((category) => {
                return <option key={category.id} value={category.id}>{category.name}</option>
            });

        date = moment(date);
        if (this.state.editing) {
            dateCell = <input type="date" value={date.format("YYYY-MM-DD")} defaultValue={moment().format("YYYY-MM-DD")} />
            amountCell = <input type="number" value="" placeholder={amount} />
            categoryCell = <select defaultValue={categoryId}>
                                {categoriesOptions}
                            </select>
            editButtons = <div>
                            <button onClick={this.save.bind(this)}>сохранить</button>
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

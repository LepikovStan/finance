const moment = require('moment');

module.exports = class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            key: this.props.id,
            categoryName: this.props.categoryName,
            categoryId: this.props.categoryId,
            amount: this.props.amount,
            date: this.props.date,
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

    delete() {

    }

    render() {
        let {key, date, categoryName, amount, categoryId} = this.state,
            dateCell,
            amountCell,
            categoryCell,
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
        } else {
            dateCell = date.format('LL');
            amountCell = amount;
            categoryCell = categoryName
        }

        return (
            <tr key={key}>
                <td key={1}>{dateCell}</td>
                <td key={2}>{categoryCell}</td>
                <td key={3}>{amountCell}</td>
                <td key={4}>
                    <button onClick={this.edit.bind(this)}>редактировать</button>
                    <button onClick={this.delete.bind(this)}>удалить</button>
                </td>
            </tr>
        );
    }
}

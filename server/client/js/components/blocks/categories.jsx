module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: props.categories
        }
    }

    onChange(index, type, checked) {
        let categories = this.state.categories;
        categories[index][type] = !checked;

        this.setState({
            categories
        });
    }

    changeCategory(categoryId) {
        store.dispatch({
            type: 'changeCategory',
            categoryId
        })
    }

    deleteCategory(categoryId) {
        $.ajax({
            url: `/category/${categoryId}`,
            method: 'DELETE'
        })
        .then(({status}) => {
            if (status) {
                store.dispatch({
                    type: 'deleteCategory',
                    categoryId
                })
            }
        })
        .catch((error) => {
            console.log('error', error)
        });
    }

    render() {
        let categories = this.state.categories.map((category, index) => {
            return <li key={category.id}>
                    <div className="name">{category.name}</div>
                    <label>
                        <input type="checkbox" checked={category.income} onChange={this.onChange.bind(this, index, 'income', category.income)} /> Доход
                    </label>
                    <label>
                        <input type="checkbox" checked={category.outgo}  onChange={this.onChange.bind(this, index, 'outgo', category.outgo)} /> Расход
                    </label>
                    <div className="actions">
                        <button onClick={this.deleteCategory.bind(this, category.id)}>удалить</button>
                    </div>
                </li>
        });

        return (
            <ul className="categories-list">{categories}</ul>
        );
    }
}

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: props.categories
        }
    }

    componentWillMount() {
        store.subscribe((cat) => {
            console.log('cat', cat)
        });
    }

    nav(path) {
        store.dispatch({
            type: 'getCategories',
            path: path
        })
    }

    onChange(index, type, checked) {
        let categories = this.state.categories;
        categories[index][type] = !checked;

        this.setState({
            categories
        });
    }

    render() {

        let categories = this.state.categories.map((category, index) => {
            return <li key={index}>
                    <div className="name">{category.name}</div>
                    <label>
                        <input type="checkbox" checked={category.income} onChange={this.onChange.bind(this, index, 'income', category.income)} /> Доход
                    </label>
                    <label>
                        <input type="checkbox" checked={category.outgo}  onChange={this.onChange.bind(this, index, 'outgo', category.outgo)} /> Расход
                    </label>
                </li>
        });

        return (
            <ul className="categories-list">{categories}</ul>
        );
    }
}

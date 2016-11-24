const Categories = require('components/blocks/categories.jsx');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getCategories() {
        $.get('/categories-list')
            .then((categories) => {
                this.setState({
                    categories
                });
            });
    }

    componentWillMount() {
        this.getCategories();
    }

    render() {
        let {categories} = this.state;

        if (!categories) {
            return (<div></div>);
        }

        return (
            <div className="content">
                <h2>Категории</h2>
                <Categories categories={categories} />
            </div>
        );
    }
}

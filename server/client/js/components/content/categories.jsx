const Categories = require('components/blocks/categories');
const AddCategoryForm = require('components/forms/addCategory');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getCategories() {
        $.get('/categories/list')
            .then(({status, result: categories}) => {
                if (status === 'ok'){
                    store.dispatch({
                        type: 'getCategories',
                        categories
                    })
                }
            });
    }

    componentWillMount() {
        store.subscribe(() => {
            this.setState({
                categories: store.getState().categories
            });
        });
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
                <AddCategoryForm />
                <Categories categories={categories} />
            </div>
        );
    }
}

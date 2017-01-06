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
            let state = store.getState(),
                categoryToEdit = state.categoryToEdit || {};

            console.log('state.categoryToEdit', state.categoryToEdit)
            this.setState({
                categories: state.categories,
                categoryToEdit: categoryToEdit
            });
        });
        this.getCategories();
    }

    render() {
        let {categories, categoryToEdit} = this.state;

        if (!categories) {
            return (<div></div>);
        }

        if (!categoryToEdit) {
            categoryToEdit = {}
        }

        console.log('categoryToEdit', categoryToEdit, Boolean(categoryToEdit.income), Boolean(categoryToEdit.outgo))

        return (
            <div className="content">
                <h2>
                    <span className="pt-icon-standard pt-icon-folder-close"></span>
                    Категории
                </h2>
                <div className="cols">
                    <div className="col l-col island">
                        <Categories categories={categories} />
                    </div>
                    <div className="col l-col">
                        <div className="island">
                            <AddCategoryForm />
                        </div>
                        <div className="island">
                            <AddCategoryForm
                                edit={true}
                                name={categoryToEdit.name}
                                income={Boolean(categoryToEdit.income)}
                                outgo={Boolean(categoryToEdit.outgo)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

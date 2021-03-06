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
                categoryToEdit = state.categoryToEdit || false;

            this.setState({
                categoryToEdit: false
            })
            setTimeout(() => {
                this.setState({
                    categories: state.categories,
                    categoryToEdit
                });
            }, 0)

        });
        this.getCategories();
    }

    cancelEdit() {
        this.setState({
            categoryToEdit: false
        })
    }

    render() {
        let {categories, categoryToEdit} = this.state,
            editCategoryForm;

        if (!categories) {
            return (<div></div>);
        }

        if (categoryToEdit) {
            editCategoryForm = <AddCategoryForm
                edit={true}
                id={categoryToEdit.id}
                name={categoryToEdit.name}
                income={Boolean(categoryToEdit.income)}
                outgo={Boolean(categoryToEdit.outgo)}
                cancelEdit={this.cancelEdit.bind(this)} />
        }

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
                        <div className="island oHidden">
                            <AddCategoryForm />
                            {editCategoryForm}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

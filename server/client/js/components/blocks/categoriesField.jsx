const CategoryItem = require('components/blocks/categoryItem')
const NoItems = require('components/elements/noItems')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            types: ['income', 'outgo'],
            currentType: 'income',
            categoryId: 1
        }
    }

    getCategories() {
        $.get('/categories/list?sort=type')
            .then(({status, result: categories}) => {
                if (status === 'ok'){
                    store.dispatch({
                        type: 'getCategoriesByType',
                        categories
                    })
                }
            });
    }

    componentWillMount() {
        store.subscribe(() => {
            let categories = store.getState().categoriesByType

            this.setState({
                categories: categories,
                categoryId: categories[this.state.currentType][0].id
            })
        })

        this.getCategories()
    }

    changePaymentType(e) {
        let currentType = e.target.value,
            categoryId = this.state.categories[currentType][0].id;

        this.setState({
            currentType,
            categoryId
        });
    }

    changeCategoryId() {
        let categoryId = this.categoryIdField.options[this.categoryIdField.selectedIndex].value;

        this.setState({
            categoryId
        });
    }

    render() {
        if (!this.state.categories) {
            return <div></div>
        }

        this.props.changeCategoryParams({
            categoryType: this.state.currentType,
            categoryId: this.state.categoryId
        })

        let paymentTypeElems = this.state.types.map((type) => {
            let checked = this.state.currentType === type

            return <label key={type}>
                {type}
                <input
                    type="radio"
                    value={type}
                    name="paymentType"
                    checked={checked} />
            </label>
        });
        let categories = this.state.categories[this.state.currentType];
        let categoriesOptions = categories.map((category) => {
            return <option key={category.id} value={category.id}>{category.name}</option>
        });

        return (
            <div>
                <fieldset onChange={this.changePaymentType.bind(this)} ref = { (radio) => { this.typeField = radio } }>
                    {paymentTypeElems}
                </fieldset>
                <fieldset>
                    <select value={this.state.categoryId} onChange={this.changeCategoryId.bind(this)} ref={ (select) => this.categoryIdField = select }>
                        {categoriesOptions}
                    </select>
                </fieldset>
            </div>
        );
    }
}

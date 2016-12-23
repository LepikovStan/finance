const CategoryItem = require('components/blocks/categoryItem')
const NoItems = require('components/elements/noItems')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            types: ['income', 'outgo'],
            currentType: props.paymentType || 'income',
            categoryId: Number(props.categoryId) || 1,
            categoryName: props.categoryName || ''
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
            let categories = store.getState().categoriesByType,
                category = categories[this.state.currentType][0];

            this.setState({
                categories: categories,
                categoryId: this.props.categoryId || Number(category.id),
                categoryName: this.props.categoryName || category.name
            })
        })

        this.getCategories()
    }

    changePaymentType(e) {
        let currentType = e.target.value,
            category = this.state.categories[currentType][0],
            categoryId = Number(category.id),
            categoryName = category.name;

        this.setState({
            currentType,
            categoryId,
            categoryName
        });
    }

    changeCategoryId() {
        let categoryId = Number(this.categoryIdField.options[this.categoryIdField.selectedIndex].value),
            categoryName = _.find(this.state.categories[this.state.currentType], {id: categoryId}).name;

        this.setState({
            categoryId,
            categoryName
        });
    }

    render() {
        if (!this.state.categories) {
            return <div></div>
        }

        this.props.changeCategoryParams({
            paymentType: this.state.currentType,
            categoryId: Number(this.state.categoryId),
            categoryName: this.state.categoryName
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

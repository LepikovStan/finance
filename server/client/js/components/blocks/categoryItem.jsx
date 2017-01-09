_ = require('lodash')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange(type, category) {
        category[type] = !category[type];
        store.dispatch({
            type: 'changeCategory',
            category
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

    saveCategoryChange(category) {
        let categoryNameNew = this.changeCategoryNameInput.value
        if (categoryNameNew) {
            category.name = categoryNameNew
        }
        this.changeCategory(category);
    }

    editCategory() {
        store.dispatch({
            type: 'editCategory',
            category: _.clone(this.props.category)
        })
    }

    render() {
        let category = _.clone(this.props.category);
        let incomeClassName = category.income ? 'active' : '',
            outgoClassName = category.outgo ? 'active' : '',
            categoryClassName = '',
            categoryElem = (
                <div className="name">
                    {category.name}
                </div>
            ),
            incomeLabel = (
                <label className={incomeClassName}>
                    В доходе
                </label>
            ),
            outgoLabel = (
                <label className={outgoClassName}>
                    В расходе
                </label>
            ),
            actions =
                <div className="actions">
                    <button className="pt-button pt-icon-edit" onClick={this.editCategory.bind(this, category.id)}></button>
                    <button className="pt-button pt-icon-trash" onClick={this.deleteCategory.bind(this, category.id)}></button>
                </div>;

        return (
            <li key={category.id} className={categoryClassName}>
                {categoryElem}
                {incomeLabel}
                {outgoLabel}
                {actions}
            </li>
        );
    }
}

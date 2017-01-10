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

    delete(categoryId) {
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

    edit() {
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
            buttons =
                <div className="buttons">
                    <button className="pt-button pt-icon-edit" onClick={this.edit.bind(this, category.id)}></button>
                    <button className="pt-button pt-icon-trash" onClick={this.delete.bind(this, category.id)}></button>
                </div>;

        return (
            <li key={category.id} className={categoryClassName}>
                {categoryElem}
                {incomeLabel}
                {outgoLabel}
                {buttons}
            </li>
        );
    }
}

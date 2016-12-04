module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: props.category || {},
            editCategoryName: false
        }
    }

    onChange(type, category) {
        category[type] = !category[type];
        store.dispatch({
            type: 'changeCategory',
            category
        })
    }

    changeCategory(category) {
        return $.ajax({
            url: `/category/${category.id}`,
            method: 'PUT',
            data: {
                category
            }
        })
        .then(({status}) => {
            if (status) {
                store.dispatch({
                    type: 'changeCategory',
                    category
                })
                this.setState({
                    editCategoryName: false
                })
            }
        })
        .catch((error) => {
            console.log('error', error)
        });
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
        category.name = this.changeCategoryNameInput.value
        this.changeCategory(category);
    }

    cancelCategoryChange() {
        this.setState({
            editCategoryName: false
        })
    }

    editCategory() {
        this.setState({
            editCategoryName: true
        })
    }

    render() {
        let category = _.clone(this.props.category);
        let categoryElem,
            incomeLabel,
            outgoLabel,
            actions,
            incomeClassName = category.income ? 'active' : '',
            outgoClassName = category.outgo ? 'active' : '',
            categoryClassName = '';

        if (this.state.editCategoryName) {
            categoryClassName = 'edit';
            categoryElem = (
                <div className="changeCategoryNameForm">
                    <input type="text"
                        className="name"
                        autoFocus={true}
                        placeholder={category.name}
                        ref={(changeCategoryNameInput) => this.changeCategoryNameInput = changeCategoryNameInput} />
                </div>
            );
            incomeLabel = (
                <label className={incomeClassName}>
                    <input type="checkbox" checked={category.income} onChange={this.onChange.bind(this, 'income', category)} />
                    В доходе
                </label>
            );
            outgoLabel = (
                <label className={outgoClassName}>
                    <input type="checkbox" checked={category.outgo}  onChange={this.onChange.bind(this, 'outgo', category)} />
                    В расходе
                </label>
            );
            actions =
                <div className="actions">
                    <button onClick={this.saveCategoryChange.bind(this, category)}>сохранить</button>
                    <button onClick={this.cancelCategoryChange.bind(this, category)}>отмена</button>
                    <button onClick={this.editCategory.bind(this, category.id)}>редактировать</button>
                    <button onClick={this.deleteCategory.bind(this, category.id)}>удалить</button>
                </div>

        } else {
            categoryElem = (
                <div className="name">
                    {category.name}
                </div>
            );
            incomeLabel = (
                <label className={incomeClassName}>
                    В доходе
                </label>
            );
            outgoLabel = (
                <label className={outgoClassName}>
                    В расходе
                </label>
            );
            actions =
                <div className="actions">
                    <button onClick={this.editCategory.bind(this, category.id)}>редактировать</button>
                    <button onClick={this.deleteCategory.bind(this, category.id)}>удалить</button>
                </div>
        }

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

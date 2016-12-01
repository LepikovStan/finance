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

    onChangeCategoryName(category) {
        this.setState({
            editCategoryName: true
        })
    }

    saveCategoryName(category) {
        category.name = this.changeCategoryNameInput.value
        this.changeCategory(category);
    }

    cancelCategoryName() {
        this.setState({
            editCategoryName: false
        })
    }

    render() {
        let category = _.clone(this.props.category);
        let categoryElem;

        if (this.state.editCategoryName) {
            categoryElem =
                <div className="changeCategoryNameForm">
                    <input type="text"
                        className="name"
                        autoFocus={true}
                        placeholder={category.name}
                        ref={(changeCategoryNameInput) => this.changeCategoryNameInput = changeCategoryNameInput} />
                    <button onClick={this.saveCategoryName.bind(this, category)}>ok</button>
                    <button onClick={this.cancelCategoryName.bind(this, category)}>X</button>
                </div>
        } else {
            categoryElem =
                <div className="name" onClick={this.onChangeCategoryName.bind(this)}>
                    {category.name}
                    <span>edit</span>
                </div>
        }

        return (
            <li key={category.id}>
                {categoryElem}
                <label>
                    <input type="checkbox" checked={category.income} onChange={this.onChange.bind(this, 'income', category)} /> Доход
                </label>
                <label>
                    <input type="checkbox" checked={category.outgo}  onChange={this.onChange.bind(this, 'outgo', category)} /> Расход
                </label>
                <div className="actions">
                    <button onClick={this.deleteCategory.bind(this, category.id)}>удалить</button>
                </div>
            </li>
        );
    }
}

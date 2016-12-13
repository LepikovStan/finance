const CategoryItem = require('components/blocks/categoryItem')
const NoItems = require('components/elements/noItems')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: props.categories || []
        }
    }

    componentWillMount() {
        store.subscribe(() => {
            this.setState({
                categories: store.getState().categories
            })
        })
    }

    render() {
        let categories,
            content;

        if (this.state.categories.length) {
            categories = this.state.categories.map((category, index) => {
                category.index = index;
                return <CategoryItem key={index} category={category} />
            });
            content = <ul>{categories}</ul>
        } else {
            content = <NoItems text="У вас ещё нет категорий" />
        }

        return (
            <div className="categories-list">{content}</div>
        );
    }
}

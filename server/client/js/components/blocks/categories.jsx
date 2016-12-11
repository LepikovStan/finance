const CategoryItem = require('components/blocks/categoryItem')

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

        if (!this.state.categories.length) {
            content = <div className="noitems">У вас ещё нет категорий</div>
        } else {
            categories = this.state.categories.map((category, index) => {
                category.index = index;
                return <CategoryItem key={index} category={category} />
            });
            content = <ul>{categories}</ul>
        }

        return (
            <div className="categories-list">{content}</div>
        );
    }
}

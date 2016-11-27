const CategoryItem = require('components/blocks/categoryItem')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: props.categories
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
        let categories = this.state.categories.map((category, index) => {
            category.index = index;
            return <CategoryItem key={index} category={category} />
        });

        return (
            <ul className="categories-list">{categories}</ul>
        );
    }
}

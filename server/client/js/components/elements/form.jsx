module.exports = class extends React.Component {
    render() {
        return (
            <form>
                {this.props.children}
            </form>
        );
    }
}

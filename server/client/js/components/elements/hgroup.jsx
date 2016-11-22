module.exports = class extends React.Component {
    render() {
        return (
            <div className="hgroup">
                <h3>{this.props.title}</h3>
                <a href="#">создать</a>
            </div>
        );
    }
}

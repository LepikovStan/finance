module.exports = class extends React.Component {
    render() {
        return (
            <div className="hgroup">
                <h2>{this.props.title}</h2>
                <a href="#">создать</a>
            </div>
        );
    }
}

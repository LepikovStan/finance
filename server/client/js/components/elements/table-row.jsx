module.exports = class extends React.Component {
    render() {
        let cells = [];
        for (let name in this.props) {
            if (name !== 'index') {
                cells.push(<td>{this.props[name]}</td>);
            }
        }

        return (
            <tr key={this.props.index}>
                {cells}
            </tr>
        );
    }
}

let Table = require('components/elements/table');

module.exports = class extends React.Component {
    render() {
        return (
            <Table payments={this.props.payments}></Table>
        );
    }
}

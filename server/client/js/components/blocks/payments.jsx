const Table = require('components/elements/table');
const moment = require('moment');

module.exports = class extends React.Component {
    render() {
        this.props.payments.map((payment) => {
            let date = moment(new Date(payment.time));
            payment.time = date.format('LL');
        });

        return (
            <Table payments={this.props.payments}></Table>
        );
    }
}

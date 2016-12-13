const moment = require('moment');
const querystring = require('querystring');
const Table = require('components/elements/table');
const NoItems = require('components/elements/noItems');

module.exports = class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            payments: []
        }
    }

    getPayments() {
        let type = this.props.type || 'list';
        let filter = this.props.filter;
        let query = '';

        if (filter) {
            query = querystring.stringify({filter});
            query = `?${query}`
        }

        $.get(`/payments/${type}/${query}`)
            .then(({status, result: payments}) => {
                if (status === 'ok')  {
                    this.setState({
                        payments
                    });
                }
            });
    }

    componentWillMount() {
        this.getPayments();
    }

    render() {
        let payments = this.state.payments,
            content;

        if (payments.length) {
            payments.map((payment) => {
                let date = moment(new Date(payment.time));
                if (!payment.date){
                    payment.date = date.format('LL');
                }
                delete payment.time;
            });
            content = <Table payments={this.state.payments}></Table>
        } else {
            content = <NoItems text="У вас ещё нет платежей" />
        }

        return (
            <div className="payments-list">{content}</div>
        );
    }
}

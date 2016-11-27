const Table = require('components/elements/table');
const moment = require('moment');
const querystring = require('querystring');

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
        this.state.payments.map((payment) => {
            let date = moment(new Date(payment.time));
            if (!payment.date){
                payment.date = date.format('LL');
            }
            delete payment.time;
        });

        return (
            <Table payments={this.state.payments}></Table>
        );
    }
}

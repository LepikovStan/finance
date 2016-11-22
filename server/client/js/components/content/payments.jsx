let Payments = require('components/payments/payments.jsx');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    sortByDate(payments, desc) {
        if (desc) {
            return payments.sort((a, b) => {
                return b.time > a.time;
            })
        } else {
            return payments.sort((a, b) => {
                return a.time > b.time;
            })
        }
    }

    getPayments() {
        $.get('/payments-list')
            .then((payments) => {
                this.setState({
                    payments
                });
            });
    }

    componentWillMount() {
        this.getPayments();
    }

    render() {
        let {payments} = this.state;

        if (!payments) {
            return (<div></div>);
        }
        payments = this.sortByDate(payments);

        return (
            <div className="content">
                <h2>Платежи</h2>
                <Payments payments={payments} />
            </div>
        );
    }
}

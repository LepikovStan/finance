const Balance = require('components/balance.jsx');
const Hgroup = require('components/elements/hgroup.jsx');
const Payments = require('components/blocks/payments.jsx');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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

    filterByNow(payments, past) {
        let now = Date.now();

        if (past) {
            return payments.filter((payment) => {
                return payment.time < now;
            });
        } else {
            return payments.filter((payment) => {
                return payment.time >= now;
            });
        }
    }

    filterLastMin(payments, desc) {
        return payments.splice(0, 5);
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

    preparePayments(payments, past) {
        payments = this.filterByNow(payments, past);
        payments = this.sortByDate(payments, past);
        payments = this.filterLastMin(payments);

        return payments;
    }


    render() {
        let {payments} = this.state;

        if (!payments) {
            return (<div></div>);
        }

        let lastPayments = this.preparePayments(payments, true);
        let futurePayments = this.preparePayments(payments);

        return (
            <section className="payments mt50 cols">
                <div className="col">
                    <Hgroup title="Последние платежи" />
                </div>
                <div className="col">
                    <Hgroup title="Предстоящие платежи" />
                </div>
            </section>
        );
    }
}

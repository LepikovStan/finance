const moment = require('moment');
const querystring = require('querystring');
const NoItems = require('components/elements/noItems');
const PaymentItem = require('components/blocks/paymentItem');

module.exports = class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            payments: [],
            type: this.props.type || 'list',
            filter: this.props.filter
        }
    }

    getPayments() {
        let {type, filter} = this.state,
            query = '';

        if (filter) {
            query = querystring.stringify({filter});
            query = `?${query}`
        }

        $.get(`/payments/${type}/${query}`)
            .then(({status, result: payments}) => {
                if (status === 'ok')  {
                    store.dispatch({
                        type: 'getPayments',
                        payments
                    })
                }
            });
    }

    componentWillMount() {
        store.subscribe(() => {
            this.setState({
                payments: store.getState().payments
            })
        })
        this.getPayments();
    }

    render() {
        let payments = this.state.payments,
            content,
            rows = [];

        if (payments && payments.length) {
            payments.map((payment, key) => {
                rows.push(
                    <PaymentItem
                        key={key}
                        id={payment.id}
                        date={payment.date}
                        type={this.state.type}
                        paymentType={payment.paymentType}
                        amount={payment.amount}
                        categoryName={payment.categoryName}
                        categoryId={payment.categoryId} />
                );
            });
            content = <table className="full"><tbody>{rows}</tbody></table>
        } else {
            content = <NoItems text="У вас ещё нет платежей" />
        }

        return (
            <div className="payments-list">{content}</div>
        );
    }
}

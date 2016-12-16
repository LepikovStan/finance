const moment = require('moment');
const Row = require('components/elements/table-row');

module.exports = class extends React.Component {
    render() {
        return (
            <table className="full">
                <tbody>
                    {
                        this.props.payments.map((payment, index) => {
                            let date = moment(payment.date).format('LL');

                            return (<Row
                                key={payment.id}
                                date={date}
                                category={payment.category_name}
                                amount={payment.amount}
                            />);
                        })
                    }
                </tbody>
            </table>
        );
    }
}

const Row = require('components/elements/table-row');

module.exports = class extends React.Component {
    render() {
        return (
            <table className="full">
                <tbody>
                    {
                        this.props.payments.map((payment, index) => {
                            return (<Row
                                key={payment.id}
                                date={payment.date}
                                category={payment.category}
                                summ={payment.summ}
                            />);
                        })
                    }
                </tbody>
            </table>
        );
    }
}

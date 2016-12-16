const Payments = require('components/blocks/payments');
const AddOncePaymentForm = require('components/forms/addOncePayment');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="content b-payments">
                <h2>Платежи</h2>
                <AddOncePaymentForm />
                <div className="cols">
                    <div className="col">
                        <Payments type="last" filter="15" />
                    </div>
                    <div className="col">
                        <Payments type="future" filter="15" />
                    </div>
                </div>
            </div>
        );
    }
}

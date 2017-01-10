const Payments = require('components/blocks/payments');
const AddOncePaymentForm = require('components/forms/addOncePayment');
const { Tabs, TabList, Tab, TabPanel } = require('@blueprintjs/core')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        store.subscribe(() => {
            let state = store.getState(),
                paymentToEdit = state.paymentToEdit || false;

            this.setState({
                paymentToEdit
            });

        })
    }

    cancelEdit() {
        this.setState({
            paymentToEdit: false
        })
    }

    render() {
        let {paymentToEdit} = this.state,
            editPaymentForm;

        if (paymentToEdit) {
            editPaymentForm = <AddOncePaymentForm
                edit={true}
                id={paymentToEdit.id}
                date={new Date(paymentToEdit.date)}
                paymentType={paymentToEdit.paymentType}
                categoryId={paymentToEdit.categoryId}
                cancelEdit={this.cancelEdit.bind(this)}
                amount={paymentToEdit.amount} />
        }

        return (
            <div className="content b-payments">
                <h2>
                    <span className="pt-icon-standard pt-icon-changes"></span>
                    Платежи
                </h2>
                <div className="cols">
                    <div className="col l-col island">
                        <Payments filter="15" />
                    </div>
                    <div className="col l-col">
                        <div className="island oHidden">
                            <AddOncePaymentForm />
                            {editPaymentForm}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

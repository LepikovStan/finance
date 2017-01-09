const Payments = require('components/blocks/payments');
const AddOncePaymentForm = require('components/forms/addOncePayment');
const { Tabs, TabList, Tab, TabPanel } = require('@blueprintjs/core')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="content b-payments">
                <h2>
                    <span className="pt-icon-standard pt-icon-changes"></span>
                    Платежи
                </h2>
                <div className="cols">
                    <div className="col l-col island">
                        <Tabs>
                            <TabList>
                                <Tab><h3>Прошедшие</h3></Tab>
                                <Tab><h3>Будущие</h3></Tab>
                            </TabList>
                            <TabPanel>
                                <Payments type="last" filter="15" />
                            </TabPanel>
                            <TabPanel>
                                <Payments type="future" filter="15" />
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className="col l-col">
                        <div className="island oHidden">
                            <AddOncePaymentForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

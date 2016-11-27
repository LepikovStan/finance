const Payments = require('components/blocks/payments');
const { Tabs, TabList, Tab, TabPanel } = require("@blueprintjs/core");

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="content">
                <h2>Платежи</h2>
                <Tabs>
                    <TabList>
                        <Tab>Прошедшие</Tab>
                        <Tab>Предстоящие</Tab>
                    </TabList>
                    <TabPanel>
                        <Payments type="last" filter="15" />
                    </TabPanel>
                    <TabPanel>
                        <Payments type="future" filter="15" />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

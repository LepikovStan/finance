const Balance = require('components/balance');
const Payments = require('components/blocks/payments');
const Hgroup = require('components/elements/hgroup');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="content">
                <Balance />
                <section className="payments mt50 cols">
                    <div className="col">
                        <Hgroup title="Последние платежи" />
                        <Payments type="last" filter="5" />
                    </div>
                    <div className="col">
                        <Hgroup title="Предстоящие платежи" />
                        <Payments type="future" filter="5" />
                    </div>
                </section>
            </div>
        );
    }
}

const Reports = require('components/blocks/reports')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
    }

    render() {

        return (
            <div className="content">
                <h2>Отчёты</h2>
                <Reports />
            </div>
        );
    }
}

const SettingsForm = require('components/forms/settings');

module.exports = class extends React.Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className="content">
                <h2>Настройки</h2>
                <SettingsForm />
            </div>
        );
    }
}

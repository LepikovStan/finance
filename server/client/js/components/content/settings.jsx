const SettingsForm = require('components/forms/settings');

module.exports = class extends React.Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className="content">
                <h2>
                    <span className="pt-icon-standard pt-icon-settings"></span>
                    Настройки
                </h2>
                <SettingsForm />
            </div>
        );
    }
}

const { Link } = require('react-router');

module.exports = class extends React.Component {
    render() {
        return (
            <div className="account-menu">
                <ul>
                    <li><Link to="/logout">Выход</Link></li>
                    <li><Link to="/settings">Настройки</Link></li>
                </ul>
            </div>
        );
    }
}

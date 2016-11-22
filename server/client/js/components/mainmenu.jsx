let { Link } = require('react-router');

module.exports = class extends React.Component {
    render() {
        return (
            <div className="main-menu">
                <ul>
                     <li><Link to="/">Панель</Link></li>
                     <li><Link to="/payments">Платежи</Link></li>
                     <li><Link to="/category">Категории</Link></li>
                 </ul>
             </div>
        );
    }
}

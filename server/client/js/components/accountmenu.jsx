const { Link } = require('react-router');

module.exports = class extends React.Component {

    logout() {
        $.ajax({
            url: '/user/logout',
            method: 'GET'
        })
        .then(({status}) => {
            if (status === 'ok') {
                store.dispatch({
                    type: 'logoutUser'
                })
            }
        })
        .catch((res) => {
            res = JSON.parse(res.responseText);
            this.setState({
                error: res.error
            })
        });
    }

    render() {
        return (
            <div className="account-menu">
                <ul>
                    <li><span onClick={this.logout.bind(this)}>Выход</span></li>
                    <li><Link to="/settings">Настройки</Link></li>
                </ul>
            </div>
        );
    }
}

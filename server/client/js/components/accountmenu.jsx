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
                    <li onClick={this.logout.bind(this)}>
                        <span className="pt-icon-standard pt-icon-log-out"></span>
                    </li>
                    <li><Link to="/settings"><span className="pt-icon-standard pt-icon-settings"></span></Link></li>
                </ul>
            </div>
        );
    }
}

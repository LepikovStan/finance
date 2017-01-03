const Header = require('components/header');
const Footer = require('components/footer');
const MainMenu = require('components/mainmenu');
const Auth = require('components/content/auth');

module.exports = class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: false
        }
    }

    componentWillMount() {
        let user = store.getState().user;

        if (user.status === 'guest') {
            this.checkAuth()
        }

        store.subscribe(() => {
            let user = store.getState().user;

            this.setState({
                auth: user.status !== 'guest'
            });
        })
    }

    checkAuth() {
        $.ajax({
            url: 'user/login',
            method: 'GET'
        })
        .then(({status, result: user}) => {
            if (status === 'ok') {
                store.dispatch({
                    type: 'authUser',
                    user
                })
            } else {
                console.warn('status not ok', result)
            }
        })
        .catch((res) => {
        });
    }

    render() {
        if (true) {
            return (
                <div className="wrapper cols">
                    <div className="l-col col">
                        <MainMenu />
                    </div>
                    <div className="r-col col main-info">
                        <Header />
                        { this.props.children }
                        <Footer />
                    </div>
                </div>
            );
        } else {
            return <div className="wrapper">
                <Auth />
                <Footer />
            </div>
        }
    }
}

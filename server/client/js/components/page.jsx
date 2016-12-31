const Header = require('components/header');
const Footer = require('components/footer');
const Auth = require('components/content/auth');

module.exports = class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: false
        }
    }

    checkAuth() {
        $.get('/categories/list')
            .then(({status, result}) => {
                if (status === 'ok'){
                    store.dispatch({
                        type: 'setAuth',
                        result
                    })
                }
            });
    }

    render() {
        if (this.state.auth) {
            return (
                <div className="wrapper">
                    <Header />
                    { this.props.children }
                    <Footer />
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

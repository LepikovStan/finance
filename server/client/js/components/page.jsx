const Header = require('components/header');
const Footer = require('components/footer');

module.exports = class extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header />
                { this.props.children }
                <Footer />
            </div>
        );
    }
}

let Header = require('components/header.jsx');
let Footer = require('components/footer.jsx');

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

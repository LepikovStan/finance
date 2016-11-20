let Header = require('components/header.jsx');
let Balance = require('components/balance.jsx');
let Payments = require('components/payments/payments.jsx');
let Footer = require('components/footer.jsx');

class Page extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header />
                <Balance />
                <Payments />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<Page />, document.getElementById('root'));

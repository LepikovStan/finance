let Page = require('components/page.jsx');
let { Route, IndexRoute } = require('react-router');
let Main = require('components/content/main.jsx');
let Payments = require('components/content/payments.jsx');

module.exports = (
    <Route path="/" component={Page}>
        <IndexRoute component={Main} />
        <Route path="/payments" component={Payments} />
    </Route>
);

const Page = require('components/page.jsx');
const Page404 = require('components/page404.jsx');
const { Route, IndexRoute, NotFoundRoute } = require('react-router');
const Main = require('components/content/main.jsx');
const Payments = require('components/content/payments.jsx');
const Categories = require('components/content/categories.jsx');

module.exports = (
    <Route path="/" component={Page}>
        <IndexRoute component={Main} />
        <Route path="/payments" component={Payments} />
        <Route path="/categories" component={Categories}/>
        <Route path="*" component={Page404}/>
    </Route>
);

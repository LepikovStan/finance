const Page = require('components/page');
const Page404 = require('components/page404');
const Main = require('components/content/main');
const Payments = require('components/content/payments');
const Categories = require('components/content/categories');
const Settings = require('components/content/settings');
const Reports = require('components/content/reports');
const Auth = require('components/content/auth');

const { Route, IndexRoute, NotFoundRoute } = require('react-router');

module.exports = (
    <Route path="/" component={Page}>
        <IndexRoute component={Main} />
        <Route path="/payments" component={Payments} />
        <Route path="/categories" component={Categories}/>
        <Route path="/reports" component={Reports}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/auth" component={Auth} />
        <Route path="*" component={Page404}/>
    </Route>
);

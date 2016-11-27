const { Router, browserHistory } = require('react-router');
let routes = require('components/routes/routes');

ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('root'));

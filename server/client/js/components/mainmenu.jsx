const { Link } = require('react-router');
const menulist = {
    "/": "Панель",
    "/payments": "Платежи",
    "/categories": "Категории",
    "/reports": "Отчёты"
};
const icons = {
    "/": "pt-icon pt-icon-dashboard",
    "/payments": "pt-icon pt-icon-changes",
    "/categories": "pt-icon pt-icon-folder-close",
    "/reports": "pt-icon pt-icon-chart"
}

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: store.getState().mainmenu.active
        }
    }

    componentWillMount() {
        store.subscribe(() => {
            this.setState({
                active: store.getState().mainmenu.active
            })
        });
    }

    nav(path) {
        store.dispatch({
            type: 'navMain',
            path: path
        })
    }

    render() {
        return (
            <div className="main-menu">
                <ul>
                    {
                        Object
                            .keys(menulist)
                            .map((path, index) => {
                                let className = ''

                                if (path === this.state.active || `${path}/` === this.state.active) {
                                    className = 'active';
                                }
                                return <li key={index} className={className}>
                                    <Link onClick={this.nav.bind(this, path)} to={path}>
                                        <span className={icons[path]}></span>
                                        {menulist[path]}
                                    </Link>
                                </li>
                            })
                    }
                 </ul>
             </div>
        );
    }
}

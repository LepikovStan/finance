let MainMenu = require('components/mainmenu.jsx');
let AccountMenu = require('components/accountmenu.jsx');

module.exports = class extends React.Component {
    render() {
        return (
            <header className="top-info">
                <MainMenu />
                <AccountMenu />
            </header>
        );
    }
}

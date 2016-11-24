const MainMenu = require('components/mainmenu.jsx');
const AccountMenu = require('components/accountmenu.jsx');

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

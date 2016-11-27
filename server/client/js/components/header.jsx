const MainMenu = require('components/mainmenu');
const AccountMenu = require('components/accountmenu');

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

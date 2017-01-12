const Form = require('components/elements/form');
const { Tabs, TabList, Tab, TabPanel } = require('@blueprintjs/core')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            pass: ''
        };
    }

    onSubmit(e) {
        e.preventDefault()

        $.ajax({
            url: this.form.action,
            method: 'POST',
            data: {
                login: this.loginInput.value,
                pass: this.passInput.value
            }
        })
        .then(({status, result: user}) => {
            if (status === 'ok') {
                store.dispatch({
                    type: 'authUser',
                    user
                })
            } else {
                console.warn('status not ok', result)
            }
        })
        .catch((res) => {
            res = JSON.parse(res.responseText);
            this.setState({
                error: res.error
            })
        });
    }

    changeTab() {
        setTimeout((() => {
            this.setState({error: null})
        }).bind(this), 0)
    }

    onChangeLogin(e) {
        let value = e.target.value

        this.setState({
            login: value
        })
    }

    onChangePass(e) {
        let value = e.target.value

        this.setState({
            pass: value
        })
    }

    render() {
        let error;

        if (this.state.error) {
            error = <div className="error">{this.state.error.message}</div>
        }

        return (
            <div className="content auth">
                <Tabs onChange={this.changeTab.bind(this)}>
                    <TabList>
                        <Tab><h2>Вход</h2></Tab>
                        <Tab><h2>Регистрация</h2></Tab>
                    </TabList>
                    <TabPanel>
                        <form onSubmit={ this.onSubmit.bind(this) } action="/user/login" ref={(form) => this.form = form }>
                            {error}
                            <fieldset>
                                <label className="pt-label">
                                    Логин:
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-log-in"></span>
                                        <input className="pt-input" autoFocus value={this.state.login} type="text" onChange={this.onChangeLogin.bind(this)} name="login" ref={(loginInput) => this.loginInput = loginInput} />
                                    </div>
                                </label>
                            </fieldset>
                            <fieldset>
                                <label className="pt-label">
                                    Пароль:
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-lock"></span>
                                        <input className="pt-input" value={this.state.pass} type="password" onChange={this.onChangePass.bind(this)} name="pass" ref={(passInput) => this.passInput = passInput} />
                                    </div>
                                </label>
                            </fieldset>
                            <button className="pt-button">Войти</button>
                        </form>
                    </TabPanel>
                    <TabPanel>
                        <form onSubmit={ this.onSubmit.bind(this) } action="/user/reg" ref={(form) => this.form = form }>
                            {error}
                            <fieldset>
                                <label className="pt-label">
                                    Логин:
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-log-in"></span>
                                        <input className="pt-input" autoFocus value={this.state.login} type="text" onChange={this.onChangeLogin.bind(this)} name="login" ref={(loginInput) => this.loginInput = loginInput} />
                                    </div>
                                </label>
                            </fieldset>
                            <fieldset>
                                <label className="pt-label">
                                    Пароль:
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-lock"></span>
                                        <input className="pt-input" value={this.state.pass} type="password" onChange={this.onChangePass.bind(this)} name="pass" ref={(passInput) => this.passInput = passInput} />
                                    </div>
                                </label>
                            </fieldset>
                            <button className="pt-button">Зарегистрироваться</button>
                        </form>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

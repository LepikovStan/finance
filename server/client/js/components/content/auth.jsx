const Form = require('components/elements/form');
const { Tabs, TabList, Tab, TabPanel } = require('@blueprintjs/core')

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        .then(({status, result}) => {
            if (status === 'ok') {
                console.log('result', result)
            } else {
                console.log('res', result)
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
        let self = this;

        return () => {
        }
    }

    render() {
        let error;

        if (this.state.error) {
            error = <div className="error">{this.state.error.message}</div>
        }

        return (
            <div className="content auth">
                <Tabs onChange={this.changeTab()}>
                    <TabList>
                        <Tab><h2>Вход</h2></Tab>
                        <Tab><h2>Регистрация</h2></Tab>
                    </TabList>
                    <TabPanel>
                        <form onSubmit={ this.onSubmit.bind(this) } action="/user/login" ref={(form) => this.form = form }>
                            {error}
                            <fieldset>
                                <label>Логин: <input type="text" name="login" ref={(loginInput) => this.loginInput = loginInput} /></label>
                            </fieldset>
                            <fieldset>
                                <label>Пароль: <input type="password" name="pass" ref={(passInput) => this.passInput = passInput} /></label>
                            </fieldset>
                            <button>Войти</button>
                        </form>
                    </TabPanel>
                    <TabPanel>
                        <form onSubmit={ this.onSubmit.bind(this) } action="/user/reg" ref={(form) => this.form = form }>
                            {error}
                            <fieldset>
                                <label>Логин: <input type="text" name="login" ref={(loginInput) => this.loginInput = loginInput} /></label>
                            </fieldset>
                            <fieldset>
                                <label>Пароль: <input type="password" name="pass" ref={(passInput) => this.passInput = passInput} /></label>
                            </fieldset>
                            <button>Зарегистрироваться</button>
                        </form>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

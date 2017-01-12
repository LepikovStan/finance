let countries = [
    {id:1,name:'Россия'},
    {id:5,name:'Азербайджан'},
    {id:6,name:'Армения'},
    {id:12,name:'Беларусь'},
    {id:3,name:'Германия'},
    {id:18,name:'Испания'},
    {id:7,name:'Казахстан'},
    {id:8,name:'Киргизия'},
    {id:13,name:'Латвия'},
    {id:14,name:'Литва'},
    {id:9,name:'Молдавия'},
    {id:10,name:'Таджикистан'},
    {id:11,name:'Узбекистан'},
    {id:2,name:'Украина'},
    {id:15,name:'Эстония'}
]

module.exports = class extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currency: [],
            countries: countries
        }
    }

    onSubmit(e) {
        e.preventDefault()
    }

    getCurrency() {
        $.ajax({
            url: '/currency',
            method: 'GET'
        })
        .then(({status, result: currency}) => {
            if (status === 'ok') {
                this.setState({
                    currency
                })
            }
        })
        .catch((error) => {
            console.log('error', error)
        })
    }

    componentWillMount() {
        this.getCurrency()
    }

    render() {
        let currencyItems = this.state.currency.map((item) => {
                return <option value={item.id}>{item.name} ({item.sign})</option>
            }),
            countryItems = this.state.countries.map((item) => {
                return <option value={item.id}>{item.name}</option>
            })

        return (
            <div className="b-settings">
                <div className="island">
                    <h3><span className="decor">Личная информация</span></h3>
                    <form className="personal-settings" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                        <fieldset>
                            <label className="pt-label pt-inline">
                                <span className="label-text">Страна</span>
                                <div className="pt-select">
                                    <select>{countryItems}</select>
                                </div>
                            </label>
                        </fieldset>
                        <fieldset>
                            <label className="pt-label pt-inline">
                                <span className="label-text">Валюта</span>
                                <div className="pt-select">
                                    <select>{currencyItems}</select>
                                </div>
                            </label>
                        </fieldset>
                        <fieldset>
                            <label className="pt-label pt-inline">
                                <span className="label-text">E-mail</span>
                                <div className="pt-input-group">
                                    <span className="pt-icon pt-icon-envelope"></span>
                                    <input className="pt-input" type="text" />
                                </div>
                            </label>
                        </fieldset>
                        <div className="buttons">
                            <button className="pt-button">Сохранить</button>
                        </div>
                    </form>
                    <h3><span className="decor">Изменить пароль</span></h3>
                    <form className="auth-settings" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                        <fieldset>
                            <label className="pt-label pt-inline">
                                <span className="label-text">Старый пароль</span>
                                <div className="pt-input-group">
                                    <span className="pt-icon pt-icon-lock"></span>
                                    <input className="pt-input" type="password" />
                                </div>
                            </label>
                        </fieldset>
                        <fieldset>
                            <label className="pt-label pt-inline">
                                <span className="label-text">Новый пароль</span>
                                <div className="pt-input-group">
                                    <span className="pt-icon pt-icon-lock"></span>
                                    <input className="pt-input" type="password" />
                                </div>
                            </label>
                        </fieldset>
                        <div className="buttons">
                            <button className="pt-button">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

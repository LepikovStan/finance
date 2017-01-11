module.exports = class extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currency: []
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
        let currencyItems = this.state.currency.map((cItem) => {
                return <option value={cItem.id}>{cItem.name} ({cItem.sign})</option>
            })

        return (
            <div className="b-settings">
                <div className="island">
                    <form className="settings" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                        <fieldset>
                            <label className="pt-label pt-inline">
                                Валюта
                                <div className="pt-select">
                                    <select>{currencyItems}</select>
                                </div>
                            </label>
                        </fieldset>
                        <label className="pt-label pt-inline">
                            E-mail
                            <div className="pt-input-group">
                                <span className="pt-icon pt-icon-password"></span>
                                <input className="pt-input" type="text" />
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

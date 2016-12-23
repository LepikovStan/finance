module.exports = class extends React.Component {

    onSubmit(e) {
        e.preventDefault()
    }

    render() {
        return (
            <form className="settings" onSubmit={ this.onSubmit.bind(this) } ref={(form) => this.form = form }>
                <fieldset>
                    <label>
                        <span>Страна</span>
                        <select>
                            <option value="5">Азербайджан</option>
                            <option value="6">Армения</option>
                            <option value="12">Беларусь</option>
                            <option value="3">Германия</option>
                            <option value="18">Испания</option>
                            <option value="7">Казахстан</option>
                            <option value="8">Киргизия</option>
                            <option value="13">Латвия</option>
                            <option value="14">Литва</option>
                            <option value="9">Молдавия</option>
                            <option value="1">Россия</option>
                            <option value="10">Таджикистан</option>
                            <option value="11">Узбекистан</option>
                            <option value="2">Украина</option>
                            <option value="15">Эстония</option>
                        </select>
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <span>Город</span>
                        <select>
                            <option value="5">Санкт-Петербург</option>
                        </select>
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <span>Валюта</span>
                        <select>
                            <option value="5">Рубль</option>
                        </select>
                    </label>
                </fieldset>
            </form>
        );
    }
}

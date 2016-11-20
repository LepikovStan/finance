let Hgroup = require('components/elements/hgroup');

module.exports = class extends React.Component {

    getPayments() {
        $.get('/payments')
            .then((payments) => {
                this.setState({
                    payments
                });
            });
    }

    componentDidMount() {
        this.getPayments();
    }

    render() {
        console.log(this.state);
        return (
            <section className="payments mt50 cols">
                <div className="col">
                    <Hgroup title="Последние платежи" />
                    <table className="full">
                        <tbody>
                            <tr>
                                <td>10 ноября 2016</td>
                                <td>Обед</td>
                                <td></td>
                                <td>-250р</td>
                            </tr>
                            <tr>
                                <td>12 ноября 2016</td>
                                <td>Авто</td>
                                <td>помыл машину</td>
                                <td>-1000р</td>
                            </tr>
                            <tr>
                                <td>14 ноября 2016</td>
                                <td>Зарплата</td>
                                <td></td>
                                <td>+20 000р</td>
                            </tr>
                            <tr>
                                <td>15 ноября 2016</td>
                                <td>Обед</td>
                                <td></td>
                                <td>-250р</td>
                            </tr>
                            <tr>
                                <td>19 ноября 2016</td>
                                <td>Авто</td>
                                <td>помыл машину</td>
                                <td>-1000р</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <Hgroup title="Предстоящие платежи" />
                    <table className="full">
                        <tbody>
                            <tr>
                                <td>25 ноября 2016</td>
                                <td>Обед</td>
                                <td></td>
                                <td>-250р</td>
                            </tr>
                            <tr>
                                <td>27 ноября 2016</td>
                                <td>Авто</td>
                                <td>помыл машину</td>
                                <td>-1000р</td>
                            </tr>
                            <tr>
                                <td>27 ноября 2016</td>
                                <td>Зарплата</td>
                                <td></td>
                                <td>+20 000р</td>
                            </tr>
                            <tr>
                                <td>28 ноября 2016</td>
                                <td>Обед</td>
                                <td></td>
                                <td>-250р</td>
                            </tr>
                            <tr>
                                <td>29 ноября 2016</td>
                                <td>Авто</td>
                                <td>помыл машину</td>
                                <td>-1000р</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

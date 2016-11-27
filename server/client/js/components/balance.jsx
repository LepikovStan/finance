const ReactHighcharts = require('react-highcharts');
const Highcharts = require('highcharts');
const minTickInterval = 7 * 24 * 3600 * 1000;

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getBalance() {
        $.get('/balance/')
            .then(({status, result: balance}) => {
                this.setState({
                    balance
                });
            });
    }

    componentWillMount() {
        this.getBalance();
    }

    render() {
        if (!this.state.balance) {
            return <div></div>
        }

        let series = this.state.balance;

        let config = {
            colors: ['#666666'],
            chart: {
                height: 275
            },
            credits: false,
            title: null,
            xAxis: {
                title: null,
                categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                labels: {
                    formatter() {
                        return Highcharts.dateFormat("%e %b %y", this.value);
                    }
                },
                minTickInterval: minTickInterval
            },
            yAxis: {
                title: null
            },
            legend: false,
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                        enabled: true
                    }
                }
            },
            series: [
                { data: series }
            ]
        };

        return (
            <section className="graph balance">
                <h2>Баланс</h2>
                <ReactHighcharts config={config} />
            </section>
        );
    }
}

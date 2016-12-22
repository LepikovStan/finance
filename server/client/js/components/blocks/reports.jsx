const ReactHighcharts = require('react-highcharts');
const Highcharts = require('highcharts');
const NoItems = require('components/elements/noItems')
const minTickInterval = 7 * 24 * 3600 * 1000;

module.exports = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getData() {
        $.get('/reports/categories')
            .then(({status, result: data}) => {
                console.log(status, data);
                if (status === 'ok'){
                    this.setState(data);
                }
            });
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        let config,
            content;

        if (true) {
            config = {
                colors: ['#666666'],
                chart: {
                    type: 'bar',
                    height: 275
                },
                title: false,
                subtitle: false,
                xAxis: {
                    categories: this.state.categories,
                    title: {
                        text: null
                    }
                },
                yAxis: {},
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    data: this.state.series
                }]
            };
            content = <ReactHighcharts config={config} />
        } else {
            content = <NoItems text="Добавьте платёж, чтобы увидеть баланс" />
        }

        return (
            <section className="graph">
                {content}
            </section>
        );
    }
}

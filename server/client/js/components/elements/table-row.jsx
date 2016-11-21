module.exports = class extends React.Component {
    prepareDate(uts) {
        let date = new Date(uts);
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    }

    render() {
        return (
            <tr key={this.props.index}>
                <td>{this.prepareDate(this.props.time)}</td>
                <td>{this.props.category}</td>
                <td>{this.props.summ}</td>
            </tr>
        );
    }
}

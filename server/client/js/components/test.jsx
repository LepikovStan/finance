class Page extends React.Component {
    render() {
        let a = [1,2,3];
        let list = a.map((lit) => {
            return <li>{lit}</li>
        })
        console.log(list)
        list =  [<li>1</li>]

        return (
            <div className="wrapper">
                <ul>{list}</ul>
            </div>
        );
    }
}

ReactDOM.render(<Page />, document.getElementById('root'));

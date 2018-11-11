class App extends React.Component {
  constructor(){
    super()
    this.getToDo = this.getToDo.bind( this );
    this.submit = this.submit.bind( this );
    this.removeToDo = this.removeToDo.bind( this );
    this.doneReset = this.doneReset.bind( this );

    this.state = {
    todo : "",
    list : [],
    done : [],
    warning:"",
    }
  }

  getToDo(event){
    //console.log("getToDo", event.target.value);
    if(this.state.todo.length < 15){
        this.setState({todo:event.target.value});
    }
    if (this.state.todo.length == 15){
        this.setState({warning:"warning"})
    } else {this.setState({warning:" "})};
    //this.setState({todo:event.target.value});
    //this.state.list.push({todo: event.target.value})
    // console.log("listtodo", this.state.list);
  }

  submit(event){
    event.preventDefault();
    // const {list, todo} = this.state;
    this.state.list.push(this.state.todo);
    this.setState({todo:""});
    //this.setState({list: [this.state.todo,...this.state.list], todo:""});
    console.log("list",this.state.list)
  }

  removeToDo(todo, index){
    console.log("index",index)
    console.log("event",todo)

    this.state.done.push(todo);

    this.setState({done:this.state.done});

    console.log("done",this.state.done);

    var list = this.state.list;
    for(var i = 0; i< list.length; i++){
        console.log("i",i)
        if( index == i){
            list.splice(i, 1);
            console.log()
            this.setState({list:list})
        }
    }
    //let list = this.state.list
    // console.log("thisstatelist", list)
    // this.setState({list: this.state.list.filter(list => )})
    // for(var i = 0; i< list.length; i++){
    //     console.log("list[i]",list[i])
    //     if (list.indexOf(list[i]) > -1){
    //         list.splice(list[i], 1);
    //         console.log("delete result",list);
    //         this.setState( {list:list})
    //         console.log("resultlist",list)
    //         //update the status of the list
    //     };

    // }
  }

  doneReset(event){
    this.setState({done: []});
  }

  render() {
      // render the list with a map() here
    console.log("rendering");
      return (
        <div className="wrapper">
            <div id="container">
            <div className="main">
                <h2>To do list</h2>
                    <form className={this.state.warning} onSubmit={this.submit}>
                    <input value={this.state.todo} onChange={this.getToDo}/><br/>
                    <button>Submit</button>
                    </form>
            </div>
            <div className="mylist">
                <List mylist={this.state.list} deletetodo={this.removeToDo}/>
            </div>
            <div>
                <Done donelist={this.state.done} clearlist={this.doneReset}/>
            </div>
            </div>
        </div>
      );
  }
}

class List extends React.Component {

    render(){

            const list = this.props.mylist.map((todo,index)=>{
                console.log("todolist",{todo})
                return <li key={index}>{todo}<button className="btndelete" onClick={()=>this.props.deletetodo(todo,index)}>Delete</button></li>
            });

        return(

            <div>
                <h2>Things to do</h2>
                <ul className="">
                    {list}
                </ul>
            </div>
            );

    }

 }

class Done extends React.Component{
    render(){
        const done = this.props.donelist.map((done, index)=>{
            console.log("render done",{done})
            return <li key={index}>{done}</li>
        });

        return(
            <div className="mylist">
            <h2>Completed </h2>
            <button onClick={this.props.clearlist}>clear</button>
                <ul className="">
                    {done}
                </ul>

            </div>
            )
    }
}

ReactDOM.render(
    <div>

        <App/>

    </div>,
    document.getElementById('root')
);

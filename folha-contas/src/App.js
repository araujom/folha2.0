
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    //presentMode:
    //              0 - Dashboard  
    //              1 - Movimentos  
    //              2 - Categorias  
    this.state = {
      presentMode: 2
    };
    
    this.setStateToShowDashboard = this.setStateToShowDashboard.bind(this);
    this.setStateToShowMovimentos = this.setStateToShowMovimentos.bind(this);
    this.setStateToShowCategorias = this.setStateToShowCategorias.bind(this);
  }

  setStateToShowDashboard(){
    this.setState(  {
      presentMode: 0
    });    
  }
  setStateToShowMovimentos(){
    this.setState( {
      presentMode: 1
    });
    
  }
  setStateToShowCategorias(){
    this.setState( {
      presentMode: 2
    });
    
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">          
          <h2>Folha de contas!</h2>
          <h3>
          <button onClick={this.setStateToShowDashboard.bind(this)}>Dashboard</button>
          <button onClick={this.setStateToShowMovimentos.bind(this)}>Movimentos</button>  
          <button onClick={this.setStateToShowCategorias.bind(this)}>Categorias</button>                      
          </h3>
        </div>        
        <MainContainer presentMode={this.state.presentMode}/>        
      </div>
    );
  }
}

export default App;

class MainContainer extends Component {
  render(){
    if(this.props.presentMode == 0){
      return (<Dashboard/>);
    }else if(this.props.presentMode == 1){
      return (<Movimentos/>);
    }else{
      return (<Categorias/>);
    }
  }
}

class Dashboard extends Component {
  render(){
    return(
      <div>
        <img src="https://www.mathsisfun.com/data/images/pie-chart-movies.svg"></img>
      </div>
    );
  }
}

class Movimentos extends Component {
  constructor(props) {
    super(props);
    //$.get('http://pi2docker.local:3000/records', function (result) {      
      //this.setState({records: result});      
      //this.state = {records: [{a:1},{a:1}]};
   //   this.state = {records: [{a:1},{a:1}]};
    //});
    this.state = {records: [{a:1},{a:1}]};
    
  }
  componentDidMount() {
        fetch(`http://pi2docker.local:3000/records`) 
            .then(result=> {
                this.setState({records:result.json()});
            });
    }

  render(){
    return(
      <div>
        <h1>Movimentos</h1>
        <table>
          <tbody>
          {this.state.records.map((mov) =>
          <Movimento record={mov}/>
          )
          }
          <Movimento record={this.state.records}/>
          
          <Movimento />
          </tbody>
        </table>
      </div>
    );
  }
}

class Movimento extends Component {
  render(){
    return(              
          <tr><td>val1</td><td>val2</td><td>val3</td></tr>                      
    );
  }
}


class Categorias extends Component {
  render(){
    return(
      <div>
        <h1>Categorias</h1>
        <table>
          <tbody>
            <tr><td>val1</td><td>val2</td><td>val3</td></tr>
            <tr><td>val1</td><td>val2</td><td>val3</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}


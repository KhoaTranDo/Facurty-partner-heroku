
import './App.css';
import Homepage from './components/homepage/homepage'
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props)

  }
  render(){
    return (
       <>
       {this.props.children}
       </>
    )
  }
}

export default App;

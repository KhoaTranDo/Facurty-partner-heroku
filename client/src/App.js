
import './App.css';
import { Component } from 'react';
import Header from "./components/layout/navbar"
import Footer from "./components/layout/footer"

class App extends Component {
  render(){
    return (
      <>
      <Header/>
      <div style={{marginTop:"76px"}}>
      {this.props.children}
      </div>
      <Footer/>
      </>
      );
  }
}

export default App;

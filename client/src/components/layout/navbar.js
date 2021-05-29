import { Component } from "react";
import {Link} from 'react-router-dom'
export default class Header extends Component {
  render() {
    return (
      <>
        <header>
          <nav className="navbar fixed-top bgnv " >
            <Link className="navbar-brand " to="/">
              <img src="/assets/img/flogo.png"  alt="loginweb" />
            </Link>
          </nav>
        </header>
      </>
    );
  }
}

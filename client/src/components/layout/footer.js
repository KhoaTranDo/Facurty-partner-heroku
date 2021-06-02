import { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className="site-footer">
          <div className="container ">
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <h4>ABOUT</h4>
                <p className="text-center">
                  Farcurty Partner help the teacher to create a quiz exam test
                  quickly
                </p>
              </div>
              <div className="col-xs-6 col-md-12">
                <h4>Member</h4>
                <ul className="footer-links">
                  <li>Nguyen Cao Nguyen</li>
                  <li>Tran Do Anh Khoa</li>
                  <li>Nguyen Quang Huy</li>
                  <li>Pham Phu Hoang</li>
                  <li>Le Hong Duoc</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container-flush footermini">
            <div className="row">
              <div className="col-12">
                <p className="copyright-text text-center">Group C2SE.16</p>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

import { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className="site-footer">
          <div className="container ">
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <h4>Mô tả</h4>
                <p className="text-center">
                  Farcurty Partner help the teacher to create a quiz exam test
                  quickly
                </p>
              </div>
              <div className="col-xs-6 col-md-12">
                <h4>Thành Viền</h4>
                <ul className="footer-links">
                  <li>Nguyễn Cao Nguyên</li>
                  <li>Trần Đỗ Anh Khoa</li>
                  <li>Nguyễn Quang Huy</li>
                  <li>Phạm Phú Hoàng</li>
                  <li>Lê Hồng Được</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container-flush footermini">
            <div className="row">
              <div className="col-12">
                <p className="copyright-text text-center">Group project C2SE.16.</p>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

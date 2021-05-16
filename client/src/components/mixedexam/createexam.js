import { Component } from "react";
import { Link } from "react-router-dom";

class Createexam extends Component {
  render() {
    return (
      <>
        <div className="d-flex flex-column flex-xl-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h5
              className="my-0 mr-md-auto font-weight-normal"
              style={{ color: "#329DEE", fontSize: 30 }}
            >
              Logo's C2se.16
            </h5>
          </Link>
        </div>

        <div className="content">
          <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1
              className="display-4"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              <b>TẠO ĐỀ</b>
            </h1>
            <p className="lead">
              Quickly build an effective pricing table for your potential
              customers with this Bootstrap example. It's built with default
              Bootstrap components and utilities with little customization.
            </p>
          </div>

          <div className="container">
            <div className="card-deck mb-3 text-center">
              <div className="card mx-4 mb-4 box-shadow">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal"> Tải tệp lên</h4>
                </div>
                <div className="card-body">
                  <Link to="/import" style={{ textDecoration: "none" }}>
                    <div className="wrapper">
                      <div className="file-upload">
                        {/* <a href="https://google.com">
                          <i className="fa fa-arrow-up"></i>
                        </a> */}{" "}
                        <i className="fa fa-arrow-up"></i>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="card mx-4 mb-4 box-shadow">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Tạo từ thư viện</h4>
                </div>
                <div className="card-body">
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-primary"
                  >
                    Đi thôi!!!!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Createexam;

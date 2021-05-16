import React, { Component } from "react";
import { Link } from "react-router-dom";
class homepage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div>
          {/* menu */}
          <nav
            style={{ backgroundColor: "#319AEB" }}
            className="navbar navbar-light justify-content-between fixed-top"
          >
            <a>
              <img
                src="./assets/img/logo1.png"
                width={150}           
                className="d-inline-block align-top"
                alt
              />
            </a>
          </nav>
          {/* end-menu */}
          {/* ===================================== */}
          {/* Phan 1*/}
          <section id="hero" className="d-flex align-items-center">
            <div className="container float-left">
              <h1>Welcome to our website </h1>
              <h2>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </h2>
            </div>
          </section>
          {/* end_Phan_1 */}
          {/* ======= FUNCTIONS Section ======= */}
          <section id="funct" class="funct">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 inline-block ">
                <div className="icon-boxes justify-content-center">
                  <div className="row">
                      <div className="col-xl-4 ">
                    <Link to="/create" style={{ textDecoration: 'none'}}>
                        <div className="icon-box mt-4 mt-xl-0 icon">
                          <i className="far fa-file-alt" />
                          <h4>Tạo đề</h4>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.{" "}
                          </p>
                        </div>
                    </Link>
                      </div>
                    <div className="col-xl-2  "></div>
                      <div className="col-xl-4  ">
                    <Link to="/create" style={{ textDecoration: 'none'}}>
                        <div className="icon-box mt-4 mt-xl-0 icon">
                          <i className="fas fa-check-circle" />
                          <h4>Chấm điểm</h4>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                        </div>
                    </Link>
                      </div>
                  </div>
                </div>
                {/* End .content*/}
              </div>
            </div>
          </div>
</section>
          {/* End FUNCTIONS Section */}
          {/* Introductions */}
          <div className="container phan1 border-top">
            <div className="row">
              <div className="col-sm-6 ">
                <img src="./assets/img/phan1.png" className="img hinh" alt />
              </div>
              <div className="col-sm nd">
                <div className="section-title">
                  <h2>Tạo đề</h2>
                </div>
                <p className="d-flex justify-content-center">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
          <div className="container phan2 mt-5 border-top">
            <div className="row">
              <div className="col-sm-6 nd">
                <div className="section-title mt-3">
                  <h2>Chấm điểm</h2>
                </div>
                <p className="d-flex justify-content-center">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="col-sm-6 ">
                <iframe
                  className="hinh"
                  width={550}
                  height={315}
                  src="https://www.youtube.com/embed/9P_sQw9BBuE?start=15"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div className="container phan1 mt-2" style={{ height: 50 }}>
            <div className="row">
              <div className="col-sm-4" />
              <div className="col-sm-4 mt-3 d-flex justify-content-center ">
                <small>
                  © Copyright <b>c2se.16</b>
                </small>
              </div>
              <div className="col-sm-4" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default homepage;

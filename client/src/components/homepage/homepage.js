import React, { Component } from "react";
import { Link } from "react-router-dom";

class homepage extends Component {
  render() {
    return (
      <>
        <section id="hero" className="d-flex align-items-center">
          <div
            className="container position-relative"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-9 text-center">
                <h1>Welcome to Faculty Partner</h1>
                <h2>The application saves you time and effort for creating tests and grading</h2>
              </div>
            </div>
            <div className="row icon-boxes">
              <div
                className="col-md-5 col-lg-4 d-flex align-items-stretch m-md-auto mb-3 pb-sm-3 "
                data-aos="zoom-in"
                data-aos-delay={200}
              >
                <div className="icon-box">
                  <Link to="/create" style={{ textDecoration: "none" }}>
                    <div className="icon">
                      <i className="far fa-file-alt" />
                    </div>
                    <h4 className="title">Create Exams</h4>
                  </Link>
                </div>
              </div>
              <div
                className="col-md-5 col-lg-4 d-flex align-items-stretch m-md-auto mb-3 pb-sm-3 "
                data-aos="zoom-in"
                data-aos-delay={300}
              >
                <div className="icon-box">
                  <Link to="/Maingrading" style={{ textDecoration: "none" }}>
                    <div className="icon">
                      <i className="fas fa-check-circle" />
                    </div>
                    <h4 className="title">Grading</h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end-funct */}
        <main>
          {/* ======= About Section ======= */}
          <div className="container-fluid bgb  p-xl-5">
            <div className="row">
              <div className="col-md-2 " />
              <div className="col-md-4 ">
                <img
                  src="./assets/img/taoDe.png"
                  width="75%"
                  data-aos="zoom-in-down"
                  alt="icon tao de"
                />
              </div>
              <div className="col-md-4 " data-aos="fade-left">
                <div className="section-title">
                  <h2>Create exams</h2>
                </div>
                <p className="d-flex justify-content-center">Are you tired of wasting time creating lots of test code to ensure the quality of your tests?</p>
                <p className="d-flex justify-content-center">
                Do not worried!!!!
                Your problem has been solved by Create the Exam quickly and conveniently
                Saves you time and effort.
                </p>
                <p />
              </div>
            </div>
          </div>
          <div className="container-fluid p-xl-5 ">
            <div className="row">
              <div className="col-md-2 " />
              <div className="col-md-4 " data-aos="fade-right">
                <div className="section-title">
                  <h2>Grading</h2>
                </div>
                <p className="d-flex justify-content-center">
                You spend too much time grading the test.
                So, let me solve your problem:
                </p>
              </div>
              <div className="col-md-4 ">
                <img
                  className="img hinh"
                  src="./assets/img/chamDiem1.png"
                  data-aos="fade-down-left"
                  width="75%"
                  alt="icon cham diem"
                />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default homepage;

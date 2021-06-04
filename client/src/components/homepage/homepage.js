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
                <h1>SAVING MORE TIME WITH JUST A FEW ACTIONS</h1>
                <h2> We are C2SE.16</h2>
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
                <p className="d-flex justify-content-center"></p>
                <p className="d-flex justify-content-center">
                  Giúp giảng viên có thể tạo ra các bài kiểm tra trắc nghiệm dựa
                  trên ngân hàng câu hỏi dưới dạng file word
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
                  Giúp giảng viên có thể chấm điểm các bài kiểm tra đã tạo trên
                  website Farcurty Partne thông qua hình ảnh
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

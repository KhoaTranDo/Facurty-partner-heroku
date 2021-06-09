import { Component } from "react";
import Captune from "./CaptureQR";
import axios from "axios";
class Maingrading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idexam: "",
      password: "",
      errorNotice: "",
      redirect: false,
      slug: "",
    };
  }
  setIdexam = (idexam) => {
    this.setState({
      idexam: idexam,
    });
  };
  HandlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  Summitdata = (e) => {
    const { redirect, idexam, password } = this.state;
    let slug = "";
    let check = false;
    if (idexam) {
      this.setState({
        errorNotice: "",
      });
      if (password) {
        this.setState({
          errorNotice: "",
          slug: "loading",
          //  redirect:true
        });
        // Lay du lieu
        let data = {
          idexam: this.state.idexam,
          password: this.state.password,
        };

        axios
          .post(`http://localhost:5000/exam/grading`, data)
          .then(async (result) => {
            if (result.data.error) {
              console.log(result.data.error);
              this.setState({
                errorNotice: result.data.error,
                slug: "",
              });
            } else {
              slug = result.data.data.slug;
              check = true;
              await this.setState({
                errorNotice: "",
                slug: result.data.data.slug,
                redirect: true,
              });
              if (check === true) {
                console.log(this.state.slug);
                //  this.props.history.push(`/grading/${slug}`);
                this.props.history.push({
                  pathname: `/grading/${slug}`,
                  state: { data: result.data.data },
                });
              }
            }
          });
        // if (password === "aa") {
        //   // Neu có xuat data
        //   //Khong thi bao loi
        // } else {
        //   this.setState({
        //     errorNotice: "No have any this exam",
        //     slug: "",
        //     password:""
        //   });
        // }
      } else {
        check = false;
        this.setState({
          errorNotice: "Please input password",
        });
      }
    } else {
      this.setState({
        errorNotice: "Please scan Qr code",
      });
      check = false;
    }
  };
  loadding = () => {
    if (this.state.slug === "loading") {
      return <div className="loading">Loading&#8230;</div>;
    }
  };
  render() {
    return (
      <>
        {this.loadding()}
        <section className="d-flex align-items-center">
          <div className="m-auto">
            <div className="row mb-5 pt-5">
              <div className="col-lg-8 mx-auto">
                <div className="p-5 rounded shadow">
                  <div className="row pb-3">
                    <h3 className="text-center m-auto" style={{ fontSize: 30 }}>
                      <b>GRADING</b>
                    </h3>
                  </div>
                  <hr className="border-bottom" />
                  <Captune data={this.setIdexam} />
                  <div className="row ">
                    <div className="col-6  pb-3 ">
                      <label>ID exams</label>
                      <input
                        type="text"
                        name="fId"
                        className="form-control"
                        value={this.state.idexam}
                        readOnly
                      />
                    </div>
                    {/* form-group end.// */}
                    <div className="col-6">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder=" "
                        onChange={this.HandlerChange}
                      />
                    </div>
                    {/* form-group end.// */}
                    <div className="col-12 m-auto">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={this.Summitdata}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                  <div className="row m-auto" width="100%">
                    <div className="m-auto">
                      <p style={{ color: "red" }}>{this.state.errorNotice}</p>
                    </div>
                  </div>
                  {/* form-group// */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Maingrading;

import { Component } from "react";
import { Redirect } from "react-router";
import ListImage from "./ListImagecapture";
import Webcame from "./Webcam";
import { Link } from "react-router-dom";
import axios from "axios";
class Grading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      slug: "",
      nameStudent: "",
      data: "",
      loading: "load",
      error: {},
      idexam: "",
      scope: "",
      totalqs: "",
      filename: "",
    };
  }
  componentWillMount = async () => {
    if (this.props.location.state) {
      await axios
      .get(
        `/exam/${this.props.location.state.data['slug']}`
      )
      .then( (res) => {
       this.setState({
        data: res.data,
      });
      })
      .catch((err) => console.log(err));
    }
    ///getdata/:slug
  };
  // componentDidMount = async () => {
  //   if (this.props.location.state) {
  //     await this.setState({
  //       data: this.props.location.state.data,
  //     });
  //   }
  // };
  getnewdata = (dataraw) => {
    this.setState({
      data: dataraw,

    });
  };
  HandleChanger = (e) => {
    this.setState({
      nameStudent: e.target.value,
    });
  };
  onFileChange = async (e) => {
    const typeimage = ["jpg", "PNG", "png", "jpeg", "JPG"];
    const file = e.target.files;
    let check = true;
    if (file.length === 1) {
      if (file[0].size < 1024 * 1024) {
        const check1 = file[0].type.split("/");
        if (typeimage.includes(check1[1])) {
          let { file } = this.state;

          file = e.target.files[0];

          this.getBase64(file)
            .then((result) => {
              file["base64"] = result;
              this.setState({
                file: result,
                file,
                filename: file["name"],
              });
            })
            .catch((err) => {
              console.log(err);
            });

          this.setState({
            file: e.target.files[0],
            error: {},
          });
        } else {
          check = false;
          let geterror = this.state.error;
          geterror["image"] = "File is not a image";
          this.setState({
            error: geterror,
          });
        }
      } else {
        check = false;
        let geterror = this.state.error;
        geterror["image"] = "Image up to 5mb";
        this.setState({
          error: geterror,
        });
      }
    }
  };
  getImage=(data)=>{
    let file={"base64":data,name:'CapImage.JPG'}
    this.setState({
      file:file,
      filename:'CapImage.JPG'
    })
  }
  getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  Summitdata = async (e) => {
    if (this.state.file || this.state.filename) {
      if (this.state.data["slug"]) {
        let geterror = this.state.error;
        geterror["image"] = "";
        geterror["information"] = "";
        if (this.state.idexam) {
          this.setState({
            loading: "loadding",
            error: geterror,
          });
          let sendData = {
            nameStudent: this.state.nameStudent,
            file: this.state.file,
            idexam: this.state.idexam,
            slug: this.state.data["slug"],
          };
          let getdata = await axios.post(
            `/exam/grading/exam`,
            sendData
          );
          if (getdata) {
            console.log(getdata.data);
            await this.setState({
              image: getdata.data["image"],
              scope: getdata.data["correctquestion"],
              totalqs: getdata.data["totalqs"],
              loading: "finish",
            });
          } else {
            console.log("error");
          }
        } else {
          let geterror = this.state.error;
          geterror["information"] = "please select code exams";
          this.setState({
            error: geterror,
          });
        }
      } else {
        let geterror = this.state.error;
        geterror["information"] = "Scan QR Error";
        this.setState({
          error: geterror,
        });
      }
    } else {
      let geterror = this.state.error;
        geterror["information"] = "Please import image exam";
        this.setState({
          error: geterror,
        });
    }
  };
  // Lưu ảnh lại
  SaveData = async () => {
    let sendData = {
      nameStudent: this.state.nameStudent,
      image: this.state.image,
      idexam: this.state.idexam,
      slug: this.state.data["slug"],
      scope: this.state.scope,
    };
    if (sendData) {
      let getdata = await axios.post(
        `/exam/grading/exam/save`,
        sendData
      );
      if (getdata) {
        this.getnewdata(getdata.data);
      } else {
        console.log("error");
      }
    }

    this.setState({
      nameStudent:"",
      image: "",
      scope: "",
      loading:'load'
    })
  };
  closeload = () => {
    let datade = { err: "error" };
    this.props.dataexam(datade);
  };
  loadding = () => {
    if (this.state.loading === "loadding") {
      return <div className="loading" onDoubleClick={this.closeload}>Loading&#8230;</div>;
    }
  };
  Showimage = () => {
    // let check = "";

    if (this.state.loading !== "loadding" && this.state.loading !== "load") {
      return (
        <>
          <button
            data-toggle="modal"
            data-target="#exampleModalCenter"
            className="btn btn-secondary btn-block"
          >
            Show result
          </button>
          <div
            className="modal fade show"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">
                    Result
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h3>Name: {this.state.nameStudent}</h3>
                  <p>
                    Correct Answer {this.state.scope}/{this.state.totalqs}
                  </p>
                  <img src={this.state.image} />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={this.SaveData}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return this.loadding();
    }
  };

  renderExamcode = (idexam) => {
    if (idexam) {
      let id = idexam;
      return id.map((index) => {
        return (
          <option key={index} value={index["idexam"]}>
            {index["idexam"]}
          </option>
        );
      });
    }
  };
  getidexam = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.props.location.state) {
      let titles = this.state.data.titles;
      return (
        <div>
          <h3 className="text-center pt-5 mb-5" style={{ fontSize: 50 }}>
            <b>Grading</b>
          </h3>
          {/* input information  */}
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-8 mx-auto">
                <div className="bg-white p-sm-0 p-sm-3 p-md-5 rounded shadow">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-xl-10">
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <label>
                              <b>Title:</b>
                            </label>
                            <h5>{titles}</h5>
                          </div>
                          <div className="col-md-6 p-sm-3  col-sm-12">
                            <Link
                              to={{
                                pathname: `/areaexam/${this.state.data["slug"]}`,
                                state: {
                                  dataraw: this.state.data,
                                },
                              }}
                            >
                              <button
                                type="button"
                                className="btn btn-primary float-xl-right"
                              >
                                Download exams
                              </button>
                            </Link>
                          </div>
                          {/* form-group end.// */}
                          <div className="col-md-12">
                            <label className="mr-2">
                              <b>Id exam</b>
                            </label>
                            <select
                              defaultValue=""
                              name="idexam"
                              id="idexam"
                              onClick={this.getidexam}
                            >
                              <option disabled value="">
                                Choose exam
                              </option>
                              {this.renderExamcode(this.state.data.exammixed)}
                            </select>
                          </div>{" "}
                          {/* form-group end.// */}
                        </div>{" "}
                        <div className="row">
                          <div className="col-12 form-group">
                            <label>
                              <b>Name student</b>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              maxLength="50"
                              name="nameStudent"
                              onChange={this.HandleChanger}
                              value={this.state.nameStudent}
                            />
                          </div>{" "}
                          <div className="custom-file col-11 m-auto form-group">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                              onChange={this.onFileChange}
                            />
                            <label
                              className="custom-file-label"
                              for="customFile"
                              placeholder="Choose file"
                            >
                              {this.state.filename}
                            </label>
                          </div>
                          <div className="row m-auto" width="100%">
                            <p style={{ color: "red" }}>
                              {this.state.error["image"]}
                            </p>
                          </div>
                        </div>
                        {/* form-row end.// */}
                        {/* form-group end.// */}
                        <hr className="border-bottom" />
                        <div className="form-row">
                          <div className="col form-group">
                            <Webcame image={this.getImage} />
                          </div>{" "}
                          {/* form-group end.// */}
                          {/* form-group end.// */}
                        </div>
                        <div className="form-row">
                          <div className="col-5 p-3 m-auto">
                            {this.Showimage()}
                          </div>
                        </div>
                        {/* form-group// */}
                        <div className="col-12 m-auto">
                          <p style={{ color: "red", textAlign:'center' }}>
                            {this.state.error["information"]}
                          </p>
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            onClick={this.Summitdata}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end ìnormation */}
          <ListImage data={this.state.data} setdata={this.getnewdata} />

          {/* view */}
        </div>
      );
    } else {
      return <Redirect to="/Maingrading" />;
    }
  }
}
export default Grading;

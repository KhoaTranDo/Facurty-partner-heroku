import { Component } from "react";
import axios from "axios";

class Informationexam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Thông tin cơ bản
      selectedFile: null,
      fileName: "Choose File",
      title: "",
      time: "",
      idExam: "", //Thuc hiện random va phải tránh trùng lặp với id các bài khác
      password: "",
      // Thông tin trộn đề
      quanlityExam: 0,
      quanlityQs: 0,
      mixquestion: false,
      mixanswer: false,
      error: {},
      data: {},
      Maxqslength: 50,
    };
  }
  changeDataprops = (data) => {
    this.setState({
      data: data,
    });
  };
  //___________________________________________________
  //Import file docx function
  // On file select (from the pop up)
  onFileChange = async (event) => {
    // Update the state
    if (
      event.target.files[0].type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      await this.setState({
        selectedFile: event.target.files[0],
        fileName: event.target.files[0].name,
        error: {},
      });
    } else {
      let subError = {};
      subError["fomat"] = "This file is not word document";
      this.setState({ error: subError });
    }
  };
  RenderError = () => {
    let renderError = this.state.error;
    if (Object.keys(renderError).length > 0) {
      return <p style={{ color: "red" }}>{renderError["fomat"]}</p>;
    }
  };
  RenderError2 = () => {
    let renderError = this.state.error;
    if (Object.keys(renderError).length > 0) {
      return <p style={{ color: "red" }}>{renderError["information"]}</p>;
    }
  };
  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Request made to the backend api
    // Send formData object
    //   axios.post("api/uploadfile", formData);
  };
  renderRawdata = async (event) => {
    event.preventDefault();

    if (this.state.selectedFile !== null) {
      let { selectedFile } = this.state;

      //Xoá thông báo lỗi
      let subError = {};
      subError["fomat"] = "";
      this.setState({ error: subError });
      //Tạo formdata truyền dữ liệu
      const formData = new FormData();
      //Update the formData object
      formData.append("avatar", selectedFile);

      let datade = { load: "load" };
      this.props.dataexam(datade);
      const data = await axios.post(
        `http://localhost:5000/exam/import`,
        formData
      );
      if (data) {
        if (
          this.state.quanlityQs > 0 &&
          this.state.quanlityQs > data.data["rawquestions"].length
        ) {
          if (this.state.Maxqslength > data.data["rawquestions"].length) {
            this.setState({
              data: data.data,
              quanlityQs: 0,
              quanlityExam: 0,
              Maxqslength: data.data["rawquestions"].length,
            });
            this.props.dataexam(data.data);
          } else {
            this.setState({ data: data.data, quanlityQs: 0, quanlityExam: 0 });
            this.props.dataexam(data.data);
          }
        } else {
          if (this.state.Maxqslength > data.data["rawquestions"].length) {
            this.setState({
              data: data.data,
              Maxqslength: data.data["rawquestions"].length,
            });
            this.props.dataexam(data.data);
          } else {
            this.setState({ data: data.data });
            this.props.dataexam(data.data);
          }
        }
      } else {
        this.props.dataexam("error");
      }
    } else {
      let subError = {};
      subError["fomat"] = "Please import file docx";
      this.setState({ error: subError });
    }

    // this.setState({slug:dataaaaa["slug"]})
    // this.props.dataexam(dataaaaa);
  };
  // _____________________________________________
  SubmitData = async (e) => {
    e.preventDefault();
    // Kiểm tra điều kiện

    let validationSubmit = false;
    // Kiểm tra điều kiện thông tin nhập vào

    // Kiem tra file
    if (this.state.selectedFile) {
      // Kiem tra tieu de
      if (this.state.title) {
        let errorss = this.state.error;
        errorss["information"] = "";
        this.setState({ error: errorss });
        // Kiem tra thoi gian
        if (this.state.time) {
          let errorss = this.state.error;
          errorss["information"] = "";
          this.setState({ error: errorss });
          // Kiem tra id bài kiêm tra //random
          if (this.state.password) {
            let errorss = this.state.error;
            errorss["information"] = "";
            this.setState({ error: errorss });
            // Điều kiện trộn đề
            if (this.state.quanlityExam === 0) {
              // Bao Loi
              validationSubmit = false;
              let errorss = this.state.error;
              errorss["information"] = "quanlity exam is empty";
              this.setState({ error: errorss });
            } else {
              let errorss = this.state.error;
              errorss["information"] = "";
              this.setState({ error: errorss });
              if (this.state.quanlityQs === 0) {
                // Bao Loi
                validationSubmit = false;
                let errorss = this.state.error;
              errorss["information"] = "quanlity question is empty";
              this.setState({ error: errorss });
              } else {
                let errorss = this.state.error;
                errorss["information"] = "";
                this.setState({ error: errorss });
                if (this.mixquestion === false && this.mixanswer === false) {
                  // Bao Loi
                  let errorss = this.state.error;
                  errorss["information"] = "choose option for random";
                  this.setState({ error: errorss });
                  validationSubmit = false;
                } else {
                  validationSubmit=true
                }
              }
            }
          } else {
            validationSubmit = false;
            let errorss = this.state.error;
            errorss["information"] = "Please type passwords";
            this.setState({ error: errorss });
          }
        } else {
          validationSubmit = false;
          let errorss = this.state.error;
          errorss["information"] = "Please type description exam";
          this.setState({ error: errorss });
        }
      } else {
        validationSubmit = false;
        let errorss = this.state.error;
        errorss["information"] = "Please type titles exam";
        this.setState({ error: errorss });
      }
      if (validationSubmit) {
        let subError = {};
        subError["fomat"] = "";
        subError["information"] = "";
        this.setState({ error: subError });
        let check = this.state.data;
        if (Object.keys(check).length > 0) {
          let dataSend = {
            data: this.state.data,
            quanlityExam: this.state.quanlityExam,
            quanlityQs: this.state.quanlityQs,
            title: this.state.title,
            timedoexam: this.state.time,
            mixquestion: this.state.mixquestion,
            mixanswer: this.state.mixanswer,
            password: this.state.password,
          };
          let getdata = await axios.post(
            `http://localhost:5000/exam/import/mixquestion`,
            dataSend
          );
          if (getdata) {
            // Lấy dữ liệu đề đã trộn lên font-end
            this.setState({ data: getdata.data.data });
            this.props.dataexam(getdata.data.data);
          } else {
            this.props.dataexam("error");
          }
        } else {
          let subError = {};
          subError["fomat"] = "please click upload file";
          this.setState({ error: subError });
        }
      }
    } else {
      validationSubmit = false;
      let subError = {};
      subError["fomat"] = "Please import file docx";
      this.setState({
        error: subError,
      });
    }
  };

  HandleQuanlityEx = (e) => {
    e.preventDefault();
    let a = this.state.quanlityExam;
    if (e.target.name === "up") {
      if (a < 5) {
        this.setState({
          quanlityExam: a + 1,
        });
      }
    } else {
      if (a > 0) {
        this.setState({
          quanlityExam: a - 1,
        });
      }
    }
  };
  HandleQuanlityQs = (e) => {
    e.preventDefault();
    let a = this.state.quanlityQs;
    if (e.target.name === "up") {
      if (a + 5 <= this.state.Maxqslength) {
        this.setState({
          quanlityQs: a + 5,
        });
      }
    } else {
      if (a > 0) {
        this.setState({
          quanlityQs: a - 5,
        });
      }
    }
  };
  HandleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  HandleOption = (e) => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12 mx-auto">
              <div className="bg-white p-5 rounded border">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-xl-10">
                      <form>
                        <div className="row">
                          <label
                            htmlFor="user_name"
                            className="col-md-12 col-form-label text-md-left"
                          >
                            Tải tệp lên
                          </label>

                          <div className="input-group col-sm-10 mb-3">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile03"
                                onChange={this.onFileChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="inputGroupFile03"
                              >
                                {this.state.fileName}
                              </label>
                            </div>
                          </div>
                          <div className="input-group col-sm-2 mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                              onClick={this.renderRawdata}
                            >
                              Tải đề lên
                            </button>
                          </div>
                          <div className="input-group col-sm-12">
                            {this.RenderError()}
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-sm-12 form-group">
                            <label>Tiêu đề </label>
                            <input
                              type="text"
                              className="form-control"
                              maxLength="50"
                              name="title"
                              onChange={this.HandleChange}
                            />
                            <p></p>
                          </div>{" "}
                          {/* form-group end.// */}
                          <div className="col form-group">
                            <label>Mô Tả thêm</label>
                            <input
                              type="text"
                              className="form-control"
                              maxLength="50"
                              name="time"
                              onChange={this.HandleChange}
                            />
                          </div>{" "}
                          {/* form-group end.// */}
                        </div>{" "}
                        {/* form-row end.// */}
                        {/* form-group end.// */}
                        <div className="form-row">
                          <div className="col form-group">
                            <label>ID đề gốc</label>
                            <input
                              type="text"
                              className="form-control"
                              readOnly
                              value={this.state.idExam}
                            />
                          </div>{" "}
                          {/* form-group end.// */}
                          <div className="col form-group">
                            <label>Mật khẩu</label>
                            <input
                              type="password"
                              className="form-control"
                              maxLength="10"
                              name="password"
                              onChange={this.HandleChange}
                            />
                          </div>{" "}
                          {/* form-group end.// */}
                        </div>
                        <hr className="border-bottom" />
                        {/* form-group// */}
                        <div className="form-row">
                          <div className="col-sm-3 form-group">
                            <label>Số lượng đề</label>
                            <br />
                            <>
                              <div className="number-input">
                                <button
                                  name="down"
                                  onClick={this.HandleQuanlityEx}
                                ></button>
                                <input
                                  className="quantity"
                                  min="0"
                                  name="quantity"
                                  type="number"
                                  value={this.state.quanlityExam}
                                ></input>
                                <button
                                  onClick={this.HandleQuanlityEx}
                                  className="plus"
                                  name="up"
                                ></button>
                              </div>
                            </>
                          </div>
                          <div className="col-sm-3 form-group">
                            <label>Số câu trăc nghiệm</label>
                            <br />
                            <>
                              <div className="number-input">
                                <button
                                  name="down"
                                  onClick={this.HandleQuanlityQs}
                                ></button>
                                <input
                                  className="quantity"
                                  min="0"
                                  name="quantity"
                                  type="number"
                                  value={this.state.quanlityQs}
                                ></input>
                                <button
                                  onClick={this.HandleQuanlityQs}
                                  className="plus"
                                  name="up"
                                ></button>
                              </div>
                            </>
                          </div>{" "}
                          {/* form-group end.// */}
                          <div className="form-group col-sm-4 m-auto ">
                            <div className="form-group form-check float-left">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1"
                                name="mixquestion"
                                defaultChecked={this.state.mixquestion}
                                onChange={this.HandleOption}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleCheck1"
                              >
                                Xáo trộn câu hỏi
                              </label>
                            </div>
                            <div className="form-group form-check float-left">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck2"
                                name="mixanswer"
                                defaultChecked={this.state.mixanswer}
                                onChange={this.HandleOption}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleCheck2"
                              >
                                Xáo trộn câu trả lời
                              </label>
                            </div>
                          </div>{" "}
                          {this.RenderError2()}
                          {/* form-group end.// */}
                        </div>
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            onClick={this.SubmitData}
                          >
                            Tạo
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Informationexam;

import { Component } from "react";
import Printare from "../ExamResult/printarea";
import { Link } from "react-router-dom";
import axios from "axios";
class Listexam extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    axios
    .get(`http://localhost:${process.env.REACT_APP_PORT}/exam/${this.props.rawquestion["slug"]}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
  }

  Rendermixexam = () => {
    console.log(this.props.rawquestion["slug"])
    let data = this.props.rawquestion["exammixed"];
    if (this.props.rawquestion["exammixed"])
      return Object.keys(data).map((value, index) => {
        return (
          <div key={index} className="card">
            <div className="card-header" id={"#heading" + index.toString()}>
              <h2 className="mb-0">
                <div
                  className="btn btn-link collapsed"
                  type="button"
                  style={{ textDecoration: "none" }}
                  data-toggle="collapse"
                  data-target={"#collapse" + index.toString()}
                  aria-expanded="false"
                  aria-controls={"#collapse" + index.toString()}
                >
                  <h3>Đề {data[value]["idexam"]}</h3>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-danger  ml-1 float-xl-right"
                >
                  Tạo lại
                </button>
                <Link
                  to={{
                    pathname: "/areaexam",
                    state: {
                      dataquestion: data[value],
                      dataraw:this.props.rawquestion,
                    },
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-success float-xl-right"
                  >
                    Tải xuống
                  </button>
                </Link>
              </h2>
            </div>
            <div
              id={"collapse" + index.toString()}
              className="collapse show"
              aria-labelledby={"#heading" + index.toString()}
              data-parent="#accordionExample"
            >
              <div className="card-body">
                <div className="container">
                  <div className="row mt-3">
                    {this.Renderquestion(
                      data[value]["questions"],
                      data[value]["idexam"]
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
  };
  Renderquestion = (data, id) => {
    let Answer = ["A", "B", "C", "D", "E", "F", "G"];
    if (data)
      return data.map((value, index) => {
    
        return (
          <div key={index} className="col-sm-12 pt-3">
            <div className="card">
              <h5 className="card-header">
                Question {index + 1}:{value["Question"]}
              </h5>
              <div className="card-body">
                {value["Answer"].map((value1,index) => {
                  if (value["Trueanswer"].includes(value1)) {
                    return (
                      <div key={value1} className="form-check">
                        {/* <input
                          className="form-check-input"
                          type="radio"
                          name={id + value["Question"]}
                          id="exampleRadios1"
                          defaultChecked
                          value={value["Question"]}
                        /> */}
                        <label><b>{Answer[index]}:</b></label>
                        <label className="form-check-label"> {value1}</label>
                      </div>
                    );
                  } else {
                    return (
                      <div className="form-check">
                        {/* <input
                          className="form-check-input"
                          type="radio"
                          name={id + value["Question"]}
                          id="exampleRadios1"
                          value={value["Question"]}
                        /> */}
                        <label><b>{Answer[index]}:</b> </label>
                        <label className="form-check-label"> {value1}</label>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="card-footer text-muted">
                <button
                  type="button"
                  style={{ width: "45%" }}
                  className="btn btn-outline-warning d-inline  ml-1 float-xl-left"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  style={{ width: "45%" }}
                  className="btn btn-outline-danger  ml-1 float-xl-right "
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        );
      });
  };
  render() {
    return (
      <>
        <div className="accordion col-12" id="accordionExample">
          {this.Rendermixexam()}
        </div>
      </>
    );
  }
}
export default Listexam;

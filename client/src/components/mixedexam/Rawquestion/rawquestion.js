import { Component } from "react";
const lodash = require("lodash");
class Rawquestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: {},
      subdatasource: [],
    };
  }
  Handlechange = (e) => {
    let subdata = this.props.rawquestion["rawquestion"];
    var datademo = subdata.filter((obj) => {
      return obj.Question === e.target.name;
    });
     subdata.filter((obj) => {
      if (datademo[0] === obj) {
        let a = [];
        a.push(e.target.value);
        obj.Trueanswer = a;
      }
    });
     this.setState({
      subdatasource: subdata,
    });
  };


  Handleupdate = (e) => {
   

    this.props.chagedata(this.state.subdatasource)
    if(this.state.subdatasource){
    this.setState({
      datasource:this.state.subdatasource
    })
  }
  };
  componentDidMount() {
    if (this.props.rawquestion["rawquestion"]) {
      this.setState({
        datasource: this.props.rawquestion["rawquestion"],
        subdatasource:this.props.rawquestion["rawquestion"]
      });
    }
  }
  Renderdata = () => {
    if (this.props.rawquestion["rawquestion"]) {
      return this.props.rawquestion["rawquestion"].map((value, index) => {
        return (
          <div key={index} className="col-sm-12 pt-3">
            <div className="card">
              <h5 className="card-header">
                Question {index + 1}:{value["Question"]}
              </h5>
              <div className="card-body">
                {value["Answer"].map((answer, index) => {
                  if (value["Trueanswer"].includes(answer)) {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={value["Question"]}
                          id={index}
                          checked={value["Trueanswer"].includes(answer)}
                          onChange={this.Handlechange}
                          value={answer}
                        />
                        <label className="form-check-label"> {answer}</label>
                      </div>
                    );
                  } else {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={value["Question"]}
                          id={index}
                          onChange={this.Handlechange}
                          checked={value["Trueanswer"].includes(answer)}
                          value={answer}
                        />
                        <label className="form-check-label"> {answer}</label>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="card-footer text-muted">
                <button
                  type="button"
                  style={{ width: "45%" }}
                  className="btn btn-outline-warning d-inline  ml-1 float-left"
                  onClick={this.Handleupdate}
                  id="button"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  style={{ width: "45%" }}
                  className="btn btn-outline-danger  ml-1 float-right "
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  loadding=()=>{
    if(this.props.rawquestion["load"]==='load'){
    return(<div class="loading">Loading&#8230;</div>)
    }
  }
  render() {

    return (
      <>
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0 col-10">
              <div
                className="btn btn-link collapsed p-0"
                style={{ textDecoration: "none" }}
                type="button"
                data-toggle="collapse"
                data-target="#collapse"
                aria-expanded="false"
                aria-controls="#collapse"
              >
                <h3>Đề gốc</h3>
              {this.loadding()}
              </div>
            </h2>

          </div>
          <div
            id="collapse"
            className="collapse"
            aria-labelledby="#heading"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <div className="container">
                <div className="row mt-3">{this.Renderdata()}</div>
              </div>
            </div>
          </div>
          {/* <div className="card-footer text-muted" id="headingOne">
            <button
              type="button"
              style={{ width: "45%" }}
              className="btn btn-outline-success col-2  ml-1 float-xl-right "
            >
              Thêm câu hỏi
            </button>
          </div> */}
        </div>
      </>
    );
  }
}
export default Rawquestion;

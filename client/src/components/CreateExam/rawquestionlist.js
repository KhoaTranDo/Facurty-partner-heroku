import { Component } from "react";

class Rawquestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: {},
      subdatasource: [],
      blockedit: "blockdiv",
      uploaddata: "edit",
    };
  }
  Handlechange = (e,question) => {
    let subdata = this.props.rawquestion;
    var datademo = subdata["rawquestions"].filter((obj) => {
      return obj.Question === question;
    });
    subdata["rawquestions"].filter((obj) => {
      if (datademo[0] === obj) {
        let a = [];
        a.push(e.target.value);
        obj.Trueanswer = a;
      }
    });
    this.setState({
      subdatasource: subdata,
      datasource: subdata,
    });
  };

  Handleupdate = (e) => {
    if (this.state.uploaddata === "edit") {
      if (this.state.subdatasource) {
        this.setState({
          blockedit: "",
          uploaddata: "update",
        });
      }
    } else if (this.state.uploaddata === "update") {
      this.setState({
        blockedit: "blockdiv",
        uploaddata: "edit",
      });
      if (this.state.subdatasource.length > 0) {
        // console.log(this.state.subdatasource)
        this.props.chagedata(this.state.subdatasource);
      }
    }
  };
  componentDidMount = async () => {
    if (this.props.rawquestion["rawquestions"]) {
      await this.setState({
        datasource: this.props.rawquestion,
        subdatasource: this.props.rawquestion,
      });
    }
  };
  deletedata = (e) => {
    let newraw = this.props.rawquestion;
    let index = e.target.id;
    newraw["rawquestions"].splice(index, 1);
    // this.props.chagedata(newraw);
    this.props.chagedata(newraw);
    this.setState({
      subdatasource: newraw,
    });
  };

  closeload = () => {
    let datade = { err: "error" };
    this.props.dataexam(datade);
  };
  Renderdata = () => {
    if (this.props.rawquestion["rawquestions"]) {
      return this.props.rawquestion["rawquestions"].map((value, index1) => {
        return (
          <div key={index1} className="col-sm-12 pt-3">
            <div className="card">
              <h5 className="card-header">
                Question {index1 + 1}:{value["Question"]}
              </h5>
              <div className={`card-body ${this.state.blockedit}`}>
                {value["Answer"].map((answer, index) => {
                  if (value["Trueanswer"].includes(answer)) {
                    return (
                      <div key={index} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={value["Question"]+index1}
                          id={index}
                          checked={value["Trueanswer"].includes(answer)}
                          onChange={(e)=>this.Handlechange(e,value["Question"])}
                          value={answer}
                        />
                        <label className="form-check-label"> {answer}</label>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={value["Question"]+index1}
                          id={index}
                          onChange={(e)=>this.Handlechange(e,value["Question"])}
                          checked={value["Trueanswer"].includes(answer)}
                          value={answer}
                        />
                        <label className="form-check-label"> {answer}</label>
                      </div>
                    );
                  }
                })}
              </div>
              <div className={`card-footer text-muted ${this.state.blockedit}`}>
                <button
                  type="button"
                  id={index1}
                  style={{ width: "45%" }}
                  className="btn btn-outline-danger  ml-1 float-right "
                  data-toggle="modal"
                  data-target={`#exampleModal${index1}`}
                >
                  X??a
                </button>
                {/* {this.deleteAccept(index)} */}
                <div
                  className="modal fade"
                  id={`exampleModal${index1}`}
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Delete question
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
                        Do you want to delete this question
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
                          id={index1}
                          className="btn btn-primary"
                          onClick={this.deletedata}
                          data-toggle="modal"
                          data-target={`#exampleModal${index1}`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  loadding = () => {
    if (this.props.rawquestion["load"] === "load") {
      return (
        <div className="loading" onDoubleClick={this.closeload}>
          Loading&#8230;
        </div>
      );
    }
  };
  render() {
    return (
      <>
        <div className="card">
          <div className="card-header" id="headingOne">
            <div className="row">
              <h2
                className="mb-0 col-10"
                data-toggle="collapse"
                data-target="#collapse"
                aria-expanded="false"
                aria-controls="#collapse"
              >
                <div
                  className="btn btn-link collapsed p-0"
                  style={{ textDecoration: "none" }}
                  type="button"
                >
                  <h3>Raw questions</h3>
                  {this.loadding()}
                </div>
              </h2>
              <button
                type="button"
                className={`btn btn-outline-warning d-inline float-left col-2 ${
                  this.props.rawquestion["rawquestions"] ? "" : "invisible"
                }`}
                onClick={this.Handleupdate}
                id="button"
              >
                {this.state.uploaddata === "edit" ? "Edit" : "Save"}
              </button>
            </div>
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
        </div>
      </>
    );
  }
}
export default Rawquestion;

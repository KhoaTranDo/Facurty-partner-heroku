import { Component } from "react";
import Exportdocx from "./exportfile";
import axios from "axios";

class Areaprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: "element",
      data: [],
      redirect:0
    };
  }

  componentDidMount = async () => {
    if(this.props.location.state){
    let { dataraw } = await this.props.location.state;
    
    axios
      .get(
        `/exam/${dataraw["slug"]}`
      )
      .then((res) => {
        this.setState({
          data: res.data["exammixed"],
          qrcoded: res.data["qrimage"],
          title: res.data["titles"],
          time: res.data['timedoexam'],
          dataraw: res.data,
        });
      })
      .catch((err) => console.log(err));
    }
    else{
      this.props.history.push("/create");
    }
  };
  Headerrender = () => {
    let exampage = {};
    exampage = this.state.data;
    if (Object.keys(exampage).length > 0) {
      return exampage.map((value, index) => {
        let active = index === 0 ? "nav-link active" : "nav-link";
        return (
          <li className="nav-item">
            <a
              className={active}
              data-toggle="tab"
              href={`#question` + value["idexam"]}
            >
              Exam {value["idexam"]}
            </a>
          </li>
        );
      });
    }
  };
  Renderquestion = () => {
    let rawdata = this.state.data;
    let title = this.state.title;
    let time = this.state.time;
    if (rawdata.length > 0) {
      return rawdata.map((value, index) => {
        let active =
          index === 0 ? "container tab-pane active" : "container tab-pane fade";
        return (
          <>
            <div id={`question${value["idexam"]}`} className={active}>
              <br />
              <Exportdocx data={this.state.dataraw} index={index} />
            
              <div
                id={this.state.element}
                style={{
                  backgroundColor: "white",
                }}
                className="m-auto border border-dark border-5 p-5"
              >
                <div className="row">
                  <img
                    id="qrcode"
                    src={this.state.qrcoded}
                    alt=""
                    width="100"
                    height="100"
                  />
                  <div className="col-9 float-right"></div>
                  <p id="index" className="m-auto" style={{ fontSize: "14pt" }}>
                    <b>Code: {value.idexam}</b>
                  </p>
                </div>
                <div className="row">
                  <h1
                    id="idex"
                    style={{ margin: "auto" }}
                    className="text-center"
                  >
                    <b>{title} </b>
                  </h1>
                </div>
                <div className="row">
                  <h4
                    id="idex"
                    style={{ margin: "auto" }}
                    className="text-center"
                  >
                    <b>{time} </b>
                  </h4>
                </div>
                {this.Renderanswer(value.questions)}
              </div>
            </div>
          </>
        );
      });
    }else{
      return this.loadding()
    }
  };
  Renderanswer = (rawdata) => {
    let answer = ["A", "B", "C", "D", "E", "F"];
    // let rawdata = this.state.data[0].questions;
    if (rawdata) {
      return rawdata.map((value, index) => {
        return (
          <>
            <p style={{ fontSize: "14pt" }}>
              <b>{index + 1}</b>.{value["Question"]}
            </p>
            {value["Answer"].map((value, index) => {
              return (
                <p style={{ fontSize: "14pt" }}>
                  {answer[index]}. {value}
                </p>
              );
            })}
          </>
        );
      });
    }
  };
  loadding = () => { 
      return <div className="loading">Loading&#8230;</div>;
  };
  render() {
    return (
      <div className="container mainreview">
        <div className="row">
          <h1 className='m-auto pt-5 pb-3'>Review exams document</h1>
        </div>
        <ul className="nav nav-tabs" role="tablist">
          {this.Headerrender()}
        </ul>
        <div className="tab-content croll-bar">{this.Renderquestion()}</div>
      </div>
    );
  }
}
export default Areaprint;

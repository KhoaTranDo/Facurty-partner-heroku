import { Component } from "react";
import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";
import Exportdocx from "../Printdocx/Exportdocx";
import axios from "axios";
class Areaprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: "element",
      data: {},
    };
  }

  componentDidMount = async () => {
    let { dataraw } = await this.props.location.state;
    axios
      .get(
        `http://localhost:${process.env.REACT_APP_PORT}/exam/${dataraw["slug"]}`
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
    console.log(this.state.dataraw);
    console.log(this.props.location.state.dataraw);
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
                  padding: "20px 95px",
                }}
                className="m-auto border"
              >
                <div className="row">
                  <img
                    id="qrcode"
                    src={this.state.qrcoded}
                    alt=""
                    width="70"
                    height="70"
                  />
                  <div className="col-9 float-right"></div>
                  <p id="index" className="m-auto" style={{ fontSize: "14pt" }}>
                    <b>Đề {value.idexam}</b>
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

  render() {
    return (
      <div className="container">
        <div className="m-auto, d-block"></div>

        <ul className="nav nav-tabs" role="tablist">
          {this.Headerrender()}
        </ul>
        <div className="tab-content">{this.Renderquestion()}</div>
      </div>
    );
  }
}
export default Areaprint;

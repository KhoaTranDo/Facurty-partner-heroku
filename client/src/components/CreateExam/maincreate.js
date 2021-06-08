import { Component } from "react";
import Infor from "./information";
import Rawquestion from "./rawquestionlist";
import Listexam from "./mixexamlist";

export default class MainCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawdata: {},
    };
  }
  Changerawdata = async (data) => {
    let raw = this.state.rawdata;
    raw = data;
    await this.setState({ rawdata: raw });
  };
  setData = async (datafile) => {
    await this.setState({
      rawdata: datafile,
    });
  };
  render() {
    return (
      <>
        <div>
          {/* end-menu */}
          <h3 className="text-center pt-5 mb-5" style={{ fontSize: 50 }}>
            <b>CREATE EXAMS</b>
          </h3>
          {/* input information  */}
          <Infor dataexam={this.setData} rawquestion={this.state.rawdata} />
          {/* end ìnormation */}
          {/* view */}
          <div className="container">
            <div className="row mt-5">
              {/* Raw question */}
              <div className="accordion col-12" id="accordionExample">
                <Rawquestion
                  rawquestion={this.state.rawdata}
                  chagedata={this.Changerawdata}
                  dataexam={this.setData}
                />
              </div>
            </div>
            <div className="row mt-5">
              <Listexam
                rawquestion={this.state.rawdata}
                chagedata={this.Changerawdata}
                
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

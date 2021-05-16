import { Component } from "react";
import Rawquestion from "./Rawquestion/rawquestion";
import Listexam from "./Exammix/listexammixed";
import Infor from "./Rawquestion/information";
import { Link } from "react-router-dom";
class Import extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawdata: {},
    };
  }
  Changerawdata=(data)=>{
    let raw=this.state.rawdata
    raw['rawquestion']=data
    this.setState({rawdata:raw})
  }
  setData = async (datafile) => {
    await this.setState({
      rawdata: datafile,
    });
  };
  render() {
    return (
      <div>
        <div className="d-flex flex-column flex-xl-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h5
              className="my-0 mr-md-auto font-weight-normal"
              style={{ color: "#329DEE", fontSize: 30 }}
            >
              Logo's C2se.16
            </h5>
          </Link>
        </div>
        {/* end-menu */}
        <h3 className="text-center pt-5 mb-5" style={{ fontSize: 50 }}>
          <b>TẠO ĐỀ</b>
        </h3>
        {/* input information  */}
        <Infor dataexam={this.setData} rawquestion={this.state.rawdata}  />
        {/* end ìnormation */}
        {/* view */}
        <div className="container">
          <div className="row mt-5">
            {/* Raw question */}
            <div className="accordion col-12" id="accordionExample">
              <Rawquestion rawquestion={this.state.rawdata} chagedata={this.Changerawdata}/>
            </div>
          </div>
          <div className="row mt-5">
            
              <Listexam rawquestion={this.state.rawdata}/>
      
          </div>
        </div>
      </div>
    );
  }
}

export default Import;

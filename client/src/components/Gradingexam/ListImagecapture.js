import axios from "axios";
import { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ModalImage from "react-modal-image";
class ListImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datagrading: {},
    };
  }

  componentDidMount = async () => {
    await this.setState({
      datagrading: this.props.data,
    });
  };
  Deleteimage = async (indexImage, data) => {
    let dataSend = {
      indexImage: indexImage,
      data: data,
      slug: this.props.data["slug"],
    };
    let getdata = await axios.post(
      `http://localhost:6001/exam/grading/exam/delete`,
      dataSend
    );
    if (getdata) {
      this.props.setdata(getdata.data);
    } else {
      console.log("error");
    }
  };
  exportExel = (listdata) => {
    if (listdata.grading.length > 0) {
      return (
        <>
          <table id="emp" className="table d-none">
            <thead>
              <tr>
                <th>Name Student</th>
                <th>Correct questions</th>
                <th>Total questions</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {listdata.grading.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.nameStudent}</td>
                    <td>{value.truequestion}</td>
                    <td>{listdata.questions.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
 
            <ReactHTMLTableToExcel
              className="btn btn-info d-inline float-right col-md-2"
              table="emp"
              filename={`ReportGrading-${listdata.idexam}`}
              sheet="Sheet"
              buttonText="Export excel"
            />
     
        </>
      );
    }
  };
  renderExamlist = () => {
    if (this.props.data) {
      let dataimage = this.props.data.exammixed;
      return dataimage.map((index) => {
        return (
          <>
            <h2 className="pl-3">Code {index.idexam}</h2>
            <div className="accordion col-12" id="accordionExample">
              <div className="card">
                <div
                  className="card-header"
                  id="headingTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <div
                    className="btn btn-link collapsed"
                    style={{ textDecoration: "none" }}
                    type="button"
                    data-toggle="collapse"
                    data-target={`#collapseone${index.idexam}`}
                  >
                    <h3 className="mb-0">
                      <i className="fas fa-photo-video noti" /> &nbsp; Grading
                      history
                    </h3>
                  </div>
                  {this.exportExel(index)}
                </div>
                <div
                  id={`collapseone${index.idexam}`}
                  className="collapse show"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    <div className="container">
                      <div className="row">{this.renderImage(index)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      });
    }
  };
  renderImage = (data) => {
    return data.grading.map((values, index) => {
      return (
        <>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-header">
                <h5>
                  <small>
                    <b>Name: </b>
                    {values.nameStudent}
                  </small>
                </h5>
                <h5>
                  <small>
                    <b>True: </b>
                    {values.truequestion}/{data.questions.length}
                  </small>
                </h5>
              </div>
              <div className="card-body d-flex justify-content-center">
                 <ModalImage
            small={values.image}
            large={values.image}
            alt={values.nameStudent}
            hideDownload={true}
            hideZoom={true}
            className="modal-image"
          />

             
              </div>
              <div className="card-footer text-muted">
                <button
                  type="button"
                  style={{ width: "45%" }}
                  className="btn btn-outline-danger  ml-1 float-xl-right "
                  data-toggle="modal"
                  data-target={`#exampleModalLong${index}delete`}
                >
                  Delete
                </button>
                <div
                  class="modal fade"
                  id={`exampleModalLong${index}delete`}
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="Modaldelete"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-body">
                        Do you want to delete this file
                        <h5>
                          <small>
                            <b>Name: </b>
                            {values.nameStudent}
                          </small>
                        </h5>
                        <h5>
                          <small>
                            <b>True: </b>
                            {values.truequestion}/{data.questions.length}
                          </small>
                        </h5>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          data-dismiss="modal"
                          onClick={() => this.Deleteimage(index, data)}
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
        </>
      );
    });
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="row pb-5">{this.renderExamlist()}</div>
        </div>
      </>
    );
  }
}
export default ListImage;

import axios from "axios";
import { Component } from "react";

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
    let dataSend={
      indexImage:indexImage,
      data:data,
      slug:this.props.data['slug']
    }
   let getdata= await axios.post(`/exam/grading/exam/delete`,dataSend)
   if (getdata) {
    this.props.setdata(getdata.data);
  } else {
    console.log("error");
  }
  };

  renderExamlist = () => {
    if (this.props.data) {
      let dataimage = this.props.data.exammixed;
      return dataimage.map((index) => {
        return (
          <>
            <h2 className='pl-3'>Code {index.idexam}</h2>
            <div className="accordion col-12" id="accordionExample">
              <div className="card">
                <div
                  className="card-header"
                  id="headingTwo"
                  data-toggle="collapse"
                  data-target={`#collapseone${index.idexam}`}
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <div
                    className="btn btn-link collapsed"
                    style={{ textDecoration: "none" }}
                    type="button"
                  >
                    <h3 className="mb-0">
                      <i className="fas fa-photo-video noti" /> &nbsp;
                      Grading history
                    </h3>
                  </div>
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
                <img
                  src={values.image}
                  style={{ width: 175, height: 300 }}
                  alt="#asd"
                  data-toggle="modal"
                  data-target={`#exampleModalLong${index}`}
                />
                <div
                  class="modal fade"
                  id={`exampleModalLong${index}`}
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">
                          Image
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body m-auto">
                        <img
                          src={values.image}
                          style={{ width: 400, height: 600 }}
                          alt="#asd"
                          data-toggle="modal"
                          data-target={`#exampleModalLong${index}`}
                        />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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

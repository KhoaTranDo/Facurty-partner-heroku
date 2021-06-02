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
  Deleteimage=(index,data)=>{
    console.log(index)
  }
  renderExamlist = () => {
    console.log(this.props.data)
    if (this.props.data) {
     let dataimage=this.props.data.exammixed;
     return dataimage.map((index)=>{
        return (
          <>
            <h1>Code {index.idexam}</h1>
            <div className="accordion col-12" id="accordionExample">
              <div className="card">
                <div
                  className="card-header"
                  id="headingTwo"
                  data-toggle="collapse"
                  data-target="#collapseone"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <div
                    className="btn btn-link collapsed"
                    style={{ textDecoration: "none" }}
                    type="button"
                  >
                    <h2 className="mb-0">
                      <i className="fas fa-photo-video noti" />
                      Grading history
                    </h2>
                  </div>
                </div>
                <div
                  id="collapseone"
                  className="collapse show"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    <div className="container">
                      <div className="row">
                        {this.renderImage(index)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })
    }
  };
  renderImage = (data) => {
    return data.grading.map((values,index)=>{
      return(
        <>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              <h5>
                {" "}
                <small>
                  <b>Name: </b>{values.nameStudent}
                </small>
              </h5>
              <h5>
                {" "}
                <small>
                  <b>True: </b>{values.truequestion}/{data.questions.length}
                </small>
              </h5>
            </div>
            <div className="card-body d-flex justify-content-center">
              <img
                src={values.image}
                style={{ width: 175, height:300 }}
                alt="#asd"
              />
            </div>
            <div className="card-footer text-muted">
              <button
                type="button"
                style={{ width: "45%" }}
                className="btn btn-outline-danger  ml-1 float-xl-right "
                onClick={()=>this.Deleteimage(index,data)}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </>
      )
    })
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

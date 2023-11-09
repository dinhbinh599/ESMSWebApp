import { Pagination, Spin } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../../component/search/Search';
import { checkSession } from '../../service/action/AuthenticateAction';
import { changeStatus, fetchCertificationPaging } from '../../service/action/CertificationSelectBarAction';
import { history } from '../../service/helper/History';
import { showPositionSpan, showPositionStatus } from '../../service/util/util';

class Certification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isLoading: true
    }
  }

  componentDidMount = () => {
    this.props.checkSession()
    this.props.fetchCertifications(1, this.state.search)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.certiList !== prevState.certiList) {
      return { someState: nextProps.certiList };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.certiList !== this.props.certiList) {
      if (typeof this.props.certiList.items !== 'undefined') {
        this.setState({ isLoading: false })
      }
    }
  }

  onChangeStatus = (certificationID, certificationName) => {
    var { changeStatus, certiList } = this.props
    var { search } = this.state
    confirm({
      title: `Are you sure you want to change ${certificationName} status?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      style: { width: 'auto' },
      onOk() {
        changeStatus(certificationID, certiList.pageIndex, search)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  onUpdate = (certificationID) => {
    history.push(`/certification/update/${certificationID}`)
  }

  onShowListCertifications = (list) => {
    var result = null
    if (list.length > 0) {
      result = list.map((item, index) => {
        return (
          <tr key={index}>
            <th className="text-center">{index + 1}</th>
            <th className="" style={{ width: 350 }}>{item.certificationName}</th>
            <th className="" style={{ width: 250 }}>{item.skillName}</th>
            <th className="text-center">{item.certiLevel}</th>
            <th className="text-center" style={{ width: 150 }} >
              <span className={`badge badge-pill ${showPositionSpan(item.status)} span`}>
                {showPositionStatus(item.status)}
              </span>
            </th>
            <th className="text-primary">
              <a className="text-primary" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(item.certificationID)}>Update</a>
            </th>
            <th className="text-primary">
              <a className="text-primary" style={{ cursor: 'pointer' }} onClick={() => this.onChangeStatus(item.certificationID, item.certificationName)}>Change Status</a>
            </th>
          </tr>
        )
      })
    }
    return result
  }

  onHandle = () => {
    history.push('/certification/create')
  }

  onNext = () => {
    var { certiList } = this.props
    if (certiList.pageIndex < certiList.pageCount)
      this.props.fetchCertifications(certiList.pageIndex + 1, this.state.search)
  }

  onPrevios = () => {
    var { certiList } = this.props
    if (certiList.pageIndex > 1)
      this.props.fetchCertifications(certiList.pageIndex - 1, this.state.search)
  }

  searchCert = (value) => {
    this.setState({ search: value })
    this.props.fetchCertifications(1, value)
  }
  onSelectPage = (e) => {
    this.props.fetchCertifications(e, this.state.search)
  }

  render() {
    var { certiList } = this.props
    var result = { items: [], pageIndex: 0, pageCount: 0 }
    if (typeof certiList.items !== 'undefined' && certiList !== null)
      result = certiList
    return (
      <React.Fragment>
        <ol class="breadcrumb mb-4 mt-3">
          <li class="breadcrumb-item active">Certificates</li>
        </ol>
        <div className="container-fluid">
          <div class="card mb-4">
            <div class="card-header">
              <i class="fas fa-table mr-1"></i>
                  Certificates
                </div>

            <div className="card-body">
              {this.state.isLoading ? (
                ""
              ) : (
                <div className="row mb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      fontWeight: 700,
                      borderRadius: 5,
                      marginLeft: 20,
                      marginTop: 10,
                    }}
                    onClick={this.onHandle}
                  >
                    <div
                      className="row"
                      style={{ paddingLeft: 7, paddingRight: 7 }}
                    >
                      <i className="material-icons">add_box</i>Create New
                          Certificate
                        </div>
                  </button>
                  <Search
                    search="Certi"
                    placeholder="Search certificate name ..."
                    searchCert={this.searchCert}
                  />
                </div>
              )}
              <div class="table-responsive">
                <table
                  class="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellspacing="0"
                >
                  <thead className=" text-primary">
                    <tr>
                      <th className="font-weight-bold text-center">No</th>
                      <th
                        className="font-weight-bold"
                        style={{ marginLeft: 20 }}
                      >
                        Certification
                          </th>
                      <th
                        className="font-weight-bold"
                        style={{ marginLeft: 20 }}
                      >
                        Skill
                          </th>
                      <th className="font-weight-bold text-center">
                        Level
                          </th>
                      <th className="font-weight-bold text-center">
                        Status
                          </th>
                      <th className="font-weight-bold "></th>
                      <th className="font-weight-bold "></th>
                    </tr>
                  </thead>
                  {this.state.isLoading ? (
                    ""
                  ) : (
                    <tbody>
                      {this.onShowListCertifications(result.items)}
                    </tbody>
                  )}
                </table>
              </div>
              {this.state.isLoading ? (
                <div className="row justify-content-center">
                  <Spin className="text-center" size="large" />
                </div>
              ) : (
                ""
              )}
              {this.state.isLoading ? (
                ""
              ) : (
                <div
                  className="row justify-content-center"
                  style={{ marginBottom: 20 }}
                >
                  <Pagination
                    defaultCurrent={result.pageIndex}
                    total={result.totalRecords}
                    onChange={this.onSelectPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <style jsx global>
          {`
                .ant-select-selector {
                  visibility: hidden;
                }
              `}
        </style>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    certiList: state.CertificationReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCertifications: (pageIndex, search) => {
      dispatch(fetchCertificationPaging(pageIndex, search))
    },
    checkSession: () => {
      dispatch(checkSession())
    },
    changeStatus: (certificationID, pageIndex, search) => {
      dispatch(changeStatus(certificationID, pageIndex, search))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Certification);
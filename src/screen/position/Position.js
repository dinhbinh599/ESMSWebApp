import { Pagination, Spin } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../../component/search/Search';
import { checkSession } from '../../service/action/AuthenticateAction';
import { changeStatusPosition, fetchPostionListPaging } from '../../service/action/PositionSelectBarAction';
import { history } from '../../service/helper/History';
import { showPositionSpan, showPositionStatus } from '../../service/util/util';

class Position extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchPosittion(1, this.state.search)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.item !== prevState.item) {
            return { someState: nextProps.item };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.item !== this.props.item) {
            if (typeof this.props.item.items !== 'undefined') {
                this.setState({ isLoading: false })
            }
        }
    }

    onUpdate = (posID) => {
        history.push(`/position/update/${posID}`)
    }

    onChangeStatus = (posID, position) => {
        var { changeStatus, item } = this.props
        var { search } = this.state
        confirm({
            title: `Are you sure you want to change ${position} status?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                changeStatus(posID, item.pageIndex, search)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onShowListPosition = (list) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <tr key={index}>
                    <th className="text-center">{index + 1}</th>
                    <th className="" style={{ width: 450 }}>{value.name}</th>
                    <th className="text-center" style={{ width: 150 }}>
                        <span className={`badge badge-pill ${showPositionSpan(value.status)} span`}>
                            {showPositionStatus(value.status)}
                        </span>
                    </th>
                    <th className="text-primary">
                        <a className="text-rigth" style={{ cursor: 'pointer' }} onClick={() => this.onUpdate(value.posID)} >Update</a>
                    </th>
                    <th className="text-primary">
                        <a className="text-primary" style={{ cursor: 'pointer' }} onClick={() => this.onChangeStatus(value.posID, value.name)}>Change Status</a>
                    </th>
                </tr>
            )
        })
        return result
    }

    onNext = () => {
        var { item } = this.props
        if (item.pageIndex < item.pageCount) {
            this.props.fetchPosittion(item.pageIndex + 1, this.state.search)
        }
    }

    onPrevios = () => {
        var { item } = this.props
        if (item.pageIndex > 1) {
            this.props.fetchPosittion(item.pageIndex - 1, this.state.search)
        }
    }

    onHandle = () => {
        history.push('/position/create')
    }

    searchPos = (value) => {
        this.setState({ search: value })
        this.props.fetchPosittion(1, value)
    }

    onSelectPage = (e) => {
        this.props.fetchPosittion(e, this.state.search)
    }

    render() {
        var { item } = this.props
        var list = []
        if (typeof item.items !== 'undefined')
            list = item.items
        return (
          <React.Fragment>
            <ol class="breadcrumb mb-4 mt-3">
              <li class="breadcrumb-item active">Positions</li>
            </ol>
            <div className="container-fluid">
              <div class="card mb-4">
                <div class="card-header">
                  <i class="fas fa-table mr-1"></i>
                  Positions
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
                          <i className="material-icons">add_box</i>Create New Position
                        </div>
                      </button>

                      <Search
                        search="Position"
                        placeholder="Search position name ..."
                        searchPos={this.searchPos}
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
                            Position
                          </th>
                          <th
                            className="font-weight-bold text-center"
                            style={{ marginLeft: 20 }}
                          >
                            Status
                          </th>
                          <th
                            className="font-weight-bold text-center"
                            style={{ marginLeft: 20 }}
                          ></th>
                          <th
                            className="font-weight-bold text-center"
                            style={{ marginLeft: 20 }}
                          ></th>
                        </tr>
                      </thead>
                      {this.state.isLoading ? (
                        ""
                      ) : (
                        <tbody>{this.onShowListPosition(list)}</tbody>
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
                        defaultCurrent={item.pageIndex}
                        total={item.totalRecords}
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
        item: state.PositionReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchPosittion: (pageIndex, search) => {
            dispatch(fetchPostionListPaging(pageIndex, search))
        },
        changeStatus: (posID, pageIndex, search) => {
            dispatch(changeStatusPosition(posID, pageIndex, search))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Position);
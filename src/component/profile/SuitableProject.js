import { Button, Spin, Tabs } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSuitableList } from '../../service/action/SuitableListAction';
import { history } from '../../service/helper/History';
import SuitableProjectDetail from './suitable-project-detail/SuitableProjectDetail';
const TabPane = Tabs.TabPane;

class SuitableProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
            isLoad: true
        }
    }

    componentDidMount = () => {
        this.props.fetchSuitableList(this.props.empID)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.suitableList !== this.props.suitableList) {
            this.setState({ isLoad: false })
        }
    }

    showProjectTab = () => {
        var { suitableList } = this.props
        var result = null
        result = suitableList.map((item, index) => {
            return (<TabPane key={index} tab={item.projectName} ></TabPane>)
        })
        return result
    }

    onClickMenu = (value) => {
        this.setState({ selectIndex: value })
    }

    showSuitableProjectDetail = () => {
        var { selectIndex } = this.state
        var { suitableList } = this.props
        if (suitableList.length > 0) {
            return (<SuitableProjectDetail item={suitableList[selectIndex]} empID={this.props.empID} />)
        }
    }

    onDetails = () => {
        var { suitableList } = this.props
        history.push(`/project/detail/${suitableList[this.state.selectIndex].projectID}`)
    }

    render() {
        var { suitableList } = this.props
        // console.log(suitableList)
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    :
                    suitableList.length === 0 ?
                        <div className='row justify-content-center' style={{ width: 'auto' }} >
                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >There is currently no suitable project for this employee</h4>
                        </div>
                        :
                        <div class="card mb-4">
                            <div class="card-header">
                                <Tabs defaultActiveKey="0" onChange={this.onClickMenu}>
                                    {this.showProjectTab()}
                                </Tabs>
                            </div>
                            <div class="card-body">
                                <div className='row pull-right mb-4 mr-2'>
                                    <Button onClick={this.onDetails} type="primary" >
                                        Detail
                                </Button>
                                </div>

                                {this.showSuitableProjectDetail()}
                            </div>
                        </div>
                }
            </React.Fragment >
        );
    }
}

const mapStateToProp = (state) => {
    return {
        suitableList: state.SuitableProjectReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchSuitableList: (empID) => {
            dispatch(fetchSuitableList(empID))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(SuitableProject);
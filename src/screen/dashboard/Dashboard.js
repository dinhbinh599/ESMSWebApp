import React, { Component } from 'react';
import PineChart from '../../component/Chart/PineChart'
import BarChart from '../../component/Chart/Barchart'
import { checkSession } from '../../service/action/AuthenticateAction';
import { connect } from 'react-redux';
import { fetchDataStatistics, fetchMissingEmpPosition, fetchSkillInPosition } from "../../service/action/StatisticAction";
import ChartStatus from '../../component/Chart/ChartStatus';
import { fetchPostionList } from '../../service/action/PositionAction';
import SelectBar from "../../component/create-position-form/select-search/SelectBar";
import { Spin } from 'antd';
import { convertPositionList } from '../../service/util/util';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posID: 0,
            isLoading: true,
            positionList: []
        }
    }


    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchMissingEmpPos()
        this.props.fetchPositionList()
        this.props.fetchSkillInPosition()
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.skillInPosition !== this.props.skillInPosition) {
            var posID = this.state.posID
            // if (prevProp.positionList !== this.props.positionList) {
            if (this.props.positionList.length > 0) {
                posID = this.props.positionList[0].posID
                //     }
                //     if (prevProp.skillInPosition !== this.props.skillInPosition) {

                //     }
            }
            this.setState({ isLoading: false, posID: posID })

        }
    }

    //get
    onShowBarList = (dataStatisticList) => {
        var result = null
        if (typeof dataStatisticList !== 'undefined') {
            return (
                <BarChart dataStatisticList={dataStatisticList} />
            )
        }
        return result
    }

    getIndexByPosID = () => {
        var { skillInPosition } = this.props
        var result = -1
        for (let index = 0; index < skillInPosition.length; index++) {
            if (skillInPosition[index].posID === this.state.posID)
                result = index
        }
        return result
    }

    onShowPieList = () => {
        var index = this.getIndexByPosID()
        var { skillInPosition } = this.props
        if (typeof skillInPosition.find(e => e.skillInPos) !== 'undefined') {
            return (<PineChart item={skillInPosition[index].skillInPos} />)
        }
    }

    onSelectPos = (posID) => {
        this.setState({ posID: posID })
    }

    render() {
        var { dataStatistics, positionList } = this.props
        var positionListConverted = convertPositionList(positionList)
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
                {this.state.isLoading ?
                    <div className="row justify-content-center">
                        <Spin className="text-center" size="large" />
                    </div>
                    :
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card card-chart">
                                    <div>
                                        <div className="ct-chart" />
                                        {this.onShowBarList(dataStatistics)}
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">Position lack of staff</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                {positionListConverted.length === 0 ?
                                    <div className="row justify-content-center">
                                        <Spin className="text-center" size="large" />
                                    </div>
                                    :
                                    <>

                                        <div className="card card-chart">
                                            <div className='row mb-4 mt-4 ml-5' >
                                                <div className='col-auto mt-1'>Position</div>
                                                <div className='col-auto'>

                                                    <SelectBar type='common'
                                                        placeholder="Select Position"
                                                        name='posID'
                                                        list={positionListConverted}
                                                        value={this.state.posID}
                                                        onSelectPos={this.onSelectPos}
                                                    />

                                                </div>
                                            </div>
                                            <div>
                                                <div className="ct-chart">
                                                    {this.onShowPieList()}
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <h4 className="card-title">Skills in position</h4>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                }
            </React.Fragment >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        dataStatistics: state.DataStatisticsReducer,
        positionList: state.PositionSelectBarReducer,
        skillInPosition: state.SkillInPosition
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchDataStatistics: () => {
            dispatch(fetchDataStatistics())
        },
        fetchPositionList: () => {
            dispatch(fetchPostionList())
        },
        fetchMissingEmpPos: () => {
            dispatch(fetchMissingEmpPosition())
        },
        fetchSkillInPosition: () => {
            dispatch(fetchSkillInPosition())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);

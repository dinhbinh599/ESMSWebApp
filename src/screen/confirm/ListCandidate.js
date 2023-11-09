import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import ProgressBar from '../../component/progress-bar/ProgressBar';
import SuggestCandidates from '../../component/suggest-candidate/SuggestCandidatesTable'
import * as Action from "../../service/action/SuggestCandidateAction";
import '../../css/SuggestNav.css'
import { checkSession } from '../../service/action/AuthenticateAction';
import { compose } from 'redux';
import { Spin, Tabs } from "antd";
import { history } from '../../service/helper/History';
import { store } from 'react-notifications-component';
import BriefDetail from '../../component/brief-detail/BrriefDetails';

const TabPane = Tabs.TabPane;

class ListCandidate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        }
    }


    componentDidMount = () => {
        this.props.checkSession();
        var { match } = this.props;
        if (this.props.candidateSelectedList.length === 0)
            this.props.fetchSuggestCandidateList(match.params.id);
    };

    componentDidUpdate = (prevProp) => {
        if (prevProp.suggestCandidateList !== this.props.suggestCandidateList) {
            this.setState({ isLoad: false })
            // console.log('candidateSelectedList', this.props.candidateSelectedList)
        }
    }

    onSelected = (index) => {
        this.props.onPositionSelect(index);
    };

    selectCandidate = (check, candidate, posID) => {
        this.props.selectCandidate(check, candidate, posID);
    };

    onNoteRejectingReason = (value, candidate, posID) => {
        this.props.noteRejectingReason(value, candidate, posID)
    }

    getSelectedCandidateList = (suggestCandidateItem, selecedCandidateList) => {
        for (let k = 0; k < selecedCandidateList.length; k++) {
            if (suggestCandidateItem.posName === selecedCandidateList[k].posName)
                return selecedCandidateList[k];
        }
        return null;
    };

    getTabName = () => {
        var { candidateSelectedList } = this.props;
        var result = candidateSelectedList.map((item, index) =>
            <>
                <TabPane tab={(item || {}).posName} key={index}></TabPane>
            </>
        );
        return result;
    };

    onSelectAll = (value, posID) => {
        this.props.selectAll(value, posID);
    };

    onMoveToConfirmPage = () => {
        if (typeof this.props.candidateSelectedList.find(obj =>
            obj.employees.find(emp =>
                (typeof emp.check === 'undefined' && typeof emp.note === 'undefined') || (emp.check === false && emp.note === '')))
            !== 'undefined')
            store.addNotification({
                message: "Please type rejecting reason for the candidate you not check",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: false
                }
            })
        else {
            history.push(`/project/confirm-accept-candidate/${this.props.match.params.id}`)
        }
    }

    render() {
        var { suggestCandidateList, selectedIndex, candidateSelectedList, } = this.props;
        console.log('candidateSelectedList',candidateSelectedList)
        return (
            <div>
                <ProgressBar current="0" />
                <BriefDetail />
                {this.state.isLoad ?
                    <div className="row justify-content-center">
                        <Spin className="text-center" size="large" />
                    </div> :
                    <div class="card mb-4">
                        <div class="card-header">
                            <Tabs defaultActiveKey="0" onChange={this.onSelected}>
                                {this.getTabName()}
                            </Tabs>
                        </div>
                        <div className="card-body">
                            {suggestCandidateList.length > 0 ? (
                                <SuggestCandidates
                                    item={candidateSelectedList[selectedIndex]}
                                    onSelectCandidate={this.selectCandidate}
                                    onNoteRejectingReason={this.onNoteRejectingReason}
                                    onSelectAll={this.onSelectAll}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                }
                {this.state.isLoad ? '' :
                    <div className="row pull-right" style={{ marginTop: -10, marginBottom: 10 }}>
                        <div className="col">
                            <button type="button" className="btn btn-primary pull-right" style={{ width: 110, fontWeight: 600 }} onClick={this.onMoveToConfirmPage} >
                                Next
                        </button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        suggestCandidateList: state.SuggestCandidateList,
        selectedIndex: state.SuggestCandidateSelect,
        candidateSelectedList: state.SuggestCandidateSelectedList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPositionSelect: index => {
            dispatch(Action.setPositionSelect(index))
        },
        selectCandidate: (check, candidate, posID) => {
            dispatch(Action.selectCandidate(check, candidate, posID))
        },
        noteRejectingReason: (value, candidate, posID) => {
            dispatch(Action.noteRejectingReason(value, candidate, posID))
        },
        fetchSuggestCandidateList: (projectID) => {
            dispatch(Action.fetchSuggestList(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        selectAll: (check, posID) => {
            dispatch(Action.selectAllCandidates(check, posID))
        }
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ListCandidate);
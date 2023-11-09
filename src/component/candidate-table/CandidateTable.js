import React, { Component } from 'react';
import TableItems from './table-item';

class CandidateTable extends Component {

    showListStaff = (staffList) => {
        var result = null;
        result = staffList.map((staff, index) => {
            return (<TableItems key={index} staff={staff} index={index} />);
        })
        return result;
    }

    showStatus = (status) => {
        switch (status) {
            case 'Pending':
                return 'secondary'
            case 'On-going':
                return 'primary'
            case 'Finish':
                return 'success'
            default:
                break;
        }
    }
    render() {
        var { project } = this.props;
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className=" text-primary">
                        <tr>
                            <th className="text-center font-weight-bold">No</th>
                            <th className="text-center font-weight-bold">ID</th>
                            <th className="text-center font-weight-bold">Name</th>
                            <th className="text-center font-weight-bold">Position</th>
                            <th className="text-center font-weight-bold">Date In</th>
                            <th className="text-center font-weight-bold">Date Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.showListStaff(project.staff)} */}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CandidateTable;
import moment from 'moment';
import React, { Component } from 'react';

class BriefDetail extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row breadcrumb mb-4 mt-3">
                    <div className="col-auto mr-auto">
                        <li className="breadcrumb-item active" style={{ fontWeight: 600 }}>
                            {JSON.parse(localStorage.getItem('projectName'))}
                        </li>
                    </div>
                    <div className='col-auto'>
                        <li className="breadcrumb-item active">
                            <React.Fragment>
                                <p style={{ fontWeight: 600 }}>{moment(localStorage.getItem('dateCreate')).format('DD-MM-YYYY')}</p>
                                &nbsp; - &nbsp;
                                <p style={{ fontWeight: 600 }}>{moment(localStorage.getItem('dateEnd')).format('DD-MM-YYYY')}</p>
                            </React.Fragment>
                        </li>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BriefDetail;
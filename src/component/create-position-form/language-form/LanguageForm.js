import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLanguage } from '../../../service/action/LanguageSelectBarAction';
import LanguageFormContent from './language-form-content/LanguageFormContent';

class LanguageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false,
            language: {
                langID: 0,
                langLevel: 0
            }
        }
    }

    componentDidMount = () => {
        this.props.onFetchLanguage()
    }

    // add level
    onAddLanguage = () => {
        this.props.onAddLanguage(this.state.language)
    }

    getLanguageListNotSelect = (language) => {
        var { languageList } = this.props
        var listNotSelect = languageList.slice(0, languageList.length)
        if (typeof language !== 'undefined') {
            for (let i = 0; i < listNotSelect.length; i++) {
                for (let k = 0; k < language.length; k++) {
                    if (listNotSelect[i].langID === language[k].langID) {
                        var clone = { ...listNotSelect[i] }
                        clone.isSelect = true
                        listNotSelect[i] = clone
                    }
                }
            }
        }

        return listNotSelect
    }

    showItems = (language) => {
        var result = null;
        var languageList = this.getLanguageListNotSelect(language)
        if (typeof language !== 'undefined') {
            result = language.map((item, languageIndex) => {
                return (
                    <LanguageFormContent key={languageIndex}
                        languageIndex={languageIndex}
                        languageList={languageList}
                        onDeleteLanguage={this.props.onDeleteLanguage}
                        item={item}
                        onUpdateLanguageID={this.props.onUpdateLanguageID}
                        onUpdateLanguageLevel={this.props.onUpdateLanguageLevel}
                    />
                );
            })
        }
        return result;
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { language } = this.props
        var result = []
        if (typeof language !== 'undefined')
            result = language

        const showLanguage = (language) => {
            if (this.state.isMinimize)
                return ""
            else {
                return (<>
                    {this.showItems(language)}
                    {this.props.languageList.length === language.length ?
                        '' :
                        <span className="material-icons add" style={{ marginTop: 10 }}
                            onClick={() => this.onAddLanguage()}>add_box</span>
                    }
                </>)
            }
        }
        return (
            <div class="card mb-4">
                <div class="card-header">
                    Communicate Language
                    <span className="material-icons pull-right clear" style={{ cursor: 'pointer' }} onClick={this.setMinimize} >
                        {!this.state.isMinimize ? 'minimize' : 'crop_free'}
                    </span>
                </div>
                {!this.state.isMinimize ?
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th >Language</th>
                                        <th >Level</th>
                                        <th ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {showLanguage(result)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : ''}
            </div>
            // <div className="card mb-50">
            //     <div className="card-header ">
            //         <div className="row">
            //             <div className="col">
            //                 <h5 className="font-weight-bold">Language</h5>
            //             </div>
            //             <div className="col pull-right">
            //                 <span className="material-icons pull-right clear" onClick={this.setMinimize} > {this.state.isMinimize === false ? 'minimize' : 'crop_free'}</span>
            //             </div>
            //         </div>

            //     </div>
            //     {showLanguage(result)}
            // </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageList: state.LanguageSelectBarReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchLanguage: () => {
            dispatch(fetchLanguage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageForm);
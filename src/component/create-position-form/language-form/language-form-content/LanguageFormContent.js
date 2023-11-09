import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../../../service/action/LanguageSelectBarAction";
import { convertLanguageList } from "../../../../service/util/util";
import SelectBar from '../../select-search/SelectBar';

class LanguageFormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: [
                { label: 10, value: 10 },
                { label: 9, value: 9 },
                { label: 8, value: 8 },
                { label: 7, value: 7 },
                { label: 6, value: 6 },
                { label: 5, value: 5 },
                { label: 4, value: 4 },
                { label: 3, value: 3 },
                { label: 2, value: 2 },
                { label: 1, value: 1 },
            ]
        }
    }


    componentDidMount = () => {
        this.props.fetchLanguage()
    }

    onDeleteLanguage = (languageIndex) => {
        this.props.onDeleteLanguage(languageIndex)
    }

    render() {
        var { item, languageIndex, languageList } = this.props
        var listConverted = convertLanguageList(languageList)
        return (
            <React.Fragment>
                <tr>
                    <td>
                        <SelectBar name="language"
                            type='unique'
                            placeholder="Select language"
                            list={listConverted}
                            onUpdateLanguageID={this.props.onUpdateLanguageID}
                            languageIndex={languageIndex}
                            value={item.langID} />
                    </td>
                    <td>
                        <SelectBar
                            name="languageLevel"
                            type='common'
                            placeholder="Select language level"
                            list={this.state.level}
                            onUpdateLanguageLevel={this.props.onUpdateLanguageLevel}
                            languageIndex={languageIndex}
                            value={item.langLevel} />
                    </td>
                    <td>
                        <span className="material-icons pull-right" onClick={() => this.onDeleteLanguage(languageIndex)}>clear</span>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.LanguageSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchLanguage: () => {
            dispatch(Action.fetchLanguage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(LanguageFormContent);
import TextArea from 'antd/lib/input/TextArea';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import { checkSession } from '../../service/action/AuthenticateAction';
import { createCertification, fetchCertificationDetail, generateCertification, updateCertificate, updateCertificationName, updateCertiLevel, updateSKillId } from '../../service/action/CertificationSelectBarAction';
import { fetchHardSkill } from '../../service/action/HardSkillSelectBarAction';
import { convertSkillList } from '../../service/util/util';

class CreateCertification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: [
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
                { label: 4, value: 4 },
                { label: 5, value: 5 },
                { label: 6, value: 6 },
                { label: 7, value: 7 },
                { label: 8, value: 8 },
                { label: 9, value: 9 },
                { label: 10, value: 10 },
            ]
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.onFetchHardSkill()

        var { match } = this.props
        if (typeof match !== 'undefined') {
            this.props.fetchCertiDetail(match.params.id)
        } else
            this.props.onGenerateCerti()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.certi !== prevState.certi) {
            return { someState: nextProps.certi };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.certi !== this.props.certi) {
        }
    }

    handleChange = (e) => {
        this.props.onUpdateCertiName(e.target.name, e.target.value)
    }

    onSelectSkill = (value) => {
        this.props.onUpdateSkillID(value)
    }

    onSelectLevel = (value) => {
        this.props.onUpdateCertiLevel(value)
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (typeof this.props.match === 'undefined')
            this.props.onCreateCertification(this.props.certi)
        else
            this.props.updateCertficate(this.props.certi)
    }

    render() {
        var { certi } = this.props
        var listConverted = convertSkillList(this.props.hardSkillList)
        return (
          <div
            className="card"
            style={{
              marginTop: "50px",
            }}
          >
            <div className="card-header card-header-primary">
              <h4 className="card-title">
                {typeof this.props.match !== "undefined"
                  ? "Update Certificate"
                  : "Create New Certificate"}
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col">
                    <fieldset className="form-group">
                      <label
                        className={`bmd-label-${
                          typeof this.props.match !== "undefined"
                            ? "static"
                            : "floating"
                        }`}
                      >
                        Certificate
                      </label>
                      <input
                        type="text"
                        id="certificationName"
                        name="certificationName"
                        className="form-control"
                        value={certi.certificationName}
                        onChange={this.handleChange}
                      />
                    </fieldset>
                  </div>
                </div>
                <div className="row">
                  <div className="col-auto" style={{ marginTop: 15 }}>
                    <label className="bmd-label-floating">Skill</label>
                  </div>
                  <div
                    className="col-auto"
                    style={{ marginLeft: 30, marginTop: 10 }}
                  >
                    <SelectBar
                      name="hardSkillList"
                      type="common"
                      placeholder="Select skill"
                      list={listConverted}
                      value={certi.skillID}
                      onSelectSkill={this.onSelectSkill}
                    />
                  </div>
                  <div
                    className="col-auto"
                    style={{ marginLeft: 30, marginTop: 15 }}
                  >
                    <label className="bmd-label-floating">Level</label>
                  </div>
                  <div
                    className="col-auto"
                    style={{ marginLeft: 30, marginTop: 10 }}
                  >
                    <SelectBar
                      name="certiLevel"
                      type="common"
                      placeholder="Select level"
                      list={this.state.level}
                      onUpdateCerti={this.onSelectLevel}
                      value={certi.certiLevel}
                    />
                  </div>
                </div>
                <div className="row" style={{ marginTop: 10 }}>
                  <div className="col">
                    <fieldset className="form-group">
                      <label
                        className={`bmd-label-${
                          typeof this.props.match !== "undefined"
                            ? "static"
                            : "floating"
                        }`}
                      >
                        Description
                      </label>
                      <TextArea
                        type="textarea"
                        elastic
                        id="description"
                        name="description"
                        value={certi.description}
                        className="form-control"
                        autoSize={{ minRows: 3, maxRows: 20 }}
                        onChange={this.handleChange}
                      />
                    </fieldset>
                  </div>
                </div>
                <button
                  className="btn btn-primary pull-right"
                  onClick={this.onSubmit}
                >
                  {typeof this.props.match !== "undefined"
                    ? "Update"
                    : "Create"}
                </button>
              </form>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        certi: state.CertificationReducer,
        hardSkillList: state.HardSkillSelectBarReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        onGenerateCerti: () => {
            dispatch(generateCertification())
        },
        onUpdateCertiName: (name, value) => {
            dispatch(updateCertificationName(name, value))
        },
        onUpdateSkillID: (value) => {
            dispatch(updateSKillId(value))
        },
        onUpdateCertiLevel: (value) => {
            dispatch(updateCertiLevel(value))
        },
        onFetchHardSkill: () => {
            dispatch(fetchHardSkill())
        },
        onCreateCertification: (certificate) => {
            dispatch(createCertification(certificate))
        },
        fetchCertiDetail: (certiID) => {
            dispatch(fetchCertificationDetail(certiID))
        },
        updateCertficate: (certi) => {
            dispatch(updateCertificate(certi))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCertification);
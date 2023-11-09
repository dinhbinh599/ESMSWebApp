import TextArea from 'antd/lib/input/TextArea';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { createPosition, fetchPostionDetail, updatePosition } from '../../service/action/PositionSelectBarAction';

class CreatePosition extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posID: '',
            position: '',
            description: '',
            status: true,
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        if (typeof match !== 'undefined') {
            this.props.fetchPositionDetail(match.params.id)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.position !== prevState.position) {
            return { someState: nextProps.position };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.position !== this.props.position) {
            var { position } = this.props
            this.setState({
                posID: position.posID,
                position: position.name,
                description: position.description,
                status: position.status
            })
        }
    }

    handleChange = (e) => {
        var { name, value } = e.target;
        this.setState({ [name]: value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.position, this.state.description)
        if (typeof this.props.match === 'undefined')
            this.props.onCreatePosition({ name: this.state.position, description: this.state.description })
        else
            this.props.updatePosition(this.state.posID, { name: this.state.position, description: this.state.description })
    }

    render() {
        var { position, description } = this.state

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
                  ? "Update Position"
                  : "Create Position"}
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
                        Position
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        className="form-control"
                        value={position}
                        onChange={this.handleChange}
                      />
                    </fieldset>
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
                        row="5"
                        type="textarea"
                        id="description"
                        name="description"
                        className="form-control"
                        defaultValue={description}
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
        position: state.PositionFormReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        onCreatePosition: (position) => {
            dispatch(createPosition(position))
        },
        fetchPositionDetail: posID => {
            dispatch(fetchPostionDetail(posID))
        },
        updatePosition: (posID, position) => {
            dispatch(updatePosition(posID, position))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePosition);
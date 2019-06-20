import React from "react";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import {Link} from "react-router-dom";


class VerificationGenerator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      verification: { code: '', poolName: '', poolPublicId: '', info: '' },
      name: "",
      info: "",
      allowHtml: false,
      id: "",
      error: ""
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitForm(event) {
    this.post(this.state.name, this.state.info, this.state.allowHtml, this.state.id);
    event.preventDefault();
  }

  post(name, info, allowHtml, id) {
    API.post('/verification?id=' + id, {
      poolName: name,
      info: info,
      allowHtml: allowHtml
    }).then((res) => {
      this.setState({
        verification: res.data,
        name: "",
        info: "",
        allowHtml: false
      });
    }).catch((error) => {
      this.setState({
        error: error.response.data.message ? error.response.data.message : 'Error',
      });
    });
  }

  render() {
    let hasPool = this.state.verification.poolName ? true : false;

    return (
      <React.Fragment>
        <NavigationBar cn="verification" title="Verification - Create"/>

        <form onSubmit={event => this.handleSubmitForm(event)}>

          <label>Credit Name</label><br/>
          <input maxLength="128" className="form-control" type="text"
                 placeholder="optional" name="name" onChange={event => this.handleChange(event)}
          />
          <br/>
          <br/>
          <label>Info</label><br/>
          <input maxLength="128" className="form-control" type="text"
                 value={this.state.info}
                 placeholder="info" name="info" onChange={event => this.handleChange(event)}
          />
          <br/>
          <div>
            <label>HTML</label> &nbsp;
            F: <input type="radio" name="allowHtml" onChange={event => this.handleChange(event)} value="false"/>
            &nbsp; &nbsp;
            T: <input type="radio" name="allowHtml" onChange={event => this.handleChange(event)} value="true"/>
          </div>
          <br/>
          <label>ID</label><br/>
          <input maxLength="19" className="form-control" type="password"
                 placeholder="ID" name="id" onChange={event => this.handleChange(event)}
          />
          <br/>
          <div className="form-bar">
            <Link className="link cancel" to={'/'}>Cancel</Link>
            <input className="btn btn-primary submit" type="submit" value="Submit"/>
          </div>
        </form>

        <div className="error">{this.state.error}</div>

        <br/><br/><br/>
        <div style={{ padding: '15px 15px', border: 'dashed 1px #333' }}>
          { hasPool &&
          <div>
            <label>Credit</label> {this.state.verification.poolName}<br/>
            <label>Credit Public ID</label> {this.state.verification.poolPublicId}<br/>
          </div>
          }
          {this.state.verification.info}<br/><br/>
          <span style={{ fontSize: 'large' }}>{this.state.verification.code}</span><br/>
        </div>
        <br/>
        <div>
          <button className="btn btn-outline-secondary" onClick={() => {
            navigator.clipboard.writeText(this.state.verification.code)
          }}>copy
          </button>
        </div>


      </React.Fragment>
    );
  }
}

export default VerificationGenerator;

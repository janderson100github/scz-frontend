import React from "react";
import queryString from "query-string";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import {Link} from "react-router-dom";


class PoolDelete extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pool: { name: "" },
      editId: "",
      error: ""
    };
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    let editId = queryParams.editId ? queryParams.editId : "";
    this.setState({
      editId: editId
    });
    this.get(this.props.match.params.name);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitForm(event) {
    this.delete(this.state.pool.name, this.state.editId);
    event.preventDefault();
  }

  get(name) {
    API.get('/pool/' + name, {}).then((res) => {
      let editId = this.state.pool.editId;
      this.setState({
        pool: { ...res.data },
        error: ""
      });
    }).catch((error) => {
      this.setState({
        error: "Error: Credit Name",
      });
    });
  }

  delete(name, editId) {
    API.delete('/pool', {
      headers: { "Content-Type": "application/json" },
      data: { editId: editId, name: name }
    }).then((res) => {
      this.props.history.push('/credit/deleted/' + name);
    }).catch((error) => {
      this.setState({
        error: "Error: Name & Edit ID"
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar cn="pool" title="Credit - Delete"/>
        
        <form onSubmit={event => this.handleSubmitForm(event)}>
          {this.state.pool.name}<br/><br/>
          <div className="description">{this.state.pool.description}</div>
          <br/>
          <label>Edit ID</label><br/>
          <input maxLength="19" className="form-control" type="text" defaultValue={this.state.editId}
                 placeholder="Edit ID" name="editId" onChange={event => this.handleChange(event)}
          />
          <br/>
          <div className="form-bar">
            <Link className="link cancel" to={'/credit/view/' + this.state.pool.name}>Cancel</Link>
            <input className="btn btn-primary submit" type="submit" value="Delete Credit"/>
          </div>
        </form>

        <div className="error">{this.state.error}</div>

      </React.Fragment>

    );
  }
}

export default PoolDelete;

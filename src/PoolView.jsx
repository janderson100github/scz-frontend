import React from "react";
import queryString from "query-string";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";
import Pool from "./Pool";

class PoolView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pool: {},
      editId: null,
      error: null
    };
  }

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    this.state.editId = queryParams.editId;
    this.get(this.props.match.params.name);
  }

  get(name) {
    API.get('/pool/' + name, {}).then((res) => {
      this.setState({
        pool: res.data
      });
    }).catch((error) => {
      this.setState({ error: error.response && error.response.data.message ? error.response.data.message : 'Error' });
    });
  }

  render() {
    const pool = this.state.pool;
    const editId = this.state.editId;

    return (
      <React.Fragment>
        <NavigationBar cn="pool" title="Credit - View"/>

        <Pool pool={pool} editId={editId} error={this.state.error}/>

      </React.Fragment>

    );
  }
}

export default PoolView;

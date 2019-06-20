import React from "react";
import API from "./utils/API";
import NavigationBar from "./NavigationBar";

class TransferView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      transfer: {},
      transactionId: null,
      fromAccountPublicId: null,
      toAccountPublicId: null,
      error: null
    };
  }

  componentDidMount() {
    this.get(this.props.match.params.transactionId);
  }

  get(transactionId) {
    API.get('/transfer/' + transactionId, {}).then((res) => {
      this.setState({
        transfer: res.data
      });
    }).catch((error) => {
      error: error.response.data.message ? error.response.data.message : 'Error'
    });
  }

  render() {
    const transfer = this.state.transfer;
    const editId = this.state.editId;
    const poolName = transfer && transfer.pool ? transfer.pool.name : "";

    return (
      <React.Fragment>
        <NavigationBar cn="transfer" title="Transfer - View"/>

        <div><label>Transaction ID</label><span className="value">{transfer.transactionId}</span></div>
        <div><label>Credit</label><span className="value">{poolName}</span></div>
        <div><label>Amount</label><span className="value">{transfer.amount}</span></div>
        <div className="description">{transfer.message}</div>

      </React.Fragment>

    );
  }
}

export default TransferView;

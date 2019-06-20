import React from "react";
import {Link, withRouter} from "react-router-dom";
import Modal from "react-modal";
import API from "./utils/API";

const customStyles = {
  content: {
    top: '33%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class AccountEditModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      editId: "",
      publicId: "",
      error: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitForm(event) {
    this.setState({ error: "" });
    this.get(this.state.publicId);
    event.preventDefault();
  }

  openModal() {
    this.setState({ error: "", modalIsOpen: true });
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  get(publicId) {
    API.get('/account/' + publicId, {}).then((res) => {
      this.setState({ modalIsOpen: false });
      let url = '/account/edit/' + this.state.publicId + '?editId=' + this.state.editId;
      this.props.history.push(url);
    }).catch((error) => {
      this.setState({ error: "Error" });
    });
  }

  render() {
    const Button = withRouter(({ history }) => (
      <button
        style={{ float: 'right' }}
        className="btn btn-primary submit"
        type='button'
        onClick={event => this.handleSubmitForm(event)}
      >
        Submit
      </button>
    ));

    return (
      <div>
        <span className="clickable" onClick={this.openModal}>
          <i className="far fa-edit cicon"/>
          <span className="account">Edit</span>
        </span>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <form onSubmit={event => this.handleSubmitForm(event)}>
            <div className="form-group">
              <input maxLength="19" className="form-control" type="text" defaultValue={this.state.publicId}
                     placeholder="Public ID" name="publicId" onChange={event => this.handleChange(event)}
                     onKeyPress={event => {
                       if (event.key === "Enter") {
                         this.handleSubmitForm(event);
                       }
                     }}
              />
            </div>
            <div className="form-group">
              <input maxLength="19" className="form-control" type="text" defaultValue={this.state.editId}
                     placeholder="Edit ID" name="editId" onChange={event => this.handleChange(event)}
                     onKeyPress={event => {
                       if (event.key === "Enter") {
                         this.handleSubmitForm(event);
                       }
                     }}
              />
            </div>

            <br/>
            <div className="form-bar">
              <button className="btn btn-outline-secondary" onClick={this.closeModal}>Cancel</button>
              <Button />
            </div>
          </form>
          <br/><br/>
          <div className="error">{this.state.error}</div>
        </Modal>
      </div>

    );
  }
}

export default AccountEditModal;

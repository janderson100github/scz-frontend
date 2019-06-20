import React from "react";
import {Link, withRouter} from "react-router-dom";
import Modal from "react-modal";
import Item from "./Item";

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

class ItemInfoModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      item: {},
      error: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ error: "", modalIsOpen: true });
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const item = this.props.item;
    const showPrivateInfo = this.props.accountEditId ? true : false;
    const pool = item.pool;
    const description = pool.description ? pool.description.substring(0, Math.min(200, pool.description.length)) : '';

    return (
      <React.Fragment>
        <i className="fas fa-info cicon clickable" onClick={this.openModal}></i>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Info"
        >
          <Item item={item} pool={pool} modal="true" showPrivateInfo={showPrivateInfo}/>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ItemInfoModal;

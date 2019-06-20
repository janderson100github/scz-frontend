import React, {Component} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";

const render = (elementId) => {
  ReactDOM.render(
    React.createElement(App, {}),
    document.getElementById(elementId)
  );
};

const init = elementId => {
  render(elementId);
};

Modal.setAppElement('#react-app-container')

export default init;

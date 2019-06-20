import React from "react";
import {Link, withRouter} from "react-router-dom";

class Social extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const url = window.location.href;
    const showSocial = !url.toString().includes('pool/create');
    let title = this.props.title ? this.props.title : 'Social Credit Zone';

    return (
      <React.Fragment>
        { showSocial &&
        <div className="social">
          <a href={'https://www.facebook.com/sharer/sharer.php?u=' + url}>
            <i className="fab fa-facebook clickable"></i>
          </a>
          &nbsp; &nbsp;
          <a href={'https://twitter.com/home?status=' + url}>
            <i className="fab fa-twitter-square clickable"></i>
          </a>
          &nbsp; &nbsp;
          <a
            href={'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&summary=&source='}>
            <i className="fab fa-linkedin clickable"></i>
          </a>
        </div>
        }
      </React.Fragment>

    );
  }
}

export default Social;

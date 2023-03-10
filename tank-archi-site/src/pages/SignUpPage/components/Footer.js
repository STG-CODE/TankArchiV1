import React from "react";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <div className="Container">
        <br/>
        <button>
          <Link to="/MainPage">Create Account</Link>
        </button>
        <br/>
        <button>
          <Link to="/">Back To Login Page</Link>
        </button>
        <br/>
    </div>
  );
}

export default Footer;
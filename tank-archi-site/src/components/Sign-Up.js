import React from "react";
import {Link} from "react-router-dom";

function SignUp() {
  return (
    <div className="Container">
      <div>
        <h3>Sign Up Here!</h3>
      </div>
      <br/>
      <div>
        <h4>If You Want To Make An Account Then Click Here</h4>
      </div>
      <br/>
      <div>
        <button>
          <Link to={"/SignUpPage"}>Sign Up</Link>
        </button>
      </div>
      <br/>
    </div>
  );
}

export default SignUp;
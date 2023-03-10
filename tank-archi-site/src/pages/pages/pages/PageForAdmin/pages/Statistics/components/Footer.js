import React from "react";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className="Container">
            <div>
                <button>
                    <Link to="/MainPage/Admin">Go Back</Link>
                </button>
            </div>
        </div>
    );
}
export default Footer;
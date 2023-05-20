//basic import
import React from "react";
//TODO: create a hover window on the filter button that will show the filter options or create a window that filters.

function Rankings() {
  return (
    <div className="Container">
      <h5>Filter & Search :</h5>
      <div>
        <h6>Select The Desired Filter Options :</h6>
        <label>
            <input type="checkbox"></input>
        </label>
        <label>
            <input type="checkbox"></input>
        </label>
        <label>
            <input type="checkbox"></input>
        </label>
        <label>
            <input type="checkbox"></input>
        </label>
        <button>Filter</button>
      </div>
      <div>
        <h6>Enter Tank Name :</h6>
        <input type="text"></input>
        <button>Search</button>
      </div>
    </div>
  );
}

export default Rankings;
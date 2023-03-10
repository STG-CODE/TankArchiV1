//
import React from "react";

//
import Text from "../../Shared/components/Visual-Elements/Text";
import Card from "../../Shared/components/UI-Elements/Card";
import Button from "../../Shared/components/Form-Elements/Button";
//
import SearchResults from "./components/SearchResults";


function TankSearch() {
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h1" value="Tank Search Tab!:" />
        <Card>
          <Text element="h3" value="Our Tank Search Engine:" />
          <Card>
            <Text element="h4" value="Search Bar :" />
            <Text value="Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip."></Text>
            <input type="search" placeholder="Enter Tank Name"></input>
            <Card>
              <Text element="h4" value="The Search Filter Window:"/>
              <label>
                First Checkbox<input type="checkbox"></input>
              </label>
              <label>
                Second Checkbox<input type="checkbox"></input>
              </label>
              <label>
                Third Checkbox<input type="checkbox"></input>
              </label>
              <label>
                Forth Checkbox<input type="checkbox"></input>
              </label>
              <label>
                Fifth Checkbox<input type="checkbox"></input>
              </label>
              <label>
                Sixth Checkbox<input type="checkbox"></input>
              </label>
              <Button>Filter Results</Button>
            </Card>
            <Button>Search</Button>
          </Card>
          <Card>
            <SearchResults />
          </Card>
          <Button to="/MainPage">Go Back</Button>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default TankSearch;

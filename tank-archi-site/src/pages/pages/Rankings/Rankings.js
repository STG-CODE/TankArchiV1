//
import React from "react";

//
import Text from "../../Shared/components/Visual-Elements/Text";
import Card from "../../Shared/components/UI-Elements/Card";

//
import SearchAndFilter from "./components/SearchAndFilter";
import RankingsTable from "./components/RankingsTable";


//Component Contents :

//TODO : need to link both imported components so that they can communicate and respond to each other

function Rankings() {
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h1" value="Rankings Tab!:" />
        <Card>
          <Text element="h3" value="The Top Tank Rankings:"/>
          <Card>
            <SearchAndFilter />
          </Card>
          <Card>
            <RankingsTable />
          </Card>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Rankings;

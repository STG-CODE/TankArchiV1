import React, { useState, useEffect } from "react";
//
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
import { useParams, useHistory } from "react-router-dom";
//
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../../../../Shared/components/Visual-Elements/Text";
import Card from "../../../../../../../../Shared/components/UI-Elements/Card";
import Avatar from "../../../../../../../../Shared/components/UI-Elements/Avatar";

function ReviewTankBody() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedTank, setLoadedTank] = useState();
  const tankId = useParams().tankId;
  const history = useHistory();

  useEffect(() => {
    const fetchTank = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/EditTank/${tankId}`
        );
        setLoadedTank(responseData.tank);
      } catch (err) {}
    };
    console.log("Fetching The Tank!");
    fetchTank();
    console.log("Done Fetching The Tank!");
  }, [sendRequest, setLoadedTank]);

  //!create buttons for the possible options that the admin has!//

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedTank && (
        <div className="Container">
          <Card>
            <Text label="Tank's Upload Date:" value={loadedTank.uploadDate} />
            <Text
              label="Tank Last Updated:"
              value={loadedTank.lastUpdated || "- Was Not Updated Yet -"}
            />
            <Card>
              <Avatar
                image={loadedTank.tankImagePfp}
                alt={"- Missing Tank Pfp -"}
                style={{ width: "100px", hight: "50px" }}
              />
            </Card>
            <Card>
              <Text
                label="Tank's Name:"
                element="text"
                value={loadedTank.tankName}
              />
              <Text label="Nation:" element="text" value={loadedTank.nation} />
              <Text
                label="Combat Role:"
                element="text"
                value={loadedTank.combatRole}
              />
              <Text
                label="Related Era:"
                element="text"
                value={loadedTank.era}
              />
              <Text label="Tank's Age:" element="text" value={loadedTank.age} />
              <Text
                label="Start Of Service Year:"
                element="text"
                value={loadedTank.servicePeriod.startDate}
              />
              <Text
                label="End Of Service Year:"
                element="text"
                value={loadedTank.servicePeriod.endDate}
              />
              <Text
                label="Tank's History In General:"
                element="textarea"
                value={loadedTank.tankHistory}
              />
              <Text
                label="Tank's Service History:"
                element="textarea"
                value={loadedTank.tankServiceHistory}
              />
              <Text
                label="Tank's Production History:"
                element="textarea"
                value={loadedTank.tankProductionHistory}
              />
              <Text
                label="Tank's Armament And Armour:"
                element="textarea"
                value={loadedTank.tankArmamentAndArmour}
              />
              <Text
                label="Amount Of DataBase Tank Photos:"
                value={loadedTank.photoCollection.length || "0"}
              />
            </Card>
          </Card>
          <div>
            <Button to="/MainPage/Admin/TanksDatabase">Go Back</Button>
            <Button to="/MainPage/Admin/TanksDatabase/EditTank">Edit Tank</Button>
            <Button to="/MainPage/Admin/TanksDatabase">Delete</Button>
            <Button to="/MainPage/Admin/TanksDatabase">Go To Tank</Button>
          </div>
        </div>
      )}
      {!isLoading && !error && !loadedTank && (
        <div>
          <h2>Could Not Find Tank Details For Review!</h2>
        </div>
      )}
    </React.Fragment>
  );
}
export default ReviewTankBody;

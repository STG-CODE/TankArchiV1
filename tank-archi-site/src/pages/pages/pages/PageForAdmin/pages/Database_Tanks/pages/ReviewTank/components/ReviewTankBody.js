//basic imports
import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
//hook import
import { useHttpClient } from "../../../../../../../../Shared/Hooks/http-hook";
//component imports
import Button from "../../../../../../../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../../../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../../../../../../Shared/components/Visual-Elements/Text";
import Card from "../../../../../../../../Shared/components/UI-Elements/Card";
import Image from "../../../../../../../../Shared/components/Visual-Elements/Image";
import TankPhotosContainer from "../../../../../../../../Shared/components/Extra-Elements/TankPhotosContainer";
//context import
import { LoginContext } from "../../../../../../../../Shared/Context/login-context";

function ReviewTankBody() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded tank state
  const [loadedTank, setLoadedTank] = useState();
  //extraction of the tank id from the url
  const tankId = useParams().tankId;
  //the "useHistory" variable
  const history = useHistory();

  //useEffect - gets us the desired tank for reviewing
  useEffect(() => {
    const fetchTank = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/EditTank/${tankId}`,
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setLoadedTank(responseData.tank);
      } catch (err) {}
    };
    console.log("Fetching The Tank!");
    fetchTank();
    console.log("Done Fetching The Tank!");
  },[sendRequest, setLoadedTank]);

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
            <Text element="text" value="Tank's Current Profile Picture:"/>
            <Image
              image={`http://localhost:5000/${loadedTank.tankImagePfp}`}
              alt={"- No Tank Profile Picture Found -"}
              style={{width:"25%", hight:"20%"}}
            />
            <Text label="Tank's Upload Date:" value={loadedTank.uploadDate} />
            <Text
              label="Tank Last Updated:"
              value={loadedTank.lastUpdated || "- Was Not Updated Yet -"}
            />
            
            <Card>
              <Text
                label="Tank's Name:"
                element="text"
                value={loadedTank.tankName}
              />
              <Text
               label="Nation:" 
               element="text" 
               value={loadedTank.nation} 
              />
              <Text
               label="User Nations:" 
               element="text" 
               value={loadedTank.userNations} 
              />
              <Text
                label="Combat Role:"
                element="text"
                value={loadedTank.combatRole}
              />
              <Text
               label="Service States:" 
               element="text" 
               value={loadedTank.serviceStates} 
              />
              <Text
               label="Generation:" 
               element="text" 
               value={loadedTank.generation} 
              />
              <Text
                label="Related Era:"
                element="text"
                value={loadedTank.era}
              />
              <Text
               label="Tank's Age:" 
               element="text" 
               value={loadedTank.age} 
              />
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
                label="Tank's Service States Information:"
                element="textarea"
                value={loadedTank.tankServiceStatesInfo}
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
          <Card>
            <TankPhotosContainer tankPhotoCollection={loadedTank.photoCollection}/>
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

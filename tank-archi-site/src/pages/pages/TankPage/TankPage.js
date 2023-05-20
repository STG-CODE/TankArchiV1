//basic imports
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
//hook import
import { useHttpClient } from "../../Shared/Hooks/http-hook";
//context import
import { LoginContext } from "../../Shared/Context/login-context";
//component imports
import TankBio from "./components/TankBio";
import RecommendationWindow from "./components/RecommendationWindow";
import TankBasicInfo from "./components/TankBasicInfo";
//
import TankPhotosContainer from "../../Shared/components/Extra-Elements/TankPhotosContainer";
import Text from "../../Shared/components/Visual-Elements/Text";
import Card from "../../Shared/components/UI-Elements/Card";
import Button from "../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../Shared/components/UI-Elements/LoadingSpinner";
import Image from "../../Shared/components/Visual-Elements/Image";
import TankRating from "../../Shared/components/UI-Elements/TankRating";
import TankLikeButton from "../../Shared/components/UI-Elements/TankLikeButton";
import AddToFavButton from "../../Shared/components/UI-Elements/AddToFavButton";
//TODO :

function TankPage() {
  //login context 
  const loginContext = useContext(LoginContext);
  //saves the user suggestion count
  const currentSuggestionCount = loginContext.currentUser.submittedSuggestions.length;
  //is the user's suggestion count past the limit
  const isLimit = currentSuggestionCount < 3 ? true : false;
  
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded tank state
  const [loadedTank, setLoadedTank] = useState();
  //extraction of the tank's id from the URL
  const tankId = useParams().tankId;
  //!
  const history = useHistory();

  //brings us the tank that has the same ID
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchTank();
  },[sendRequest,setLoadedTank, tankId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} to="/MainPage"/>
      {isLoading && (
        <div>
          <LoadingSpinner/>
        </div>
      )}
      {!loginContext.isAdmin && !isLoading && loadedTank && (
        <div>
        <Text element="h1" value={`The ${loadedTank.tankName} Tank`} />
        <Card>
          <Card>
            <Image
              image={`http://localhost:5000/${loadedTank.tankImagePfp}`}
              alt={"http://localhost:5000/uploads/stockImages/tankStockIcon.jpg"}
              style={{width:"100px", hight:"50px"}}
            />
            <TankBasicInfo tank={loadedTank}/>
          </Card>
          <Card>
            <Button to="/MainPage">Go Back</Button>
            {!isLimit && (
              <Button disabled={true}>
                Submit A Suggestion Here
             </Button>
            )}
            {isLimit && (
              <Button to="/MainPage/User/SubmitSuggestion">
                Submit A Suggestion Here
              </Button>
            )}
            <TankRating isAdmin={false} rating={loadedTank.avgRating}/>//!change so that we enter the values here instead of in the component it self
            //?needs to be intractable for rating the tank
            <TankLikeButton isAdmin={false}/>
            <AddToFavButton isAdmin={false}/>
          </Card>
          <Card>
            <Text element="text" value={`${loadedTank.tankName}'s Photo Gallery:`}></Text>
            <TankPhotosContainer tankPhotoCollection={loadedTank.photoCollection}/>
          </Card>
          <Card>
            <TankBio
             name={loadedTank.tankName} 
             history={loadedTank.tankHistory}
             service={loadedTank.tankServiceHistory}
             serviceState={loadedTank.tankServiceStatesInfo}
             production={loadedTank.tankProductionHistory}
             armsAndArmour={loadedTank.tankArmamentAndArmour}
            />
          </Card>
          <Card>
            <RecommendationWindow currentTank={tankId}/>
          </Card>
          <Button to="/MainPage">Go Back</Button>
        </Card>
      </div>
      )}
      {loginContext.isAdmin && !isLoading && loadedTank && (
        <div>
        <Text element="h1" value={`The ${loadedTank.tankName} Tank`} />
        <Card>
          <Card>
            <Image
              image={`http://localhost:5000/${loadedTank.tankImagePfp}`}
              alt={"http://localhost:5000/uploads/stockImages/tankStockIcon.jpg"}
              style={{width:"100px", hight:"50px"}}
            />
            <TankBasicInfo tank={loadedTank}/>
          </Card>
          <Card>
            <Button to="/MainPage">Go Back</Button>
            <Button disabled={true}>
              Submit A Suggestion Here
            </Button>
            <TankRating isAdmin={true} rating={loadedTank.avgRating}/>//!change so that we enter the values here instead of in the component it self
            //?needs to be intractable for rating the tank
            <TankLikeButton isAdmin={true}/>
            <AddToFavButton isAdmin={true}/>
          </Card>
          <Card>
            <Text element="text" value={`${loadedTank.tankName}'s Photo Gallery:`}></Text>
            <TankPhotosContainer tankPhotoCollection={loadedTank.photoCollection}/>
          </Card>
          <Card>
            <TankBio
             name={loadedTank.tankName} 
             history={loadedTank.tankHistory}
             service={loadedTank.tankServiceHistory}
             serviceState={loadedTank.tankServiceStatesInfo}
             production={loadedTank.tankProductionHistory}
             armsAndArmour={loadedTank.tankArmamentAndArmour}
            />
          </Card>
          <Card>
            <RecommendationWindow currentTank={tankId}/>
          </Card>
          <Button to="/MainPage">Go Back</Button>
        </Card>
      </div>
      )}
      {!isLoading && !error && !loadedTank && (
        <div>
          <Text element="h1" value="Could Not Find Tank!"/>
        </div>
      )}
      
    </React.Fragment>
  );
}

export default TankPage;

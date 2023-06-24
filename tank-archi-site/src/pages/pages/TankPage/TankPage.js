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
//Material UI imports
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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

  // //TODO: need to set it so that the handlers update both database users and tanks and currently loaded tanks and users as well
  // const AddToFavoritesButtonHandler = async () => {
  //   //add req for handling both clicks and also add changes on inner side of the front end
  //   try {
  //     const formData = new FormData();
  //     formData.append('tankId',tankId);
  //     await sendRequest(
  //       `http://localhost:5000/MainPage/User/AddTankToFavList/${loginContext.currentUser.id}`,
  //       "POST",
  //       formData,
  //       {Authorization: "Bearer " + loginContext.token}
  //     );
  //     loginContext.currentUser.favTanksList.push(tankId);
  //   } catch (err) { 
  //     console.log("Failed To Add To Fav List", err); 
  //   }
  // };

  // const RemoveFromFavoritesButtonHandler = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('tankId',tankId);
  //     await sendRequest(
  //       `http://localhost:5000/MainPage/User/RemoveTankFromFavList/${loginContext.currentUser.id}`,
  //       "DELETE",
  //       formData,
  //       {Authorization: "Bearer " + loginContext.token}
  //     );
  //     loginContext.currentUser.favTanksList.remove(tankId);
  //   } catch (err) { 
  //     console.log("Failed To Add To Fav List", err); 
  //   }
  // };

  // const AddLikeButtonHandler = async () => {
  //   try {
  //     try {
  //       await sendRequest(
  //         `http://localhost:5000/MainPage/User/AddLikedTank/${loginContext.currentUser.id}`,
  //         "POST",
  //         JSON.stringify({
  //           tankId: tankId,
  //         }),
  //         {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + loginContext.token
  //         }
  //       );
  //       loginContext.currentUser.likedTanksList.push(tankId);
  //     } catch (err) {
  //       console.log(err);
  //     }
      
  //     try {
  //       await sendRequest(
  //         `http://localhost:5000/MainPage/Admin/TanksDatabase/AddTankLike/${tankId}`,
  //         "POST",
  //         null,
  //         {Authorization: "Bearer " + loginContext.token}
  //       );
  //       loadedTank.likeVoteCount = loadedTank.likeVoteCount + 1;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } catch (err) {
  //     console.log("Failed To Add A Liked Tank",)
  //   }
  // };

  // const RemoveLikeButtonHandler = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('tankId',tankId);
  //     await sendRequest(
  //       `http://localhost:5000/MainPage/User/RemoveLikedTank/${loginContext.currentUser.id}`,
  //       "DELETE",
  //       formData,
  //       {Authorization: "Bearer " + loginContext.token}
  //     );
  //     loginContext.currentUser.likedTanksList.remove(tankId);
  //     await sendRequest(
  //       `http://localhost:5000/Admin/TanksDatabase/RemoveTankLike/${tankId}`,
  //       "DELETE",
  //       null,
  //       {Authorization: "Bearer " + loginContext.token}
  //     );
  //     loadedTank.likeVoteCount -= 1;
  //   } catch (err) {
  //     console.log("Failed To Remove A Liked Tank", err);
  //   }
  // };

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

  //!change so that we enter the values here instead of in the component it self
  //?needs to be intractable for rating the tank
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
        <Card>
          <Grid2 container spacing={1}>
            <Grid2 xs={12}>
              <Card>
                <Image
                  image={`http://localhost:5000/${loadedTank.tankImagePfp}`}
                  alt={"http://localhost:5000/uploads/stockImages/tankStockIcon.jpg"}
                  style={{width:"100%", hight:"70%"}}
                />
              </Card>
            </Grid2>
            <Grid2 xs={4}>
              <Card>
                <Text element="h1" value={`The ${loadedTank.tankName}`} />
                <TankRating text={`Choose To Rate The ${loadedTank.tankName}:`} isAdmin={false} rating={loadedTank.avgRating}/>
              </Card>
            </Grid2>
            <Grid2 xs={8}>
              <Card>
                <Grid2 xs={12} container spacing={1}>
                  <Grid2>
                    <Button to="/MainPage">Go Back</Button>
                  </Grid2>
                  <Grid2>
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
                  </Grid2>
                  <Grid2>
                    {/* {!isLoading && !loginContext.currentUser.favTanksList.includes(tankId) && ( */}
                      <Button>
                          <Grid2 container>
                            Add To Favorite
                          <FavoriteBorderIcon/>
                        </Grid2>
                      </Button>
                    {/* )} */}
                    {/* {!isLoading && loginContext.currentUser.favTanksList.includes(tankId) && (
                      <Button onClick={RemoveFromFavoritesButtonHandler}>
                        <Grid2 container>
                          Add To Favorite
                          <FavoriteBorderIcon/>
                        </Grid2>
                      </Button>
                    )}
                    {isLoading && (
                      <Button disabled>
                        <Grid2 container>
                          Add To Favorite
                          <FavoriteBorderIcon/>
                        </Grid2>
                      </Button>
                    )}
                     */}
                    {/* <AddToFavButton isAdmin={false}/> */}
                  </Grid2>
                  <Grid2>
                    {/* {!isLoading && !loginContext.currentUser.likedTanksList.includes(tankId) && ( */}
                      <Button>
                        <Grid2 container>
                          Like +1
                          <ThumbUpOffAltIcon/>
                        </Grid2>
                      </Button>
                    {/* )} */}
                    {/* {!isLoading && loginContext.currentUser.likedTanksList.includes(tankId) && (
                      <Button onClick={RemoveLikeButtonHandler}>
                        <Grid2 container>
                          Like +1
                          <ThumbUpIcon/>
                        </Grid2>
                      </Button>
                    )}
                    {isLoading && (
                      <Button disabled>
                        <Grid2 container>
                          Like +1
                          <ThumbUpIcon/>
                        </Grid2>
                      </Button>
                    )} */}
                    {/* <TankLikeButton isAdmin={false}/> */}
                  </Grid2>
                </Grid2>
              </Card>
            </Grid2>
            <Grid2 xs={8}>
              <Card>
                <TankBasicInfo tank={loadedTank}/>
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
            </Grid2>
            <Grid2 xs={4}>
              <Card>
                <Text element="text" value={`${loadedTank.tankName}'s Photo Gallery:`}></Text>
                <TankPhotosContainer tankPhotoCollection={loadedTank.photoCollection}/>
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              <Card>
                <RecommendationWindow currentTank={tankId}/>
              </Card>
            </Grid2>
          </Grid2>
          <Button to="/MainPage">Go Back</Button>
        </Card>
      </div>
      )}
      {loginContext.isAdmin && !isLoading && loadedTank && (
        <div>
          <Card>
          <Grid2 container spacing={1}>
            <Grid2 xs={12}>
              <Card>
                <Image
                  image={`http://localhost:5000/${loadedTank.tankImagePfp}`}
                  alt={"http://localhost:5000/uploads/stockImages/tankStockIcon.jpg"}
                  style={{width:"100%", hight:"70%"}}
                />
              </Card>
            </Grid2>
            <Grid2 xs={4}>
              <Card>
                <Text element="h1" value={`The ${loadedTank.tankName}`} />
                <TankRating text={`Choose To Rate The ${loadedTank.tankName}:`} isAdmin={true} rating={loadedTank.avgRating}/>
              </Card>
            </Grid2>
            <Grid2 xs={8}>
              <Card>
                <Grid2 xs={12} container spacing={1}>
                  <Grid2>
                    <Button to="/MainPage">Go Back</Button>
                  </Grid2>
                  <Grid2>
                    <Button to="/MainPage/Admin/TanksDatabase">Tank Database</Button>
                  </Grid2>
                  <Grid2>
                    <Button to={`/MainPage/Admin/TanksDatabase/EditTank/${loadedTank.id}`}>Edit {loadedTank.tankName}</Button>
                  </Grid2>
                  <Grid2>
                    <Button to={`/MainPage/Admin/TanksDatabase/ReviewTank/${loadedTank.id}`}>Review {loadedTank.tankName}</Button>
                  </Grid2>
                  <Grid2>
                    <Button disabled={true}>
                      Submit A Suggestion Here
                    </Button>
                  </Grid2>
                  <Grid2>
                    <AddToFavButton isAdmin={true}/>
                  </Grid2>
                  <Grid2>
                    <TankLikeButton isAdmin={true}/>
                  </Grid2>
                </Grid2>
              </Card>
            </Grid2>
            <Grid2 xs={8}>
              <Card>
                <TankBasicInfo tank={loadedTank}/>
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
            </Grid2>
            <Grid2 xs={4}>
              <Card>
                <Text element="text" value={`${loadedTank.tankName}'s Photo Gallery:`}></Text>
                <TankPhotosContainer tankPhotoCollection={loadedTank.photoCollection}/>
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              <Card>
                <RecommendationWindow currentTank={tankId}/>
              </Card>
            </Grid2>
          </Grid2>
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

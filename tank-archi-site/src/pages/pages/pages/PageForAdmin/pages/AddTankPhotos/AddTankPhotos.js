//basic imports
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
//hook imports
import { useHttpClient } from "../../../../../Shared/Hooks/http-hook";
import { useForm } from "../../../../../Shared/Hooks/form-hook";
//component imports
import Button from "../../../../../Shared/components/Form-Elements/Button";
import ImageUpload from "../../../../../Shared/components/Form-Elements/ImageUpload";
import Card from "../../../../../Shared/components/UI-Elements/Card";
import Text from "../../../../../Shared/components/Visual-Elements/Text";
import ErrorModal from "../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../Shared/components/UI-Elements/LoadingSpinner";
//context import
import { LoginContext } from "../../../../../Shared/Context/login-context";
//Material UI import
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

//TODO: Add boxes for dragging and adding pics to the specified tank!

function AddTankPhotos() {
  //login context
  const loginContext = useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded tank state
  const [loadedTank, setLoadedTank] = useState();
  //extraction of the tank id from the url
  const tankId = useParams().tankId;
  //declaration of "useHistory"
  const pages = useHistory();

  //form's initial state
  const [formState, inputHandler, setFormData] = useForm(
    {
      slot1: {
        value: null,
        isValid: false,
      },
      slot2: {
        value: null,
        isValid: false,
      },
      slot3: {
        value: null,
        isValid: false,
      },
      slot4: {
        value: null,
        isValid: false,
      },
      slot5: {
        value: null,
        isValid: false,
      },
      slot6: {
        value: null,
        isValid: false,
      },
      slot7: {
        value: null,
        isValid: false,
      },
      slot8: {
        value: null,
        isValid: false,
      },
      slot9: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  //useEffect - fetches tank and also sets the form to its updated state
  useEffect(() => {
    const fetchTank = async () => {
      console.log(`Fetching Tank By ID = ${tankId}.`);
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/EditTank/${tankId}`,
          "GET",
          null,
          {Authorization: "Bearer " + loginContext.token}
        );
        setLoadedTank(responseData.tank);
        setFormData(
          {
            slot1: {
              value: null,
              isValid: false,
            },
            slot2: {
              value: null,
              isValid: false,
            },
            slot3: {
              value: null,
              isValid: false,
            },
            slot4: {
              value: null,
              isValid: false,
            },
            slot5: {
              value: null,
              isValid: false,
            },
            slot6: {
              value: null,
              isValid: false,
            },
            slot7: {
              value: null,
              isValid: false,
            },
            slot8: {
              value: null,
              isValid: false,
            },
            slot9: {
              value: null,
              isValid: false,
            },
          },
          true
        );
      } catch (err) {
        console.log(`Failed To Fetch Tank By ID = ${tankId}`);
        // pages.push("/MainPage/Admin")
      }
    };
    fetchTank();
  }, [sendRequest, setLoadedTank]);

  //handles the photos that the admin submitted and sends them to the backend for processing
  const adminPhotosUploadHandler = async (event) => {
    event.preventDefault();
    try {      
      console.log("Current Tank Image From Tank Photo Set = " + formState.inputs.slot1.value);
      const formData = new FormData();
      console.log(" - Appended Files - ")
      formData.append("tankPhotoSet", formState.inputs.slot1.value);
      formData.append("tankPhotoSet", formState.inputs.slot2.value);
      formData.append("tankPhotoSet", formState.inputs.slot3.value);
      formData.append("tankPhotoSet", formState.inputs.slot4.value);
      formData.append("tankPhotoSet", formState.inputs.slot5.value);
      formData.append("tankPhotoSet", formState.inputs.slot6.value);
      formData.append("tankPhotoSet", formState.inputs.slot7.value);
      formData.append("tankPhotoSet", formState.inputs.slot8.value);
      formData.append("tankPhotoSet", formState.inputs.slot9.value);
      formData.getAll("tankPhotoSet")
      console.log("Current Form Data = " + formData.getAll("tankPhotoSet"));
      await sendRequest(
        `http://localhost:5000/MainPage/Admin/TanksDatabase/UpdateTankPhotos/${tankId}`,
        "PATCH",
        formData,
        {Authorization: "Bearer " + loginContext.token}
      );
      pages.push("/MainPage/Admin");
    } catch (err) {
      console.log("Problem Detected With Uploading New Tank Photos!");
    }
  };
  
  return (
    <React.Fragment>
      <div className="Container">
        <Card>
          <ErrorModal error={error} onClick={clearError} to="/MainPage/Admin"/>
          {isLoading && (
            <div>
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && loadedTank && (
            <React.Fragment>
              <Grid2 container spacing={1}>
                <Grid2 xs={6}>
                  <Text element="h1" value={`${loadedTank.tankName} Photos Upload Page:`}/>
                </Grid2>
                <Grid2 xs={6}>
                  <Text element="h1" value={`[Tank ID : ${tankId}]`} />
                </Grid2>
                  <Grid2 xs={12}>
                    <form onSubmit={adminPhotosUploadHandler}>
                    <Card>
                      <Grid2 xs={12}>
                        <Text
                        element="h2" 
                        value={`Please Place Photos For The Selected ${loadedTank.tankName} Below:`}
                        />
                      </Grid2>
                      <Grid2 xs={12}>
                        <Card>
                          <Grid2 container xs={12}>
                            <Grid2 xs={4}>
                              <ImageUpload
                                  id="slot1"
                                  onInput={inputHandler}
                                  errorText="Please Pick A Photo For Slot 1."
                                  placeholder="Slot 1"
                                />
                              </Grid2>
                              <Grid2 xs={4}>
                                <ImageUpload
                                  id="slot2"
                                  onInput={inputHandler}
                                  errorText="Please Pick A Photo For Slot 2."
                                  placeholder="Slot 2"
                                />
                              </Grid2>
                              <Grid2 xs={4}>
                                <ImageUpload
                                  id="slot3"
                                  onInput={inputHandler}
                                  errorText="Please Pick A Photo For Slot 3."
                                  placeholder="Slot 3"
                                />
                              </Grid2>
                              <Grid2 xs={4}>
                                <ImageUpload
                                  id="slot4"
                                  onInput={inputHandler}
                                  errorText="Please Pick A Photo For Slot 4."
                                  placeholder="Slot 4"
                                />
                              </Grid2>
                              <Grid2 xs={4}>
                                <ImageUpload
                                  id="slot5"
                                  onInput={inputHandler}
                                  errorText="Please Pick A Photo For Slot 5."
                                  placeholder="Slot 5"
                                />
                              </Grid2>
                              <Grid2 xs={4}>
                                <ImageUpload
                                  id="slot6"
                                  onInput={inputHandler}
                                  errorText="Please Pick A Photo For Slot 6."
                                  placeholder="Slot 6"
                                />
                              </Grid2>
                              <Grid2 xs={4}>
                                <ImageUpload
                                  id="slot7"
                                  onInput={inputHandler}
                                  errorText="Please Pick A Photo For Slot 7."
                                  placeholder="Slot 7"
                                />
                              </Grid2>
                              <Grid2 xs={4}>
                                <ImageUpload
                                  id="slot8"
                                  onInput={inputHandler}
                                  errorText="Please Pick A Photo For Slot 8."
                                  placeholder="Slot 8"
                                />
                              </Grid2>
                              <Grid2 xs={4}>
                                <ImageUpload
                                  id="slot9"
                                  onInput={inputHandler}
                                  errorText="Please Pick A Photo For Slot 9."
                                  placeholder="Slot 9"
                                />
                              </Grid2>
                          </Grid2>
                        </Card>
                      </Grid2>
                    </Card>
                    </form>
                  </Grid2>
                  <Grid2 xs={12}>
                    <Card>
                      <Button to="/MainPage/Admin">Cancel</Button>
                      <Button type="submit" disabled={!formState.isValid}>
                        Upload {loadedTank.tankName} Photos
                      </Button>
                    </Card>
                  </Grid2>
              </Grid2>
            </React.Fragment>
          )}
          {!isLoading && !loadedTank && (
            <div>
              <Text element="h1" value=" - - - Failed To Find Tank By Given ID - - - "/>
            </div>
          )}
        </Card>
      </div>
    </React.Fragment>
  );
}

export default AddTankPhotos;

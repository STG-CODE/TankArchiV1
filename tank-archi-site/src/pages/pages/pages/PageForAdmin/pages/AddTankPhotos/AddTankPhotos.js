import React, { useEffect, useState } from "react";
//
import { useHistory, useParams } from "react-router-dom";
import { useHttpClient } from "../../../../../Shared/Hooks/http-hook";
import { useForm } from "../../../../../Shared/Hooks/form-hook";

//
import Button from "../../../../../Shared/components/Form-Elements/Button";
import ImageUpload from "../../../../../Shared/components/Form-Elements/ImageUpload";
import Card from "../../../../../Shared/components/UI-Elements/Card";
import Text from "../../../../../Shared/components/Visual-Elements/Text";
import ErrorModal from "../../../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../../../Shared/components/UI-Elements/LoadingSpinner";

//TODO: Add boxes for dragging and adding pics to the specified tank!

function AddTankPhotos() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedTank, setLoadedTank] = useState();
  const tankId = useParams().tankId;
  const pages = useHistory();

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

  useEffect(() => {
    const fetchTank = async () => {
      console.log(`Fetching Tank By ID = ${tankId}.`);
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/EditTank/${tankId}`
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

  const adminPhotosUploadHandler = async (event) => {
    event.preventDefault();
    try {      
      console.log("Current Tank Image From Tank Photo Set = " + formState.inputs.slot1.value);
      const formData = new FormData();
      // const tankPhotoSet = [
      //   {
      //     id: "slot1",
      //     value: formState.inputs.slot1
      //   },
      //   {
      //     id: "slot2",
      //     value: formState.inputs.slot2.value
      //   },
      //   {
      //     id: "slot3",
      //     value: formState.inputs.slot3.value
      //   },
      //   {
      //     id: "slot4",
      //     value: formState.inputs.slot4.value
      //   },
      //   {
      //     id: "slot5",
      //     value: formState.inputs.slot5.value
      //   },
      //   {
      //     id: "slot6",
      //     value: formState.inputs.slot6.value
      //   },
      //   {
      //     id: "slot7",
      //     value: formState.inputs.slot7.value
      //   },
      //   {
      //     id: "slot8",
      //     value: formState.inputs.slot8.value
      //   },
      //   {
      //     id: "slot9",
      //     value: formState.inputs.slot9.value
      //   },
        
      // ]
      // formData.append("tankPhotoSet",tankPhotoSet);
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
        formData
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
              <Text element="h1" value={`${loadedTank.tankName} Photos Upload Page:`}/>
              <Text element="h1" value={`[Tank ID : ${tankId}]`} />
              <form onSubmit={adminPhotosUploadHandler}>
                <Card>
                  <Text
                   element="h3" 
                   value={`Please Place Photos For The Selected ${loadedTank.tankName} Below:`}
                  />
                  <Card>
                    <ImageUpload
                      id="slot1"
                      onInput={inputHandler}
                      errorText="Please Pick A Photo For Slot 1."
                      placeholder="Slot 1"
                    />
                    <ImageUpload
                      id="slot2"
                      onInput={inputHandler}
                      errorText="Please Pick A Photo For Slot 2."
                      placeholder="Slot 2"
                    />
                    <ImageUpload
                      id="slot3"
                      onInput={inputHandler}
                      errorText="Please Pick A Photo For Slot 3."
                      placeholder="Slot 3"
                    />
                    <ImageUpload
                      id="slot4"
                      onInput={inputHandler}
                      errorText="Please Pick A Photo For Slot 4."
                      placeholder="Slot 4"
                    />
                    <ImageUpload
                      id="slot5"
                      onInput={inputHandler}
                      errorText="Please Pick A Photo For Slot 5."
                      placeholder="Slot 5"
                    />
                    <ImageUpload
                      id="slot6"
                      onInput={inputHandler}
                      errorText="Please Pick A Photo For Slot 6."
                      placeholder="Slot 6"
                    />
                    <ImageUpload
                      id="slot7"
                      onInput={inputHandler}
                      errorText="Please Pick A Photo For Slot 7."
                      placeholder="Slot 7"
                    />
                    <ImageUpload
                      id="slot8"
                      onInput={inputHandler}
                      errorText="Please Pick A Photo For Slot 8."
                      placeholder="Slot 8"
                    />
                    <ImageUpload
                      id="slot9"
                      onInput={inputHandler}
                      errorText="Please Pick A Photo For Slot 9."
                      placeholder="Slot 9"
                    />
                  </Card>
                </Card>
                <Button to="/MainPage/Admin">Cancel</Button>
                <Button type="submit" disabled={!formState.isValid}>
                  Upload {loadedTank.tankName} Photos
                </Button>
              </form>
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

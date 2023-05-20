import React, { useRef, useState, useEffect } from "react";

import Text from "../Visual-Elements/Text";
import Button from "./Button";

import './PhotoUpload.css';

const ImageUpload = props => {
    const[file,setFile] = useState();
    const[previewUrl,setPreviewUrl] = useState();
    const[currentPfp,setCurrentPfp] = useState();
    const[isValid,setIsValid] = useState(false);


    
    const filePickerRef = useRef();

    useEffect(() => {
        setCurrentPfp(props.currentPfp);
        if(!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file,props.currentPfp])


    const pickedFileHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;

        if(event.target.files && event.target.files.length === 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }

        props.onInput(props.id, pickedFile , fileIsValid);
        console.log(event.target);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input
             id={props.id}
             className=""
             style={{display: 'none'}}
             ref={filePickerRef}
             type="file"
             accept=".jpg,.png,jpeg"
             onChange={pickedFileHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview"/>}
                    {!previewUrl && <img src={`http://localhost:5000/${currentPfp || props.initialValue}`} alt={ props.placeholder || "Current Profile Pic"}/>}
                </div>
                <Button type="button" onClick={pickImageHandler}  className="">
                    Pick An Image
                </Button>
            </div>
            {!isValid && <Text value={props.errorText}/>}
        </div>
    )
}

export default ImageUpload;
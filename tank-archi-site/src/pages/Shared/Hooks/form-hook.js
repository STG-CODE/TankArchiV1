import { useCallback,useReducer } from 'react';

//contains our logic for our state of the form and such
const formReducer = (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGE'://
            let formIsValid = true;
            for(const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            // we then use the return to dynamically update our state and fields of our inputs
            return {
                ...state,
                inputs:{
                    ...state.inputs,
                    [action.inputId]:{ value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            };
            //this code ensures that we update the information about the inputs and their overall validity.
        default:
            return state;
    }
};

export const useForm = (initialInputs,initialFormValidity) => {
    const [formState,dispatch] = useReducer(formReducer,{
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    //
    const inputHandler = useCallback((id,value,isValid) => {
        dispatch({ 
            type:'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id 
        });
    },[]);

    const setFormData = useCallback((inputData,formValidity) => {
        dispatch({
            type:'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        });
    });

    return [formState,inputHandler,setFormData]
};
import React from "react";
import Card from "../../../../Shared/components/UI-Elements/Card";
import Input from "../../../../Shared/components/Form-Elements/Input";
import Text from "../../../../Shared/components/Visual-Elements/Text";
import { VALIDATOR_REQUIRE } from "../../../../Shared/Util/validators";
import { useForm } from "../../../../Shared/Hooks/form-hook";
import Button from "../../../../Shared/components/Form-Elements/Button";


function OptionalDetails(props) {
  const [formState, inputHandler, setFormState] = useForm();
  return (
    <div className="Container">
      <Text element={"h2"} value={"Admin Optional Details:"} />
      <Card>
      <form>
            {/* For "company" */}
            <Text
              element={"text"}
              value={`Company Name : ${props.user.company || "None"}`}
            />
            <Input
              id="company"
              element="input"
              type="text"
              label="Enter New Company Name:"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter A Valid Company Name!"
              onInput={inputHandler}
              placeholder="empty"
              initialValid={true}
            />
            {/* For "publisher" */}
            <Text
              element={"text"}
              value={`Publisher Name : ${props.user.publisher || "None"}`}
            />
            <Input
              id="publisher"
              element="input"
              type="text"
              label="Enter New Publisher Name:"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter A Valid Publisher Name!"
              onInput={inputHandler}
              placeholder="empty"
              initialValid={true}
            />
            {/* For "association" */}
            <Text element={"text"} value={`Association Name : ${props.user.association || "None"}`} />
            <Input
              id="association"
              element="input"
              type="text"
              label="Enter New Association Name:"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter A Valid Association Name!"
              onInput={inputHandler}
              placeholder="empty"
              initialValid={true}
            />
            {/* For "socialType" */}
            <Text element={"text"} value={`Social Type Of Group : ${props.user.socialType || "None"}`} />
            <Input
              id="socialType"
              element="input"
              type="text"
              label="Enter New Social Type Of Group :"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter A Valid Social Group Type!"
              onInput={inputHandler}
              placeholder="empty"
              initialValid={true}
            />
            {/* For "socialName" */}
            <Text element={"text"} value={`Social Group Name : ${props.user.socialName || "None"}`} />
            <Input
              id="socialName"
              element="input"
              type="text"
              label="Enter New Social Group Name:"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter A Valid Social Group Name!"
              onInput={inputHandler}
              placeholder="empty"
              initialValid={true}
            />
            <Button>Save Changes</Button>
          </form>
      </Card>
    </div>
  );
}

export default OptionalDetails;
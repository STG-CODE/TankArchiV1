import React from "react";
//Component Imports :
import AdminChangeEmailBody from "./components/AdminChangeEmailBody";
//
import Text from "../../../../../Shared/components/Visual-Elements/Text";
import Card from "../../../../../Shared/components/UI-Elements/Card";



function AdminChangeEmail() {
  return (
    <React.Fragment>
      <div className="Container">
        <Text element="h1" value="Email Address Change Page:" />
        <Card>
          <AdminChangeEmailBody />
        </Card>
      </div>
    </React.Fragment>
  );
}

export default AdminChangeEmail;
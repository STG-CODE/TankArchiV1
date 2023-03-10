import React from "react";
//Component Imports :
import AdminChangePasswordBody from "./components/AdminChangePasswordBody";
//
import Text from "../../../../../Shared/components/Visual-Elements/Text";
import Card from "../../../../../Shared/components/UI-Elements/Card";



function AdminChangePassword() {
  return (
    <React.Fragment>
      <div className="container">
        <Text element="h1" value="Changing Admin's Password:" />
        <Card>
          <Text />
          <AdminChangePasswordBody />
        </Card>
      </div>
    </React.Fragment>
  );
}

export default AdminChangePassword;
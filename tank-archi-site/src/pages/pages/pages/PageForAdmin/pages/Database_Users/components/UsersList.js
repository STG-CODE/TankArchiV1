//basic imports
import React from "react";
//component import
import UserItem from "./components/UserItem";

function UsersList(props) {
  //if there isn't any users in the list then present the following massage
  if (props.items.length === 0)
    return (
      <div className="Container">
        <h1>No Users Found!</h1>
      </div>
    );
  ////here we return each item in the users list as the following parameters :
  //// "key" = (the users id as a key) , "id" =  (the users actual id as an id) ,
  //// "username" = (the user's username) , "email" = (the user's email') ,
  //// "firstName" = (the user's first name) , "lastName" = (the user's last name) ,
  //// "age" = (the user's age) , "country" = (the user's country) ,
  //// "votesCount" = (the user's counted votes)
  return (
    <div className="Container">
      <table>
        <thead>
          <tr>
            <th>
              <button>Sort :</button>
              <button>ID</button>
            </th>
            <th>
              <button>User\Admin Pfp:</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Username</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Email</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>First Name</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Last Name</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Age</button>
            </th>
            <th>
              <button>Sort :</button>
              <button>Country</button>
            </th>
            
            <th>
              <button>Sort : </button>
              <button>Favorite Tanks Count</button>
            </th>
            <th>
              <button>Sort : </button>
              <button>Submitted Suggestions Count</button>
            </th>
            <th>
              <button>Options</button>
            </th>
          </tr>
        </thead>

        {props.items.map((user) => {
          return (
            <tbody>
              <UserItem
                isAdmin={user.isAdmin}
                key={user.id}
                id={user.id}
                imagePfp={user.imagePfp}
                username={user.username}
                email={user.email}
                firstName={user.firstName}
                lastName={user.lastName}
                age={user.age}
                country={user.country}
                favTanksList={user.favTanksList.length}
                submittedSuggestions={user.submittedSuggestions.length}
                onDelete={props.onDeleteUser}
              />
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default UsersList;

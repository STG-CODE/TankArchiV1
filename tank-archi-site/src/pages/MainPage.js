import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

//the components that are imported
import Catalogue from "./components/Catalogue";

//the different site page imports
import Search from "./pages/TankSearch/TankSearch";
import Rankings from "./pages/Rankings/Rankings";
import TankFest from "./pages/TankFest/TankFest";
import Recommended from "./pages/Recommended/Recommended";
import SiteGuide from "./pages/SiteGuide/SiteGuide";
import AboutUs from "./pages/AboutUs/AboutUs";
import TankPage from "./pages/TankPage/TankPage";
import UserPage from "./pages/pages/PageForUser/User";
import AdminPage from "./pages/pages/PageForAdmin/Admin";

//the shared components of the site
import Title from "./Shared/components/UI-Elements/Title";
import Profile from "./Shared/components/UI-Elements/Profile";
import MainNavigation from "./Shared/components/Navigation/MainNavigation";
import ShortAboutUs from "./Shared/components/UI-Elements/ShortAboutUs";
import ShortTankFest from "./Shared/components/UI-Elements/ShortTankFest";
import ShortRecommended from "./Shared/components/UI-Elements/ShortRecommended";
import Footer from "./Shared/components/UI-Elements/Footer";

//the different page instances of the site
//-admin options
import AdminChangeEmail from "./pages/pages/PageForAdmin/pages/ChangeEmail/AdminChangeEmail";
import AdminChangePassword from "./pages/pages/PageForAdmin/pages/ChangePassword/AdminChangePassword";
import AdminAddTankPhotos from "./pages/pages/PageForAdmin/pages/AddTankPhotos/AddTankPhotos";
import AdminStatistics from "./pages/pages/PageForAdmin/pages/Statistics/Statistics";

//-suggestions
import AdminSuggestionsDatabase from "./pages/pages/PageForAdmin/pages/Database_Suggestions/SuggestionsDatabase";
import AdminEditSuggestion from "./pages/pages/PageForAdmin/pages/Database_Suggestions/pages/EditSuggestions/EditSuggestions";
import AdminReviewSuggestion from "./pages/pages/PageForAdmin/pages/Database_Suggestions/pages/ReviewSuggestions/ReviewSuggestion";
//-tanks
import AdminTanksDatabase from "./pages/pages/PageForAdmin/pages/Database_Tanks/TanksDatabase";
import AdminAddTank from "./pages/pages/PageForAdmin/pages/Database_Tanks/pages/AddTank/AddTank";
import AdminEditTank from "./pages/pages/PageForAdmin/pages/Database_Tanks/pages/EditTank/EditTank";
import AdminReviewTank from "./pages/pages/PageForAdmin/pages/Database_Tanks/pages/ReviewTank/ReviewTank";
//-users
import AdminUsersDatabase from "./pages/pages/PageForAdmin/pages/Database_Users/UsersDatabase";
import AdminAddUser from "./pages/pages/PageForAdmin/pages/Database_Users/pages/AddUser/AddUser";
import AdminEditUser from "./pages/pages/PageForAdmin/pages/Database_Users/pages/EditUser/EditUser";
import AdminReviewUser from "./pages/pages/PageForAdmin/pages/Database_Users/pages/ReviewUser/ReviewUser";
//-user options
import UserChangeEmail from "./pages/pages/PageForUser/pages/ChangeEmail/UserChangeEmail";
import UserChangePassword from "./pages/pages/PageForUser/pages/ChangePassword/UserChangePassword";
import UserSuggestionPage from "./pages/pages/PageForUser/pages/SubmitSuggestion/SubmitSuggestion";
//
import { LoginContext } from "./Shared/Context/login-context";
//
import Welcome from "../components/Welcome";
import Login from "../components/Login";
import SignUp from "../components/Sign-Up";

//TODO:(Profile Pages(1))Add the following parameters to the DB : (Last Login Date, Favoured Tanks Count , Favorite Tanks ,User Pfp)
//TODO:(Profile Pages(2))Add the needed optional params in the design of the admin's page.
//TODO:(Profile Pages(3))Change \ Add optional details in general to be more versatile and up to date with the profiling.
//TODO:(Profile Pages(4))Decide on design of Admin And User profile pages(either "Div" or "Table").
//TODO:(Profile Pages(5))Decide on return options of changes pages like password and email pages.
//TODO:(Profile Pages(6))Maybe add more parameters for both changing admins details and the shema of the admin
//TODO:(Profile Pages(7))Remove "Save Changes" since it will be saved at the the change pages where the new details are saved.
//TODO:(Profile Pages(8))Add the option and page to change pfp.

//TODO:(Profile Page  In General(1))Add the option to upload a profile pic as the users avatar.

//TODO:(Nav-Bar(1))Implement "NavLink" from "react-router-dom" instead of regular "Link"

//TODO:(Catalogue Page(1))Add event where entering the catalogue page will show fav nation's tanks.

//TODO:(Admin Permissions On Site(1))Add that if user is an admin then he cant vote and does not have an effect on stats and other parts of the site).
//TODO:(Admin Permissions On Site(2))When admin looks up user it needs to also show the optional user data.

//TODO:(Admin Options(1))Update the admins options so that they will show the clicked tank or user information in the optional edit/review and others.

//TODO:(Tank Search Page(1))

//TODO:(Add Tank Photos Page(1))Make it so that we can add and also remove and edit them.

//TODO:(Rankings Page(1))Make it so that each tank is clickable so that the user can go see at its own page.

//TODO:(Favorite Tanks Page(1))Make it if possible when done with most of the site.

//TODO:(Suggestion(1))Consider adding more parameters and mechanics to the suggestion system.
//TODO:(Suggestion(2))Modify this page to properly ask the user the information that is needed.
//TODO:(Suggestion(3))Have a good look at this page and its design and decide on it.
//TODO:(Suggestion(4))Make it so that users can only submit three suggestions as a limit.
//TODO:(Suggestion(5))Consider adding modals like an "are you sure you want to delete?" window or something later.(check course for reference).

//TODO:(DATABASE!(1))Add the perimeters of favorite tanks and such.
//TODO:(DATABASE(2))Try to condense the link into a component in which we just input it as "<edit/>" and so on.
//TODO:(DATABASE(3))Add last signed in date to the Database and also signup and account creation date.

//TODO:(Mobile Implementation(1))Implement the "hamburger" sidebar and navbar options and designs.
//TODO:(Mobile Implementation(2))Implement drawer options and design.

//TODO:(Things To Implement(1))Consider using "useEffect()" function(reference in the course)
//TODO:(Things To Implement(2))After implementing database connection, create course input components!
//TODO:Meant For The Following : (Media & Entertainment),(Site Guide),(About Us).
//TODO -> Design Idea: Create separate components containing different subjects.

//TODO: use react.js course section | "Switch Mode" and implement it at the admins part of the site for transition between review/edit options

//!Ask!
//?(Consideration)Should there be a database for admins that is separate from the users?(instead of distinguishing with a boolean flag)

//!NOTE: FINISH THE IMPORTED COMPONENTS
function MainSitePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        {/* This is our main page directory */}
        <Route path="/MainPage" exact>
          <Title />
          <Profile />
          <MainNavigation />
          <div>
            <Catalogue />
          </div>
          <ShortAboutUs />
          <ShortTankFest />
          <ShortRecommended />
          <Footer />
        </Route>

        {/* This route leads us to the "Search" page where we can search for different tanks and also filter them */}
        <Route path="/MainPage/Search" exact>
          <Title />
          <Profile />
          <MainNavigation />
          <div>
            <Search />
          </div>
          <ShortAboutUs />
          <ShortTankFest />
          <ShortRecommended />
          <Footer />
        </Route>

        {/* This route leads us to the "Rankings" page where all tanks rankings are rated by order */}
        <Route path="/MainPage/Rankings" exact>
          <Title />
          <Profile />
          <MainNavigation />
          <div>
            <Rankings />
          </div>
          <ShortAboutUs />
          <ShortTankFest />
          <ShortRecommended />
          <Footer />
        </Route>

        {/* This route takes us to the "TankFest" page where we promote the tank museum */}
        <Route path="/MainPage/TankFest" exact>
          <Title />
          <Profile />
          <MainNavigation />
          <div>
            <TankFest />
          </div>
          <ShortAboutUs />
          <ShortTankFest />
          <ShortRecommended />
          <Footer />
        </Route>

        {/* This route takes us to the "Media & Entertainment" page where there are recommendations for games movies and such */}
        <Route path="/MainPage/Recommended" exact>
          <Title />
          <Profile />
          <MainNavigation />
          <div>
            <Recommended />
          </div>
          <ShortAboutUs />
          <ShortTankFest />
          <ShortRecommended />
          <Footer />
        </Route>

        {/* This route takes us to the "Site Guide" page where we have a written guide about all the features of the site */}
        <Route path="/MainPage/SiteGuide" exact>
          <Title />
          <Profile />
          <MainNavigation />
          <div>
            <SiteGuide />
          </div>
          <ShortAboutUs />
          <ShortTankFest />
          <ShortRecommended />
          <Footer />
        </Route>

        {/* This route takes us to the "About Us" page where there is information about the sites creators and goals */}
        <Route path="/MainPage/AboutUs" exact>
          <Title />
          <Profile />
          <MainNavigation />
          <div>
            <AboutUs />
          </div>
          <ShortAboutUs />
          <ShortTankFest />
          <ShortRecommended />
          <Footer />
        </Route>

        {/* This route takes us to a desired tanks page containing the information about said tank*/}
        <Route path="/MainPage/TankPage" exact>
          <Title />
          <Profile />
          <MainNavigation />
          <div>
            <TankPage />
          </div>
          <ShortAboutUs />
          <ShortTankFest />
          <ShortRecommended />
          <Footer />
        </Route>

        {/*!NOTE : this will be one route that will lead to either admin or user page depending on perimeters */}
        {/* This route leads us to the profile page of the User / Admin */}
        <Route path="/MainPage/User" exact>
          <Title />
          <Profile />
          <div>
            <UserPage />
          </div>
          <Footer />
        </Route>

        {/* This route leads us to the profile page of the User / Admin */}
        <Route path="/MainPage/Admin" exact>
          <Title />
          <Profile />
          <div>
            <AdminPage />
          </div>
          <Footer />
        </Route>

        {/* This route leads us to the change email address page of the Admin */}
        <Route path="/MainPage/Admin/ChangeEmail" exact>
          <Title />
          <div>
            <AdminChangeEmail />
          </div>
        </Route>

        {/* This route leads us to the change password page of the Admin */}
        <Route path="/MainPage/Admin/ChangePassword" exact>
          <Title />
          <div>
            <AdminChangePassword />
          </div>
        </Route>

        {/* This route leads us to the change email address page of the User */}
        <Route path="/MainPage/User/ChangeEmail" exact>
          <Title />
          <div>
            <UserChangeEmail />
          </div>
        </Route>

        {/* This route leads us to the change password page of the User */}
        <Route path="/MainPage/User/ChangePassword" exact>
          <Title />
          <div>
            <UserChangePassword />
          </div>
        </Route>

        {/* This route leads us to the suggestion submission page */}
        <Route path="/MainPage/User/SubmitSuggestion" exact>
          <Title />
          <div>
            <UserSuggestionPage />
          </div>
        </Route>

        {/* This route leads us to the Suggestions Database */}
        <Route path="/MainPage/Admin/SuggestionsDatabase" exact>
          <Title />
          <Profile />
          <div>
            <AdminSuggestionsDatabase />
          </div>
        </Route>

        {/* ---> (Admin)Suggestions Database edit option */}
        <Route path="/MainPage/Admin/SuggestionsDatabase/EditSuggestion/:suggestionId" exact>
          <Title />
          <Profile />
          <div>
            <AdminEditSuggestion />
          </div>
        </Route>
        {/* ---> (User)Suggestions Database edit option */}
        <Route path="/MainPage/User/EditSuggestion/:suggestionId" exact>
          <Title />
          <Profile />
          <div>
            <AdminEditSuggestion />
          </div>
        </Route>
        {/* ---> (Admin)Suggestions Database review option */}
        <Route path="/MainPage/Admin/SuggestionsDatabase/ReviewSuggestion/:suggestionId" exact>
          <Title />
          <Profile />
          <div>
            <AdminReviewSuggestion />
          </div>
        </Route>
        {/* ---> (User)Suggestions Database review option */}
        <Route path="/MainPage/User/ReviewSuggestion/:suggestionId" exact>
          <Title />
          <Profile />
          <div>
            <AdminReviewSuggestion />
          </div>
        </Route>
        {/* This route leads us to the Add Tank Photos Page */}
        <Route path="/MainPage/Admin/AddTankPhotos/:tankId" exact>
          <Title />
          <Profile />
          <div>
            <AdminAddTankPhotos />
          </div>
        </Route>

        {/* This route leads us to the Tanks Database */}
        <Route path="/MainPage/Admin/TanksDatabase" exact>
          <Title />
          <Profile />
          <div>
            <AdminTanksDatabase />
          </div>
        </Route>

        {/* ---> Tanks Database add option */}
        <Route path="/MainPage/Admin/TanksDatabase/AddTank" exact>
          <Title />
          <Profile />
          <div>
            <AdminAddTank />
          </div>
        </Route>

        {/* ---> Tanks Database edit option */}
        <Route path="/MainPage/Admin/TanksDatabase/EditTank/:tankId" exact>
          <Title />
          <Profile />
          <div>
            <AdminEditTank />
          </div>
        </Route>
        {/* <Route path="/MainPage/Admin/TanksDatabase/EditTank/:tankId"></Route> */}

        {/* ---> Tanks Database review option */}
        <Route path="/MainPage/Admin/TanksDatabase/ReviewTank/:tankId" exact>
          <Title />
          <Profile />
          <div>
            <AdminReviewTank />
          </div>
        </Route>
        {/* <Route path="/MainPage/Admin/TanksDatabase/ReviewTank/:tankId"></Route> */}

        {/* This route leads us to the Users Database */}
        <Route path="/MainPage/Admin/UsersDatabase" exact>
          <Title />
          <Profile />
          <div>
            <AdminUsersDatabase />
          </div>
        </Route>

        {/* ---> Users Database add option */}
        <Route path="/MainPage/Admin/UsersDatabase/AddUser" exact>
          <Title />
          <Profile />
          <div>
            <AdminAddUser />
          </div>
        </Route>

        {/* ---> Users Database edit option */}
        <Route path="/MainPage/Admin/UsersDatabase/EditUser/:userId" exact>
          <Title />
          <Profile />
          <div>
            <AdminEditUser />
          </div>
        </Route>
        {/* <Route path="/MainPage/Admin/UsersDatabase/EditUser/:userId"></Route> */}

        {/* ---> Users Database review option */}
        <Route path="/MainPage/Admin/UsersDatabase/ReviewUser/:userId" exact>
          <Title />
          <Profile />
          <div>
            <AdminReviewUser />
          </div>
        </Route>
        {/* <Route path="/MainPage/Admin/UsersDatabase/ReviewUser/:userId"></Route> */}

        {/* This route leads us to the Admin's Statistics Page */}
        <Route path="/MainPage/Admin/AdminStatistics" exact>
          <Title />
          <Profile />
          <div>
            <AdminStatistics />
          </div>
        </Route>
        <Redirect to="/MainPage" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        {/* Routes to the starting page / login or sign up and welcome */}
        <Route path="/" exact>
          <Welcome />
          <Login />
          <SignUp />
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
  }

  return (
    <div className="Container">
      <Router>{routes}</Router>
    </div>
  );
}

export default MainSitePage;

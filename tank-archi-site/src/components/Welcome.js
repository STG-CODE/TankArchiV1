//basic imports
import React from "react";
//component imports
import Card from "../pages/Shared/components/UI-Elements/Card";
import Text from "../pages/Shared/components/Visual-Elements/Text";
//CSS import
import "./WelcomePageCSS.css";

function Welcome() {
  return (
    <div>
      <Card className="background">
        <Text element="h1" value="Hello And Welcome To TankArchi!"/>
        <br/>
        <Text 
          element="h3" 
          value="Welcome To TankArchi!, the site with the most popular and well known content about tanks!
          it contains plenty of information about all kinds of tanks and does extensive research to make sure that they are as accurate as possible,
          our research is lead by a collabirational research and reliable sources of information.
          we welcome you to our fascinating website where you can explore the different kinds of tanks and information about them that we offer.
          we also contain a wide range of other types of information that can interest tank lovers and fans alike.
          for instance, we have recommendations for tanks, movies sites and other sources of information that are related to tanks.
          we also have a very recommended collaborator for our tanks in the form of researchers from 'The Tank Museum' which help us fact check our information."
        />
        <br/>
      </Card>
      
    </div>
  );
}

export default Welcome;
import React from "react";
//
import Button from "../../Shared/components/Form-Elements/Button";
import Card from "../../Shared/components/UI-Elements/Card";
import Text from "../../Shared/components/Visual-Elements/Text";
import Image from "../../Shared/components/Visual-Elements/Image";
//Material UI import
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
//css import
import "./components/Recommended.css";
//Component Contents :

//TODO: Think of what to do with this page  moving forward.

function Recommended() {
  return (
    <React.Fragment>
      <div className="Container">
        <Card>
          <Text element="h1" value="Media & Entertainment Recommendations For Tank Fans:"/>
          <hr/>
          <Button to="/MainPage">
            Go Back
          </Button>
        </Card>
        <Card>
          <Text element="h3" value="Some Recommendations About\Related To Tanks!"/>
            <Card>
              <Text element="h4" value="Video Games:"/>
              <hr/>
              <Card className="none">
                <Grid2 container spacing={0} xs={12}>
                  <Grid2 xs={12}>
                    <Text element="text" value="War Thunder :"/>
                  </Grid2>
                  <Grid2 xs={8}>
                    <Text className="textareaWT" element="textarea" value="
                      A leviathan of free tank games and online games overall, War Thunder favours hardcore tacticians, genius statisticians, and obsessive attention to detail. Unlike rival World of Tanks, War Thunder cannot make any claims to being accessible. There are a ridiculous number of tanks and branches of research; you can easily pour hours of your time into the wrong tank. Additionally, War Thunder boasts a complex and sophisticated armour penetration mechanic, which forces careful consideration before firing a single shot.

                      While War Thunder’s arcade mode does a good job of introducing gamers to some of the game’s core mechanics, you cannot consider yourself a War Thunder veteran until you have emerged victorious from a simulator battle. This stripped-back game mode restricts your view, turns off aim assists, and dramatically increases the time it takes to perform any action. Every encounter is a nail-biting tactical nightmare.
                      
                      If you’re just starting out then be sure to check out our War Thunder Ground Battles tips and our guide to the best War Thunder tier 1 tanks. War Thunder also offers planes and ships to pilot, making it one of our best plane games, too."
                    />
                  </Grid2>
                  <Grid2 xs={4}>
                    <Image
                        className="wtLogo"
                        image="http://localhost:5000/uploads/stockImages/RCGWT.png"
                        alt={null}
                    />
                  </Grid2>
                </Grid2>
              </Card>
              <Card className="none">
                <Grid2 container spacing={0} xs={12}>
                  <Grid2 xs={12}>
                    <Text element="text" value="World Of Tanks :"/>
                  </Grid2>
                  <Grid2 xs={8}>
                    <Text className="textareaWOT" element="textarea" value="
                      If it is a hardcore, lifetime-to-master tank game you are looking for, steer well clear of World of Tanks. This free-to-play titan offers fast and frantic gameplay with only a handful of realistic elements thrown in for good measure. This is one of the best tank games for casual gamers looking for an in-road to more tanking action, and yet one with enough depth and progression to keep gamers invested well into the later tiers of unlockable tanks.

                      Perhaps World of Tanks’ greatest strength is its roster of over 800 armoured vehicles, ranging from scout vehicles to battlefield behemoths. Better still, with the game featuring vehicles from France, Great Britain, Japan, Czechoslovakia, Germany, Soviet Russia, the United States and China, there is heaps of variation in what you will be battling alongside and squaring up to in World of Tanks."
                    />
                  </Grid2>
                  <Grid2 xs={4}>
                    <Image
                      className="wotLogo"
                      image="http://localhost:5000/uploads/stockImages/RCGWOT.png"
                      alt={null}
                      />
                  </Grid2>
                </Grid2>
              </Card>
              <Card className="none">
                <Grid2 container spacing={0} xs={12}>
                  <Grid2 xs={12}>
                    <Text element="text" value="Enlisted :"/>
                  </Grid2>
                  <Grid2 xs={8}>
                    <Text className="textareaE" element="textarea" value="
                      Step into the boots of a master tanketeer (yes, we made up that word) and roll your mightily armoured way across iconic WWII battlefields in Enlisted. This free-to-play MMO from Gaijin Entertainment recreates several pivotal campaigns in atmospheric detail, and includes – you guessed it – a whole bunch of tanks for you to deploy and control throughout each fight.

                      The game’s dedication to historical accuracy means that each tank or armored vehicle available per campaign directly corresponds to the ones available during the real war, so there’s no danger of a K2 Black Panther rolling up and anachronistically shattering your combat reverie. Plus, with each member of your AI squad specialising in a certain tactic, it’s up to you whether you choose to see out the whole battle from within the (relative) safety of your steel shell, or switch over to infantry or aircraft for a different perspective. Huzzah!
                      "/>
                  </Grid2>
                  <Grid2 xs={4}>
                    <Image
                      className="eLogo"
                      image="http://localhost:5000/uploads/stockImages/RCGE.png"
                      alt={null}
                    />
                  </Grid2>
                </Grid2>
              </Card>
              <Card className="none">
                <Grid2 container spacing={0} xs={12}>
                  <Grid2 xs={12}>
                    <Text element="text" value="Armored Warfare :"/>
                  </Grid2>
                  <Grid2 xs={8}>
                    <Text className="textareaAW" element="textarea" value="
                    While the tags of ‘MMO’, ‘free-to-play’ and ‘tank’ apply to Armored Warfare as well as they do to World of Tanks, a number of key differences ensure both are worth the time of a tank games veteran. Transporting World of Tanks’ remarkably approachable gameplay to the more modern era, Armoured Warfare provides tankers with more equipment, newer tanks, and a selection of versatile tank tech that adds a great deal more variation to the core gameplay.

                    Additionally, Armored Warfare brings PVE to the fold, allowing you to team up with friends to take on AI enemies, progressing through the ranks of tanks without constantly losing out to highly skilled foes in PVP. As a live game, Armored Warfare new tanks arrive frequently with updates that enhance and expand the game. You’ll never be short of a boomstick on wheels."
                    />
                  </Grid2>
                  <Grid2 xs={4}>
                    <Image
                      className="awLogo"
                      image="http://localhost:5000/uploads/stockImages/RCGAW.png"
                      alt={null}
                    />
                  </Grid2>
                </Grid2>
              </Card>
            </Card>
            <Card>
              <Text element="h4" value="YouTube Channels:"/>
              <hr/>
            </Card>
            <Card>
              <Text element="h4" value="Movies & TV Shows:"/>
              <hr/>
              <Card className="none">
                <Grid2 container spacing={1} xs={12}>
                  <Grid2 xs={12}>
                    <Text element="text" value="Fury (2019) :"/>
                  </Grid2>
                  <Grid2 xs={6}>
                    <Text className="textareaF" element="textarea" value="Fury is a 2014 American war film written and directed by David Ayer. It stars Brad Pitt, Shia LaBeouf, Logan Lerman, Michael Peña, and Jon Bernthal; all members of an American tank crew fighting in Nazi Germany during the final weeks of the European theater of World War II. Ayer was influenced by the service of military veterans in his family and by reading books such as Belton Y. Cooper's Death Traps, a 1998 memoir that underscores the high casualty rates suffered by American tank crews in combat against their better-equipped German counterparts."/>
                  </Grid2>
                  <Grid2 xs={6}>
                    <Image
                      className="MovieLogos"
                      image="http://localhost:5000/uploads/stockImages/RCMF.jpg"
                      alt={null}
                    />
                  </Grid2>
                </Grid2>
              </Card>
              <Card className="none">
              <Grid2 container spacing={1} xs={12}>
                  <Grid2 xs={12}>
                    <Text element="text" value="Lebanon (2009) :"/>
                  </Grid2>
                  <Grid2 xs={6}>
                    <Text className="textareaF" element="textarea" value="Lebanon (Hebrew: לבנון Lvanon; called Lebanon: The Soldier's Journey in the UK) is a 2009 internationally co-produced war film directed by Samuel Maoz. It won the Golden Lion at the 66th Venice International Film Festival, becoming the first Israeli-produced film to have won that honour. In Israel itself the film has caused some controversy. The film was nominated for ten Ophir Awards, including Best Film. The film also won the 14th Annual Satyajit Ray Award."/>
                  </Grid2>
                  <Grid2 xs={6}>
                    <Image
                      className="MovieLogos"
                      image="http://localhost:5000/uploads/stockImages/RCML.jpg"
                      alt={null}
                    />
                  </Grid2>
                </Grid2>
              </Card>
              <Card className="none">
                <Grid2 container spacing={1} xs={12}>
                  <Grid2 xs={12}>
                    <Text element="text" value="T-34 (2019) :"/>
                  </Grid2>
                  <Grid2 xs={6}>
                    <Text className="textareaF" element="textarea" value="T-34 (Russian: Т-34) is a 2019 Russian war film written and directed by Aleksey Sidorov. The title references the T-34, a World War II-era Soviet medium tank used during the defense of the Soviet Union. The film narrates the life of Nikolai Ivushkin, a tank commander who gets captured by the Germans. Three years later, he begins to plan his ultimate escape, alongside his newly recruited tank crew. It stars Alexander Petrov as Junior Lieutenant Ivushkin, with Viktor Dobronravov, Irina Starshenbaum, Anton Bogdanov, Yuri Borisov, Semyon Treskunov, and Artyom Bystrov."/>
                  </Grid2>
                  <Grid2 xs={6}>
                    <Image
                      className="MovieLogos"
                      image="http://localhost:5000/uploads/stockImages/RCMT.jpg"
                      alt={null}
                    />
                  </Grid2>
                </Grid2>
              </Card>
              <Card className="none">
                <Grid2 container spacing={1} xs={12}>
                  <Grid2 xs={12}>
                    <Text element="text" value="Greatest Tank Battles (2010) :"/>
                  </Grid2>
                  <Grid2 xs={6}>
                    <Text className="textareaF" element="textarea" value="Greatest Tank Battles is a military documentary series currently airing on History Television and National Geographic Channel in Canada, where it premiered on 4 January 2010. The series was subsequently picked up in the United States by the Military Channel, where it premiered on 5 January 2011. The second season premiered in Canada on 17 January 2011. The show is also broadcast on Discovery Networks throughout Europe, the Middle East, and Africa. Other countries where the show has signed broadcast deals include India (Fox International Channels) and China (LIC Beijing), with a DVD deal in Australia (Beyond Distribution)."/>
                  </Grid2>
                  <Grid2 xs={6}>
                    <Image
                      className="MovieLogos"
                      image="http://localhost:5000/uploads/stockImages/RCMGTB.jpg"
                      alt={null}
                    />
                  </Grid2>
                </Grid2>
              </Card>
            </Card>
            <Card>
              <Text element="h4" value="Sites And Other Sources:"/>
              <hr/>
              
            </Card>
            <Button to="/MainPage">
              Go Back
            </Button>
          </Card>
      </div>
    </React.Fragment>
  );
}

export default Recommended;

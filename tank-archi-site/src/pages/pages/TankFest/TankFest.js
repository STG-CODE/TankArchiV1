import React from "react";
//component imports
import Text from "../../Shared/components/Visual-Elements/Text";
import Card from "../../Shared/components/UI-Elements/Card";
import Button from "../../Shared/components/Form-Elements/Button";
import Image from "../../Shared/components/Visual-Elements/Image";
//CSS import
import "./components/TankFestPage.css";
//Material UI imports
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IconButton } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function TankFest() {
  return (
    <React.Fragment>
      <div className="Container">
        <Card>
          <Text element="h1" value="The TankFest Museum Information Page:" />
          <hr/>
          <Button to="/MainPage">Go Back</Button>
        </Card>
        <Card>
          <Grid2 spacing={0} xs={12}>
            <Grid2 xs={12}>
              <Image
                className="None"
                image="http://localhost:5000/uploads/stockImages/TFNameLogo.png"
                alt={null}
                style={{width:"80%", hight:"25%"}}
              />
            </Grid2>
            <Grid2 xs={12}>
              <Text element="h3" value="Our Calibrators And Sponsors At TankFest:" />
            </Grid2>
          </Grid2>
          <Card>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Text element="h3" value="About The TankFest Museum:"/>
                <hr/>
              </Grid2>
              <Grid2 xs={12}>
                <Text element="h4" value={`"Support the ongoing conservation of our historic vehicles, and preserve our collections now and for generations to come"`}/>
              </Grid2>
              <Grid2 xs={8}>
                  <Text
                   className="tfText" 
                   element="text" 
                   value={"The Tank Museum is a registered charity and independent Museum, accredited by Arts Council England. As a not for profit organization, all surplus income is reinvested into the collection. The Tank Museum, like all registered charities, depends on its supporters to ensure it can continue its mission to tell the story of tanks and the people that served in them. A gift of any size in your Will can help us build a legacy for future generations. The Museum’s values underpin how we interact with visitors, colleagues and external contractors, and how we go about our work – from selling tickets to customers, to restoring tanks, to designing exhibitions."}
                  />
                  <br/>
                  <Text
                   className="tfText" 
                   label="They are PASSIONATE!" 
                   element="text" 
                   value={"TankFest are authoritative and driven, displaying this daily with their enthusiastic and rigorous approach to work."}
                  />
                  <br/>
                  <Text
                   className="tfText" 
                   label="They display INTEGRITY!" 
                   element="text" 
                   value={"TankFest is knowledgeable about their subjects and are professional in the way in which they conduct their business. they act responsibly and embrace responsibility. Their ethical grounding guides them to do the right thing by their audiences, their supporters, their collections and by each other."}/>
                  <br/>
                  <Text
                   className="tfText" 
                   label="They CARE!" 
                   element="text" 
                   value={"TankFest works hard because they believe in the cause of their organization. They are welcoming and friendly to their visitors and colleagues. They are fair and considerate of each other, showing great respect for their collections and for the stories they tell."}/>
                  <br/>
                  <Text
                   className="tfText" 
                   label="They are AMBITIOUS!" 
                   element="text" 
                   value={"Driven by an aspiration to be the best, TankFest strives to be better. They channel their creativity and competitiveness to make themselves innovative, forward thinking and flexible to challenges."}/>
                  <br/>
                  <Text 
                  className="tfText" 
                  label="The Armed Forces Covenant:" 
                  element="text" 
                  value={"The Armed Forces Covenant represents a promise by the nation that those who serve or have served, and their families, are treated fairly. The Tank Museum are signatories of the Armed Forces Covenant, and recognise the value of Serving Personnel, both Regular and Reservists, Veterans and military families contribute to the Museum and our country. As an Armed forces friendly organisation, we welcome job and volunteering applications from veterans, members of the reserve forces, and spouses or partners of members of the armoured forces. We offer all serving members of the armed forces free entry to The Tank Museum and discounts for veterans."}
                  />
                  <br/>
                  
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    className="None"
                    image="http://localhost:5000/uploads/stockImages/TFLogo.png"
                    alt={null}
                    style={{width:"80%", hight:"25%"}}
                  />
                </Grid2>
            </Grid2>
          </Card>
          <Card>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Text element="h3" value="TankFest Location:"/>
                <hr/>
              </Grid2>
              <Grid2 xs={12}>
                <Text
                 className="tfText"   
                 element="text" 
                 value={"The Tank Museum is in south Dorset near Wareham and is signposted by the Brown tourist signs when approaching from Dorchester, Blandford, Weymouth and Poole. The Tank Museum is about a 30-minute drive from these locations, about 45 minutes from Bournemouth and Salisbury, and about an hour from Southampton and Yeovil. There is plenty of free parking on site."}
                />
              </Grid2>
              <Grid2 xs={12}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/TFLocation.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
              </Grid2>
            </Grid2>
          </Card>
          <Card>
            <Grid2 container spacing={0}>
              <Grid2 xs={12}>
                <Text element="h3" value="Activities At TankFest Museum:"/>
                <hr/>
              </Grid2>
              <Grid2 xs={8}>
                <Text
                 className="tfText"
                 label="Exhibitions At The Tank Museum:"  
                 element="text" 
                 value={"Over 30 of the most important armoured fighting vehicles in history tell the story of the tank in context with the tumultuous events of the last century. Find out how this important British invention has helped shape world history with its domination of the battlefield, and hear fascinating accounts from those who have operated and faced them in combat."}
                /> 
              </Grid2>
              <Grid2 xs={4}>
                <Image
                  image="http://localhost:5000/uploads/stockImages/TFExhibitions.png"
                  alt={null}
                  style={{width:"98%", hight:"25%"}}
                />
              </Grid2>
              <Grid2 xs={8}>
                <Text
                 className="tfText"
                 label="Tanks In Action:"  
                 element="text" 
                 value={"See tracked vehicles roar round the arena, with expert commentary, mock battles, and more!"}
                /> 
                <Text
                 className="tfText"
                 label="Vehicle Rides:"  
                 element="text" 
                 value={"Get into the arena yourself with a vehicle ride."}
                /> 
                <Text
                 className="tfText"
                 label="Special Displays:"  
                 element="text" 
                 value={"The Tank Museum has an action-packed event calendar with special displays throughout the year."}
                /> 
              </Grid2>
              <Grid2 xs={4}>
                <Image
                  image="http://localhost:5000/uploads/stockImages/TFTankArena.png"
                  alt={null}
                  style={{width:"98%", hight:"25%"}}
                />
              </Grid2>
              <Grid2 xs={12}>
                <Text element="h4" value="View The Tank Museum's Tank Collection:"/>
                <hr/>
              </Grid2>
              <Grid2 container spacing={0} xs={12}>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T1.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T2.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T3.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T4.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T5.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T6.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
              </Grid2>
              <Grid2 container spacing={0} xs={12}>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T7.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T8.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T9.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T10.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T11.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
                <Grid2 xs={4}>
                  <Image
                    image="http://localhost:5000/uploads/stockImages/T12.png"
                    alt={null}
                    style={{width:"98%", hight:"25%"}}
                  />
                </Grid2>
              </Grid2>
            </Grid2>
          </Card>
          <Card>
            <Grid2 xs={12}>
             <Text element="h3" value="The TankFest Museum's Social Media Presence:"/>
             <hr/>
            </Grid2>
            <Grid2 container spacing={2} xs={12}>
              <IconButton onClick={()=>{window.open("https://twitter.com/TankMuseum");}}>
                <TwitterIcon sx={{ fontSize: 60 }} className="twitter"/>
              </IconButton>
              <IconButton onClick={()=>{ window.open("https://www.facebook.com/tankmuseum");}}>
                <FacebookIcon sx={{ fontSize: 60 }} className="facebook"/>
              </IconButton>
              <IconButton onClick={()=>{ window.open("https://www.instagram.com/tankmuseum/?hl=en");}}>
                <InstagramIcon sx={{ fontSize: 60 }} className="instagram"/>
              </IconButton>
              <IconButton onClick={()=>{ window.open("https://www.youtube.com/user/TheTankMuseum");}}>
                <YouTubeIcon sx={{ fontSize: 80 }} className="youtube"/>
              </IconButton>
              <IconButton onClick={()=>{ window.open("https://www.tiktok.com/@famthetankman");}}>
                <Text className="tiktok" element="text" value="Tiktok"/>
              </IconButton>
              <IconButton onClick={()=>{ window.open("https://www.patreon.com/tankmuseum");}}>
                <Text className="patreon" element="text" value="Patreon"/>
              </IconButton>
            </Grid2>
          </Card>
          <div>
            <Button to="/MainPage">Go Back</Button>
            <Button onClick={()=>{ window.open("https://tankmuseum.org/");}}>Go To The TankFest Museum Site <ExitToAppIcon fontSize="inherit"/></Button>
          </div>
        </Card>
      </div>
      
    </React.Fragment>
  );
}

export default TankFest;

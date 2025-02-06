import { useContext } from 'react';


import Wallet from "../wallet/wallet";
import SideDrawer from "../sidedrawer/sidedrawer";
import Services from "../services/services";
import ImageSlider from "../imageSlider/imageSlider";



import { AuthContext } from '../../hooks/context';



const HomePage = ({ styles }) => {
  const parsedUserData = useContext(AuthContext);

  return (
  <div>
    {parsedUserData.sideDrawer && <SideDrawer />}
    <div style={{textAlign: "center"}}>
      <Wallet parsedUserData={parsedUserData} />
      <Services styles={styles} parsedUserData={parsedUserData} />
      <ImageSlider />
    </div>
  </div>
);
}

export default HomePage;

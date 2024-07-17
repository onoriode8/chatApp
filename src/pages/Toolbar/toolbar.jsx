import { useContext } from "react";

import Navlink from "../navlink/navlink";

import { IoMenuOutline } from "react-icons/io5";

import { AuthContext } from '../../hooks/context';

import './toolbar.css'

const Toolbar = ({styles}) => {
  const { toggleSideDrawerHandler } = useContext(AuthContext);

  return (
    <div className="toolbar_wrapper_container">
        <div className="toolbar_logo_wrapper">
          <div>LOGO</div>
          <div onClick={toggleSideDrawerHandler} className="toolbar_menu_icon"><IoMenuOutline /></div>
        </div>
        <div>
          <Navlink styles={styles} display="flex" alignItems="center" justifyContent="flex-end" flexDirection="row" />
        </div>
    </div>
  );
};

export default Toolbar;

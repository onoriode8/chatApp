import Navlink from "../navlink/navlink";


import './sidedrawerList.css';


const sidedrawerList = () => (
    <div className="sidedrawerList_wrapper_">
        <div>
            <div>LOGO</div>
        </div>
        <div>
            <Navlink display="flex" alignItems="none" 
            justifyContent="start" flexDirection="column"/>
        </div>
    </div>
);

export default sidedrawerList;
import classes from './imageSliderPage.module.css';


const imageSliderPage = ({ images, currentIndex, transition }) => {

    // const mapImage = images.map((items, index) => {
    //     return <img src={items} alt="" />

    // })

    return (

    <div className={classes.imageSliderPage_container}>
        <img className={classes.imageSliderPage_img} src={images[currentIndex]} alt="" />
        
         {/* {mapImage} */}
    </div>

  );
}

export default imageSliderPage;
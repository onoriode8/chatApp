import { useState, useEffect } from "react";


import ImageSliderPage from "../../pages/imageSliderPage/imageSliderPage"


import bankingFinance from "../../assets/banking_finance.webp";
import onlineBanking from "../../assets/online-banking.jpg";
import bankingSuite from "../../assets/Banking-Suite.jpg";
import testBanking from "../../assets/testing_banking.jpg";


const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transition, setTransition] = useState(false);

    const interval = 3000;

    const images = [
        bankingFinance,
        onlineBanking,
        bankingSuite,
        testBanking
    ];

    useEffect(() => {
      const timer = setTimeout(() => {
        setTransition(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setTransition(false);
      }, interval);
  
      return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }, [currentIndex, images.length, interval]);


    return (

    <div>
        <ImageSliderPage transition={transition} images={images} currentIndex={currentIndex} />
    </div>
);
    
}

export default ImageSlider;
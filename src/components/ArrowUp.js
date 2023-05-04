import React, { useEffect, useState } from "react";
import Arrow from "../assets/arrow.png";
import btnStyles from "../styles/Buttons.module.css";

const ArrowUp = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
  
    useEffect(() => {
      checkShowScroll();
      return () => {
        setShowTopBtn({});
      };
    }, []);

  const  checkShowScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    }
  
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", checkShowScroll);
  
    return (
      <div className={btnStyles.ScrollContainer}>
        {showTopBtn && (
          <img
            onClick={handleScrollToTop}
            className={btnStyles.ScrollButton}
            src={Arrow}
            alt="scrollToTop"
          ></img>
        )}
      </div>
    );
  };
  
  export default ArrowUp;
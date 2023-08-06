import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./data";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide_length = sliderData.length;
  
  const auto_scroll = true;
  let slide_interval;
  let interval_time = 5000;

  const next_slide = () => {
    setCurrentSlide(currentSlide === slide_length - 1 ? 0 : currentSlide + 1);
  };

  const prev_slide = () => {
    setCurrentSlide(currentSlide === 0 ? slide_length - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (auto_scroll) {
      const auto = () => {
        slide_interval = setInterval(next_slide, interval_time);
      };
      auto();
    }
    return () => clearInterval(slide_interval);
  }, [currentSlide, slide_interval, auto_scroll]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prev_slide} />
      <AiOutlineArrowRight className="arrow next" onClick={next_slide} />

      {
        sliderData.map((slide, index) => {
        const { image, heading } = slide;
        return (
          <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <a href="#product" className="btn_shop">Shop Now</a>
                </div>
              </>
            )}
          </div>
        );
      })
      }
    </div>
  );
};

export default Slider;
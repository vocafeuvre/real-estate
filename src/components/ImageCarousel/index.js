import { CarouselProvider, Slide, Slider, ButtonBack, ButtonNext } from "pure-react-carousel";
import React from "react";
import { Icon, Segment, Image } from "semantic-ui-react";

const ImageCarousel = ({ images }) => (
    <Segment>
        <CarouselProvider
            naturalSlideWidth={3}
            naturalSlideHeight={2}
            totalSlides={images.length}
        >
            <div style={{ position: "relative" }}>
                <ButtonBack
                    style={
                    {
                        border: "none",
                        outline: "none",
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        zIndex: 2,
                        background: "rgba(0,0,0,0)"
                    }
                    }
                >
                    <Icon name="caret left" size="big"/>
                </ButtonBack>
                <ButtonNext 
                    style={
                        {
                            border: "none",
                            outline: "none",
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            zIndex: 2,
                            background: "rgba(0,0,0,0)"
                        }
                    }
                >
                    <Icon name="caret right" size="big" />
                </ButtonNext>
                <Slider trayTag="div" style={{position: "relative"}}>
                    {
                        images.map((image, index) => {
                            return (
                                <Slide tag="div" index={index} key={index}>
                                    <Image src={image.src} fluid />
                                </Slide>
                            )
                        })
                    }
                </Slider>
            </div>
        </CarouselProvider>
    </Segment>
);

export default ImageCarousel;

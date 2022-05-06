import { Carousel, Col } from 'antd';
import React, { Component }  from 'react';

const ImgCarousel = (props) => {
    const images =props.images
    return (
        <Carousel 
        autoplay
        dotPosition//="right"
        effect="fade"//="scrollx"
        >
            {
                images!==null&&images!==undefined&&
                images.map((val,k)=>{
                    return <div className='d-flex justify-content-center' key={k}>
                    <Col xs={24} style={{ padding: 20 }}>
                        <img
                        alt="🚫"
                        src={val}
                        width={"100%"}
                        height={100}
                        />
                    </Col>
                </div>
                })
            }
        </Carousel>
    );
}

export default ImgCarousel;
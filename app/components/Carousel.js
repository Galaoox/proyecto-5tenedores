import React from 'react'
import { Image } from 'react-native-elements';
import CarouselImages from 'react-native-snap-carousel';

export default function Carousel(props) {
    const { arrayImages, height, width } = props;

    const renderItem = ({ item }) => {
        return <Image style={{ width: width, height: height }} source={{ uri: item }} />
    }

    return (
        <CarouselImages
            layout={"default"}
            data={arrayImages}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderItem}
        />
    )
}

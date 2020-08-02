import React from "react";
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Image} from 'react-native-elements';
import {size} from 'lodash';
import {ellipsis} from "../../utils/common";

export default function ListRestaurants(props) {
    const {restaurants} = props;
    return (<View>
        {size(restaurants) > 0 ? (
            <FlatList data={restaurants}
                      renderItem={(restaurant) => <Restaurant restaurant={restaurant}/>}
                      keyExtractor={(item, index) => index.toString()}
            />
        ) : (<View style={styles.loaderRestaurants}>
            <ActivityIndicator size="large"/>
            <Text>Cargando restaurantes</Text>
        </View>)}
    </View>)
}

function Restaurant(props) {
    const {restaurant} = props;
    const {images, name, description, address} = restaurant.item;
    const imageRestaurant = images[0];
    const goRestaurant = () => {
        console.log("oki");
    }

    return (
        <TouchableOpacity onPress={goRestaurant}>
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantImage}>
                    <Image
                        resizeMode="cover"
                        source={imageRestaurant ? {uri: imageRestaurant} : require('../../../assets/img/no-image.png')}
                        PlaceholderContent={<ActivityIndicator color="fff"/>}
                        style={styles.imageRestaurant}
                    />
                </View>
                <View >
                    <Text style={styles.restaurantName}>{name}</Text>
                    <Text style={styles.restaurantAddress}>{address}</Text>
                    <Text style={styles.restaurantDescription}>{ellipsis(description, 60)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loaderRestaurants: {
        marginVertical: 10,
        alignItems: 'center'
    },
    viewRestaurant: {
        flexDirection: "row",
        margin: 10,
    },
    viewRestaurantImage: {
        marginRight: 15
    },
    imageRestaurant: {
        width: 80,
        height: 80
    },
    restaurantName: {
        fontWeight: 'bold'
    },
    restaurantAddress: {
        paddingTop: 10,
        color: 'grey'
    },
    restaurantDescription: {
        paddingTop: 3,
        color: 'grey',
        width: 300
    }
});

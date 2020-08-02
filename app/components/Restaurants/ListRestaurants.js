import React from "react";
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {size} from 'lodash';
import {ellipsis} from "../../utils/common";

export default function ListRestaurants(props) {
    const {restaurants, handleMore, isLoading} = props;
    const navigation = useNavigation();
    return (<View>
        {size(restaurants) > 0 ? (
            <FlatList data={restaurants}
                      renderItem={(restaurant) => <Restaurant restaurant={restaurant} navigation={navigation}/>}
                      keyExtractor={(item, index) => index.toString()}
                      onEndReachedThreshold={0.5}
                      onEndReached={handleMore}
                      ListFooterComponent={<FooterList isLoading={isLoading}/>}
            />
        ) : (<View style={styles.loaderRestaurants}>
            <ActivityIndicator size="large"/>
            <Text>Cargando restaurantes</Text>
        </View>)}
    </View>)
}

function Restaurant(props) {
    const {restaurant, navigation} = props;
    const {images, name, description, address, id} = restaurant.item;
    const imageRestaurant = images && images.length ? images[0] : null;
    const goRestaurant = () => {
        console.log("oki");
        navigation.navigate('restaurant', {id, name})
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
                <View>
                    <Text style={styles.restaurantName}>{name}</Text>
                    <Text style={styles.restaurantAddress}>{address}</Text>
                    <Text style={styles.restaurantDescription}>{ellipsis(description, 60)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function FooterList(props) {
    const {isLoading} = props;
    return isLoading ?
        (<View style={styles.loaderRestaurants}><ActivityIndicator size="large"/></View>) :
        (<View style={styles.notFoundRestaurant}><Text>No hay mas restaurantes</Text></View>);

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
    },
    notFoundRestaurant: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    }
});

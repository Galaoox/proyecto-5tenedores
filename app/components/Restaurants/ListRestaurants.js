import React from "react";
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import {size} from 'lodash';

export default function ListRestaurants(props) {
    const {restaurants} = props;
  //  console.log("#########################################################################################");
  //  console.log("pruebas", restaurants);
  //  console.log("#########################################################################################");
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
   // console.log(restaurant);
    return (
        <View>
            <Text>Elemento</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loaderRestaurants: {
        marginVertical: 10,
        alignItems: 'center'
    }
});

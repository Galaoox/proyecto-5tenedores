import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
// Components
import Restaurants from "../screens/Restaurants/Restaurants";
import AddRestaurant from "../screens/Restaurants/AddRestaurant";
import Restaurant from '../screens/Restaurants/Restaurant';

const Stack = createStackNavigator();

export default function RestaurantsStack() {
    return (
        /**Añado las paginas dentro ,
         * el orden de los stack influye en cual se ve primero*/
        <Stack.Navigator>
            <Stack.Screen
                name="restaurants"
                component={Restaurants}
                options={{
                    title: "Restaurantes",
                }}
            />
            <Stack.Screen
                name="add-restaurant"
                component={AddRestaurant}
                options={{
                    title: "Añadir nuevo Restaurante",
                }}
            />
            <Stack.Screen name="restaurant" component={Restaurant}/>
        </Stack.Navigator>
    );
}

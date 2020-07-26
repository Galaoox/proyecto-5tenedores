import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Components
import Restaurants from "../screens/Restaurants/Restaurants";

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
                name="add-restaurants"
                component={Restaurants}
                options={{
                    title: "Añadir Restaurantes",
                }}
            />
        </Stack.Navigator>
    );
}

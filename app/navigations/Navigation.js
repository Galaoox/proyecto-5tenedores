import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Components
import Restaurants from "../screens/Restaurants";
import Account from "../screens/Account";
import Favorites from "../screens/Favorites";
import Search from "../screens/Search";
import TopRestaurants from "../screens/TopRestaurants";

// Creo un componente createBottomTabNavigator para llamarlo mas abajo
const Tab = createBottomTabNavigator();

export default function Navigation() {
  /*todo tiene que estar contenido por el NavigationContainer para que funcione la navegacion
        Dentro del tab deben ir los tab.screen que indicaran cada icono o cada opcion
    */
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="restaurants"
          component={Restaurants}
          options={{
            title: "Restaurantes",
          }}
        />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{
            title: "Favoritos",
          }}
        />
        <Tab.Screen
          name="top-restaurants"
          component={TopRestaurants}
          options={{
            title: "Top 5",
          }}
        />
        <Tab.Screen
          name="search"
          component={Search}
          options={{
            title: "Buscar",
          }}
        />
        <Tab.Screen
          name="account"
          component={Account}
          options={{
            title: "Cuenta",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

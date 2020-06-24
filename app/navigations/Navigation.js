import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Stacks
import RestaurantsStack from "./RestaurantsStack";
import FavoritesStack from "./FavoritesStack";
import AccountStack from "./AccountStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";

// components

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
          component={RestaurantsStack}
          options={{
            title: "Restaurantes",
          }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{
            title: "Favoritos",
          }}
        />
        <Tab.Screen
          name="top-restaurants"
          component={TopRestaurantsStack}
          options={{
            title: "Top 5",
          }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{
            title: "Buscar",
          }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{
            title: "Cuenta",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

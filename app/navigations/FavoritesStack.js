import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import Favorites from "../screens/Favorites";

const Stack = createStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorite"
        component={Favorites}
        options={{
          title: "Favoritos",
        }}
      />
    </Stack.Navigator>
  );
}

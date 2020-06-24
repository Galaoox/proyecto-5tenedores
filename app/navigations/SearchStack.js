import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// Components
import Search from "../screens/Search";

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: "Buscar",
        }}
      />
    </Stack.Navigator>
  );
}

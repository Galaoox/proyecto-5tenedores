import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../../theme/colors";

export default function Restaurants() {
    return (
        <View style={styles.viewBody}>
            <Text>Restaurans....</Text>

            <Icon
                reverse
                type="material-community"
                name="plus"
                color={colors.green}
                containerStyle={styles.btnContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: colors.white,
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    },
});

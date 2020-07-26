import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../../theme/colors";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";

export default function Restaurants() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo);
        });
    }, []);
    return (
        <View style={styles.viewBody}>
            <Text>Restaurans....</Text>

            {user && (
                <Icon
                    reverse
                    type="material-community"
                    name="plus"
                    color={colors.green}
                    containerStyle={styles.btnContainer}
                />
            )}
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

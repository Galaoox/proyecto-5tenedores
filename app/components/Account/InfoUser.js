import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-elements";

export default function InfoUser(props) {
    const {
        userInfo: { photoURL, displayName, email },
    } = props;
    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                showEditButton
                rounded
                size="large"
                containerStyle={styles.userInfoAvatar}
                source={
                    photoURL
                        ? { uri: photoURL }
                        : require("../../../assets/img/avatar-default.jpg")
                }
                showAccessory
            />
            <View>
                <Text>Erick Andres Vergara Noriega</Text>
                <Text>erickandres30@gmail.com</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingBottom: 30,
        paddingTop: 30,
    },
    userInfoAvatar: {
        marginRight: 20,
    },
});

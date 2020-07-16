import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
    const {
        userInfo: { photoURL, displayName, email },
        toastRef,
    } = props;

    const changeAvatar = async () => {
        const resultsPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        const resultsPermissionsCamera =
            resultsPermissions.permissions.cameraRoll.status;

        if (resultsPermissionsCamera === "denied") {
            toastRef.current.show(
                "Es necesario aceptar los permisos de la galeria"
            );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
        }
    };

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
                onAccessoryPress={changeAvatar}
            />
            <View>
                <Text>{displayName ? displayName : "Anónimo"}</Text>
                <Text>{email ? email : "Social login"}</Text>
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

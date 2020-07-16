import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
    const {
        userInfo: { uid, photoURL, displayName, email },
        toastRef,
    } = props;
    console.log(photoURL);
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
            if (result.cancelled) {
                toastRef.current.show("Has cerrado la seleccipón de imagenes");
            } else {
                uploadImage(result.uri)
                    .then(() => {
                        updateUrl();
                    })
                    .catch(() => {
                        toastRef.current.show("Error actualizar el avatar");
                    });
            }
        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
            .storage()
            .ref()
            .child("avatar/" + uid);
        return ref.put(blob);
    };

    const updateUrl = () => {
        firebase
            .storage()
            .ref("avatar/" + uid)
            .getDownloadURL()
            .then(async (response) => {
                console.log(response);
                const update = {
                    photoURL: response,
                };
                console.log(update, uid);
                await firebase.auth().currentUser.updateProfile(update);
            })
            .catch(() => {});
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

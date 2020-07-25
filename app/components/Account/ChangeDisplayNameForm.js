import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
    const { displayName, setShowModal, toastRe, setReloadUserInfo } = props;
    const [newDisplayName, setNewDisplayName] = useState(displayName);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = () => {
        setError(null);
        if (!newDisplayName) {
            setError("El nombre es requerido.");
        } else if (newDisplayName === displayName) {
            setError("El nombre no puede ser igual al actual.");
        } else {
            setIsLoading(true);
            const update = {
                displayName: newDisplayName,
            };
            firebase
                .auth()
                .currentUser.updateProfile(update)
                .then(() => {
                    setReloadUserInfo(true);
                    setIsLoading(false);
                    setShowModal(false);
                })
                .catch((error) => {
                    setError("Error al acutalizar  el nombre.");
                    setIsLoading(false);
                });
        }
    };

    return (
        <View style={styles.view}>
            <Input
                label="Nombre y apellidos"
                placeholder="Nombre y apellidos"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2",
                }}
                defaultValue={displayName || ""}
                onChange={(event) => setNewDisplayName(event.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10,
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
    },
    btn: {
        backgroundColor: "#00a680",
    },
});

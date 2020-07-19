import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api";
import { iconPassword } from "../../utils/common";
import { size } from "lodash";

export default function ChangePasswordForm(props) {
    const { setShowModal, toastRef } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [showActualPassword, setShowActualPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    return (
        <View style={styles.view}>
            <Input
                label="Contraseña actual"
                placeholder="Contraseña actual"
                secureTextEntry={!showActualPassword}
                rightIcon={iconPassword(
                    showActualPassword,
                    setShowActualPassword
                )}
            />
            <Input
                label="Nueva contraseña"
                placeholder="Nueva contraseña"
                secureTextEntry={!showNewPassword}
                rightIcon={iconPassword(showNewPassword, setShowNewPassword)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10,
    },
});

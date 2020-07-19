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
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValueFormData());
    const [errors, setErrors] = useState({});
    const onChange = (event, type) => {
        setFormData({ ...formData, [type]: event.nativeEvent.text });
    };
    const onSubmit = () => {
        set;
        setErrors({});
        if (
            !formData.password ||
            !formData.confirmPassword ||
            !formData.newPassword
        ) {
        }
        console.log(formData);
    };
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
                onChange={(event) => onChange(event, "password")}
                errorMessage={errors.password}
            />
            <Input
                label="Nueva contraseña"
                placeholder="Nueva contraseña"
                secureTextEntry={!showNewPassword}
                rightIcon={iconPassword(showNewPassword, setShowNewPassword)}
                onChange={(event) => onChange(event, "newPassword")}
                errorMessage={errors.newPassword}
            />
            <Input
                label="Confirmar contraseña"
                placeholder="Confirmar contraseña"
                secureTextEntry={!showConfirmPassword}
                rightIcon={iconPassword(
                    showConfirmPassword,
                    setShowConfirmPassword
                )}
                onChange={(event) => onChange(event, "confirmPassword")}
                errorMessage={errors.confirmPassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

function defaultValueFormData() {
    return {
        password: null,
        newPassword: null,
        confirmPassword: null,
    };
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

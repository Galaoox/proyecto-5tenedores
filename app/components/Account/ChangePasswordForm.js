import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button, Input} from "react-native-elements";
import * as firebase from "firebase";
import {reauthenticate} from "../../utils/api";
import {iconPassword} from "../../utils/common";
import {size} from "lodash";

export default function ChangePasswordForm(props) {
    const {setShowModal, toastRef} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [showActualPassword, setShowActualPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValueFormData());
    const [errors, setErrors] = useState({});
    const onChange = (event, type) => {
        setFormData({...formData, [type]: event.nativeEvent.text});
    };
    const onSubmit = async () => {
        let isSetError = true;
        let errorsTemp = {};
        setErrors({});
        if (
            !formData.password ||
            !formData.confirmPassword ||
            !formData.newPassword
        ) {
            errorsTemp = {
                password: formData.password
                    ? ""
                    : "La contraseña es requerida.",
                newPassword: formData.newPassword
                    ? ""
                    : "La contraseña es requerida.",
                confirmPassword: formData.confirmPassword
                    ? ""
                    : "La contraseña es requerida.",
            };
        } else if (formData.confirmPassword !== formData.newPassword) {
            errorsTemp = {
                newPassword: "Las contraseñas no son iguales.",
                confirmPassword: "Las contraseñas no son iguales.",
            };
        } else if (size(formData.newPassword) < 6) {
            errorsTemp = {
                newPassword: "La contraseña debe tener minimo 6 caracteres.",
                confirmPassword:
                    "La contraseña debe tener minimo 6 caracteres.",
            };
        } else {
            setIsLoading(true);
            await reauthenticate(formData.password)
                .then(async () => {
                    await firebase
                        .auth()
                        .currentUser.updatePassword(formData.newPassword)
                        .then(() => {
                            isSetError = false;
                            setIsLoading(false);
                            firebase.auth().signOut();
                            toastRef.current.show(
                                "Contraseña actualizada correctamente"
                            );
                            setShowModal(false);
                        })
                        .catch(() => {
                            errorsTemp = {
                                other: "Error al actualizar la contraseña.",
                            };
                            setIsLoading(false);
                        });
                })
                .catch(() => {
                    errorsTemp = {
                        password: "La contraseña ingresada es incorrecta.",
                    };
                    setIsLoading(false);
                });
        }
        isSetError && setErrors(errorsTemp);
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
            <Text style={styles.error}>{errors.other}</Text>
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
    error: {
        color: "#FF0000",
        textAlign: "center",
    },
});

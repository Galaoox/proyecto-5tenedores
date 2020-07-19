import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api";
import { size } from "lodash";

export default function ChangeDisplayNameForm(props) {
    const { email, setShowModal, toastRef, setReloadUserInfo } = props;
    const [formData, setFormData] = useState(defaultValueFormData(email));
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const onChange = (event, type) => {
        setFormData({ ...formData, [type]: event.nativeEvent.text });
    };
    const onSubmit = () => {
        setErrors({});
        if (!formData.email) {
            setErrors({
                email: "El correo electronico es requerido",
            });
        } else if (formData.email == email) {
            setErrors({
                email: "El correo electronico no puede ser igual al actual",
            });
        } else if (validateEmail(formData.email)) {
            setErrors({
                email: "El correo electronico es invalido",
            });
        } else if (!formData.password) {
            setErrors({
                password: "La contraseña es requerida",
            });
        } else {
            setIsLoading(true);
            reauthenticate(formData.password)
                .then((response) => {
                    console.log(response);
                    firebase
                        .auth()
                        .currentUser.updateEmail(formData.email)
                        .then(() => {
                            setIsLoading(false);
                            setReloadUserInfo(true);
                            toastRef.current.show(
                                "Correo electronico actualizado correctamente"
                            );
                            setShowModal(false);
                        })
                        .catch(() =>
                            setErrors({
                                email:
                                    "Error al actualizar el correo electronico",
                            })
                        );
                })
                .catch((error) => {
                    setIsLoading(false);

                    setErrors({ password: "La contraseña es incorrecta" });
                });
        }
    };

    return (
        <View style={styles.view}>
            <Input
                label="Nuevo correo electronico"
                placeholder="Nuevo correo electronico"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2",
                }}
                defaultValue={email || ""}
                onChange={(event) => onChange(event, "email")}
                errorMessage={errors.email}
            />
            <Input
                label="Contraseña"
                placeholder="Contraseña"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: !showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword),
                }}
                secureTextEntry={!showPassword}
                onChange={(event) => onChange(event, "password")}
                errorMessage={errors.password}
            />
            <Button
                title="Cambiar correo electronico"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

function defaultValueFormData(email = null) {
    return {
        email: email,
        password: null,
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

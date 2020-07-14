import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../../components/Loading";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onSumit = () => {
        if (
            isEmpty(formData.email) ||
            isEmpty(formData.password) ||
            isEmpty(formData.repeatPassord)
        ) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else if (validateEmail(formData.email)) {
            toastRef.current.show("El correo electronico es invalido");
        } else if (formData.password != formData.repeatPassord) {
            toastRef.current.show("Las contraseñas no coinciden");
        } else if (size(formData.password) < 6) {
            toastRef.current.show(
                "La contraseña debe tener minimo 6 caracteres"
            );
        } else {
            setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    formData.email,
                    formData.password
                )
                .then((response) => {
                    setLoading(false);
                    navigation.navigate("account");
                })
                .catch((err) => {
                    setLoading(false);
                    toastRef.current.show(
                        "El correo electronico ya esta en uso"
                    );
                });
        }
    };
    const onChange = (event, type) => {
        setFormData({ ...formData, [type]: event.nativeEvent.text });
    };

    return (
        <View style={styles.viewContainer}>
            <Input
                label="Correo electronico"
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={(event) => onChange(event, "email")}
                rightIcon={
                    <Icon
                        type="material-community"
                        iconStyle={styles.iconRight}
                        name="at"
                    />
                }
            />
            <Input
                label="Contraseña"
                secureTextEntry={showPassword}
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                onChange={(event) => onChange(event, "password")}
                rightIcon={
                    <Icon
                        type="material-community"
                        iconStyle={styles.iconRight}
                        name={!showPassword ? "eye-off-outline" : "eye-outline"}
                        onPress={() => {
                            setShowPassword(!showPassword);
                        }}
                    />
                }
            />
            <Input
                label="Repetir contraseña"
                secureTextEntry={showRepeatPassword}
                placeholder="Repetir contraseña"
                containerStyle={styles.inputForm}
                onChange={(event) => onChange(event, "repeatPassord")}
                rightIcon={
                    <Icon
                        type="material-community"
                        iconStyle={styles.iconRight}
                        name={
                            !showRepeatPassword
                                ? "eye-off-outline"
                                : "eye-outline"
                        }
                        onPress={() => {
                            setShowRepeatPassword(!showRepeatPassword);
                        }}
                    />
                }
            />
            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSumit}
            />
            <Loading isVisible={loading} text="Creando cuenta" />
        </View>
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: "",
        repeatPassord: "",
    };
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    btnContainerRegister: {
        width: "95%",
        marginTop: 20,
    },
    btnRegister: {
        backgroundColor: "#00a680",
    },
    iconRight: {
        color: "#c1c1c1",
    },
});

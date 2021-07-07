import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Input} from "react-native-elements";
import {isEmpty} from "lodash";
import * as firebase from "firebase";
import {validateEmail} from "../../utils/validations";
import {iconEmail, iconPassword} from "../../utils/common";
import {useNavigation} from "@react-navigation/native";
import Loading from "../Loading";

export default function LoginForm(props) {
    const navigation = useNavigation();
    const {toastRef} = props;
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const onChange = (event, type) => {
        setFormData({...formData, [type]: event.nativeEvent.text});
    };

    const onSubmit = () => {
        if (isEmpty(formData.email) || isEmpty(formData.password)) {
            toastRef.current.show("Todos los campos son requeridos");
        } else if (validateEmail(formData.email)) {
            toastRef.current.show("El correo electronico es invalido");
        } else {
            setLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then((response) => {
                    setLoading(false);
                    navigation.navigate("account");
                })
                .catch((error) => {
                    setLoading(false);
                    toastRef.current.show(
                        "Correo electronico o contraseña incorrectos"
                    );
                });
        }
    };

    return (
        <View style={styles.formContainer}>
            <Input
                label="Correo electronico"
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                rightIcon={iconEmail}
                onChange={(event) => {
                    onChange(event, "email");
                }}
            />
            <Input
                label="Contraseña"
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                secureTextEntry={!showPassword}
                rightIcon={iconPassword(showPassword, setShowPassword)}
                onChange={(event) => {
                    onChange(event, "password");
                }}
            />
            <Button
                title="Iniciar sesión"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Iniciando sesión"/>
        </View>
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: "",
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    btnContainerLogin: {
        marginTop: 20,
        width: "95%",
    },
    btnLogin: {
        backgroundColor: "#00a680",
    },
});

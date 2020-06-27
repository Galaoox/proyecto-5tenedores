import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function RegisterForm() {
    return (
        <View style={styles.viewContainer}>
            <Input
                label="Correo electronico"
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
            />
            <Input
                label="Contraseña"
                secureTextEntry={true}
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
            />
            <Input
                label="Repetir contraseña"
                secureTextEntry={true}
                placeholder="Repetir contraseña"
                containerStyle={styles.inputForm}
            />
            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        // flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
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
});

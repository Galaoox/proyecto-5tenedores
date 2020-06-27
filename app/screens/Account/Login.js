import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Divider } from "react-native-elements";

export default function Login() {
    return (
        <ScrollView>
            <Image
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <Text>Login FORM</Text>
                <CreateAccount />
            </View>
            <Divider style={styles.divider} />
            <Text>Social login</Text>
        </ScrollView>
    );
}

function CreateAccount(props) {
    return (
        <Text style={styles.textRegister}>
            ¿Aun no tienes una cuenta?{" "}
            <Text
                style={styles.btnRegister}
                onPress={() => {
                    console.log("registro");
                }}
            >
                Registrate
            </Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        marginTop: 20,
        height: 150,
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40,
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegister: {
        color: "#00a680",
        fontWeight: "bold",
    },
    divider: {
        backgroundColor: "#00a680",
        margin: 40,
    },
});
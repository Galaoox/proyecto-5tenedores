import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    Dimensions,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";

export default function AddREstaurantForm() {
    return (
        <ScrollView style={styles.scrollView}>
            <FormAdd />
        </ScrollView>
    );
}

function FormAdd() {
    return (
        <View styles={styles.viewForm}>
            <Input
                label="Nombre"
                placeholder="Nombre"
                containerStyle={styles.input}
            />
            <Input
                label="Dirección"
                placeholder="Dirección"
                containerStyle={styles.input}
            />
            <Input
                label="Descripción"
                placeholder="Descripción"
                multiline={true}
                inputContainerStyle={styles.textArea}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
    },
    viewForm: {
        marginHorizontal: 10,
    },
    input: {
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        width: "100%",
        margin: 0,
        padding: 0,
    },
});

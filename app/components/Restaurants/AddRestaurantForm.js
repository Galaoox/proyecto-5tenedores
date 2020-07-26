import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    Dimensions,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { colors } from "../../theme/colors";

export default function AddREstaurantForm(props) {
    const { setIsLoading, toastRef } = props;
    const addRestaurant = () => {
        console.log({
            restaurantName,
            restaurantAdress,
            restaurantDescription,
        });
    };

    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAdress, setRestaurantAdress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");

    return (
        <ScrollView style={styles.scrollView}>
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAdress={setRestaurantAdress}
                setRestaurantDescription={setRestaurantDescription}
            />
            <Button
                title="Cambiar correo electronico"
                buttonStyle={styles.btn}
                onPress={addRestaurant}
            />
        </ScrollView>
    );
}

function FormAdd(props) {
    const {
        setRestaurantName,
        setRestaurantAdress,
        setRestaurantDescription,
    } = props;
    return (
        <View styles={styles.viewForm}>
            <Input
                label="Nombre"
                placeholder="Nombre"
                containerStyle={styles.input}
                onChange={(event) => setRestaurantName(event.nativeEvent.text)}
            />
            <Input
                label="Dirección"
                placeholder="Dirección"
                containerStyle={styles.input}
                onChange={(event) =>
                    setRestaurantAdress(event.nativeEvent.text)
                }
            />
            <Input
                label="Descripción"
                placeholder="Descripción"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(event) =>
                    setRestaurantDescription(event.nativeEvent.text)
                }
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

    btn: {
        backgroundColor: colors.green,
        margin: 20,
    },
});

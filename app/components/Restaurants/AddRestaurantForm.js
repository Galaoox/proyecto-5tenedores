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

export default function AddRestaurantForm(props) {
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
            <UploadImage/>
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

function UploadImage(){
    const imageSelected = ()=>{
        console.log('Seleccionada imagen')
    }
    return (
        <View style={styles.viewImage}>
            <Icon type="material-community" name="camera" color="#7A7A7A" containerStyle={styles.containerIcon} />
        </View>
    )
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
    viewImage:{
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
});

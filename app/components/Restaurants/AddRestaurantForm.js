import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { colors } from "../../theme/colors";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { size, remove } from "lodash";

const widthScreen = Dimensions.get("window").width; // asi obtengo el ancho de la pantalla

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
    const [imagesSelected, setImagesSelected] = useState([]);

    return (
        <ScrollView style={styles.scrollView}>
            <ImageRestaurant imageRestaurant={imagesSelected[0]} />
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAdress={setRestaurantAdress}
                setRestaurantDescription={setRestaurantDescription}
            />
            <UploadImage
                toastRef={toastRef}
                setImagesSelected={setImagesSelected}
                imagesSelected={imagesSelected}
            />
            <Button
                title="Cambiar correo electronico"
                buttonStyle={styles.btn}
                onPress={addRestaurant}
            />
        </ScrollView>
    );
}

function ImageRestaurant(props) {
    const { imageRestaurant } = props;
    return (
        <View style={styles.viewPhoto}>
            <Image
                source={
                    imageRestaurant
                        ? { uri: imageRestaurant }
                        : require("../../../assets/img/no-image.png")
                }
                style={{ width: widthScreen, height: 200 }}
            />
        </View>
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

function UploadImage(props) {
    const { toastRef, setImagesSelected, imagesSelected } = props;
    const imageSelected = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        if (resultPermissions == "denied") {
            await toastRef.current.show(
                "Es necesario aceptar los permisos de la camara",
                3000
            );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (result.cancelled) {
                await toastRef.current.show(
                    "Has cerrado  la galeria sin seleccionar una imagen",
                    3000
                );
            } else {
                await setImagesSelected([...imagesSelected, result.uri]);
            }
        }
    };

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estas seguro de que quieres eliminar la imagen?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "default",
                    onPress: () => {
                        const result = imagesSelected.filter(
                            (imageElement) => imageElement != image
                        );
                        setImagesSelected(result);
                    },
                },
            ]
        );
    };
    return (
        <View style={styles.viewImage}>
            {size(imagesSelected) < 5 && (
                <TouchableOpacity onPress={imageSelected}>
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7A7A7A"
                        containerStyle={styles.containerIcon}
                    />
                </TouchableOpacity>
            )}
            <ScrollView horizontal={true}>
                {imagesSelected.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        onLongPress={() => removeImage(image)}
                    >
                        <Avatar
                            source={{ uri: image }}
                            style={styles.miniatureStyle}
                            key={index}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
    viewImage: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30,
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
    },
});

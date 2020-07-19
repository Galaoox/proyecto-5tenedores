import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "../Account/ChangeDisplayNameForm";
import ChangeEmailForm from "../Account/ChangeEmailForm";

export default function AccountOptions(props) {
    const { toastRef, userInfo, setReloadUserInfo } = props;
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                break;
            case "password":
                setRenderComponent(<Text>Contraseña</Text>);
                break;

            default:
                setRenderComponent(null);
                break;
        }
        setShowModal(true);
    };
    const menuOptions = generateOptions(selectedComponent);

    return (
        <View>
            {menuOptions.map((menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft,
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight,
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                />
            ))}
            {renderComponent && (
                <Modal
                    isVisible={showModal}
                    setIsVisible={setShowModal}
                    children={renderComponent}
                ></Modal>
            )}
        </View>
    );
}

function generateOptions(selectedComponent) {
    return [
        {
            title: "Cambiar Nombres y Apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("displayName"),
        },
        {
            title: "Cambiar Correo Electronico",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("email"),
        },
        {
            title: "Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("password"),
        },
    ];
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#3e3e3e",
    },
});
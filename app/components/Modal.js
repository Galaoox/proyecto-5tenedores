import React from "react";
import {StyleSheet} from "react-native";
import {Overlay} from "react-native-elements";

export default function Modal(props) {
    const {isVisible, setIsVisible, children} = props;
    const closeModal = () => setIsVisible(false);
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.overlay}
            backdropStyle={styles.overlayBackdrop}
            onBackdropPress={closeModal}
        >
            {children}
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlayBackdrop: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    overlay: {
        height: "auto",
        width: "90%",
    },
});

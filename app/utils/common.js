export function iconPassword(showPassword, setShowPassword) {
    return {
        type: "material-community",
        name: !showPassword ? "eye-off-outline" : "eye-outline",
        color: "#c2c2c2",
        onPress: () => setShowPassword(!showPassword),
    };
}

export const iconEmail = {
    type: "material-community",
    name: "at",
    color: "#c2c2c2",
};

/**
 * Recorta un string dependiendo de la cantidad de caracteres que se indique
 */
export function ellipsis(text, numberCharacters) {
    return text && text.length > numberCharacters ? text.substring(0, numberCharacters) + '...' : text;
}

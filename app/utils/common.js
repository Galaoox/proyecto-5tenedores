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

import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/style.js";

function FlatButton({ children, onPress, textStyle }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
  },

  buttonText: {
    color: Colors.primary500,
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 8,
    textAlign: "center",
  },
});

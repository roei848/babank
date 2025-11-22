import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/style.js";

function Button({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary500,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },

  pressed: {
    opacity: 0.85,
  },

  buttonText: {
    color: Colors.primary800,
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
});

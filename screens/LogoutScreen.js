// screens/LogoutScreen.js
import { useContext, useCallback } from "react";
import { Alert } from "react-native";
import { logout as firebaseLogout } from "../api/auth";
import { AuthContext } from "../store/auth-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function LogoutScreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      Alert.alert(
        "Log out",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => navigation.goBack(),
          },
          {
            text: "Yes",
            style: "destructive",
            onPress: async () => {
              await firebaseLogout();
              authCtx.logout();
            },
          },
        ],
        { cancelable: false }
      );
    }, [navigation, authCtx])
  );

  return null;
}

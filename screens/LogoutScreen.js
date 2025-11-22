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
        "התנתקות",
        "האם אתה בטוח שברצונך להתנתק?",
        [
          {
            text: "ביטול",
            style: "cancel",
            onPress: () => navigation.goBack(),
          },
          {
            text: "כן",
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

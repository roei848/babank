import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReportsProvider from "./store/ReportContext";
import AuthContextProvider from "./store/auth-context";
import { AuthContext } from "./store/auth-context";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import HistoryReportsScreen from "./screens/HistoryReportsScreen";
import AddReportScreen from "./screens/AddReportScreen";
import ReportDetailsScreen from "./screens/ReportDetailsScreen";

const Stack = createNativeStackNavigator();

// ----- Auth stack -----
function AuthStack() {
  console.log("got here in AuthStack");

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{ title: "Create Account" }}
      />
    </Stack.Navigator>
  );
}

// ----- Authenticated stack -----
function AuthenticatedStack() {
  console.log("got here in AuthenticatedStack");

  return (
    <ReportsProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="HistoryReports" component={HistoryReportsScreen} />
        <Stack.Screen name="AddReport" component={AddReportScreen} />
        <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
      </Stack.Navigator>
    </ReportsProvider>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  console.log("got here in Navigation", authCtx);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

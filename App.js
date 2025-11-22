// Global JS Error Handler
if (global.ErrorUtils) {
  const defaultHandler = global.ErrorUtils.getGlobalHandler();

  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.log("GLOBAL JS ERROR CAUGHT:", error);
    alert("JS ERROR: " + error.message);
    defaultHandler(error, isFatal);
  });
}

import { useContext } from "react";
import { I18nManager, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReportsProvider from "./store/report-context";
import AuthContextProvider from "./store/auth-context";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthContext } from "./store/auth-context";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ReportDetailsScreen from "./screens/ReportDetailsScreen";
import TabNavigator from "./navigation/TabNavigator";
import AddJsonReportScreen from "./screens/AddJsonReportScreen";

// Enable RTL (only once)
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);


const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTitleAlign: "right",
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: () => (
            <Text style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "right",
              width: "100%",
              writingDirection: "rtl",
            }}>
              כניסה
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{
          headerTitle: () => (
            <Text style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "right",
              width: "100%",
              writingDirection: "rtl",
            }}>
              יצירת חשבון
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
}


// ----- Authenticated stack -----
function AuthenticatedStack() {
  return (
    <ReportsProvider>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "right",
          headerTitleStyle: { writingDirection: "rtl", textAlign: "right" },
        }}
      >
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
        <Stack.Screen name="AddJsonReport" component={AddJsonReportScreen} />
      </Stack.Navigator>
    </ReportsProvider>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <>
        <StatusBar style="auto" />
        <AuthContextProvider>
          <Navigation />
        </AuthContextProvider>
      </>
    </ErrorBoundary>
  );
}

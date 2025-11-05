import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import HistoryReportsScreen from "./screens/HistoryReportsScreen";
import AddReportScreen from "./screens/AddReportScreen";
import ReportDetailsScreen from "./screens/ReportDetailsScreen";
import { ReportsProvider } from "./context/ReportContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <ReportsProvider userId="temp1">
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HistoryReports"
            component={HistoryReportsScreen}
          />
          <Stack.Screen name="AddReport" component={AddReportScreen} />
          <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
        </Stack.Navigator>
      </ReportsProvider>
    </NavigationContainer>
  );
}

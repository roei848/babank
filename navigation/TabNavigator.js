// navigation/MainTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import HistoryReportsScreen from "../screens/HistoryReportsScreen";
import AddReportScreen from "../screens/AddReportScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.2,
          borderTopColor: "#ccc",
          height: 60,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "History") iconName = "list-outline";
          else if (route.name === "Add Report") iconName = "add-circle-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryReportsScreen} />
      <Tab.Screen name="Add Report" component={AddReportScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import HistoryReportsScreen from "../screens/HistoryReportsScreen";
import AddReportScreen from "../screens/AddReportScreen";
import LogoutScreen from "../screens/LogoutScreen";
import { Colors } from "../constants/style";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: Colors.primary500,
        tabBarInactiveTintColor: Colors.primary800,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 0.4,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 6,
        },
        headerStyle: {
          backgroundColor: Colors.surface,
        },
        headerTintColor: Colors.primary800,
        swipeEnabled: false,
        tabBarHideOnKeyboard: true
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "בית",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryReportsScreen}
        options={{
          title: "היסטוריה",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddReport"
        component={AddReportScreen}
        options={{
          title: "הוספת דו\"ח",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          title: "התנתקות",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs>
        <Tabs.Screen
            name="index"
            options={{
            title: "Market",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="cart" size={size} color={color} />
            ),
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
            ),
            }}
        />
        </Tabs>
    );
}
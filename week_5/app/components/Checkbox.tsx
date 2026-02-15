import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckboxProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    error?: string;
    touched?: boolean;
}

export default function Checkbox({
    value,
    onValueChange,
    error,
    touched,
}: CheckboxProps) {
    const hasError = touched && error;

    return (
        <View className="mt-4">
        <Pressable
            onPress={() => onValueChange(!value)}
            className="flex-row items-center"
        >
            <View
            className={`w-6 h-6 border-2 rounded-md items-center justify-center mr-3
            ${value ? "bg-blue-600 border-blue-600" : "border-gray-400"}
            ${hasError ? "border-red-500" : ""}
            `}
            >
            {value && <Ionicons name="checkmark" size={16} color="white" />}
            </View>

            <Text className="text-gray-700 text-base">
            ฉันยอมรับข้อกำหนดและเงื่อนไข
            </Text>
        </Pressable>

        {hasError && (
            <Text className="text-red-500 text-sm mt-1">
            {error}
            </Text>
        )}
        </View>
    );
}

import React from "react";
import { View, Text, Pressable } from "react-native";

interface GenderRadioProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    touched?: boolean;
}

const options: { label: string; value: string }[] = [
    { label: "ชาย", value: "male" },
    { label: "หญิง", value: "female" },
    { label: "ไม่ระบุ", value: "other" },
];

export default function GenderRadio({
    value,
    onChange,
    error,
    touched,
    }: GenderRadioProps) {
    const hasError = touched && error;

    return (
        <View className="mt-4">
        <Text className="text-gray-700 font-semibold mb-2 text-base">
            เพศ
        </Text>

        <View className="flex-row items-center">
            {options.map((item) => {
            const selected = value === item.value;

            return (
                <Pressable
                key={item.value}
                onPress={() => onChange(item.value)}
                className="flex-row items-center mr-6"
                >
                <View
                    className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-2
                    ${selected ? "border-blue-600" : "border-gray-400"}
                    ${hasError ? "border-red-500" : ""}
                    `}
                >
                    {selected && (
                    <View className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    )}
                </View>

                <Text className="text-gray-700">{item.label}</Text>
                </Pressable>
            );
            })}
        </View>

        {hasError && (
            <Text className="text-red-500 text-sm mt-1">
            {error}
            </Text>
        )}
        </View>
    );
}

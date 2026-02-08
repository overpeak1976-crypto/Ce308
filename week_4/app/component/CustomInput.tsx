import { View, Text, TextInput } from "react-native";

type CustomInputProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: "default" | "numeric";
};

export const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
}: CustomInputProps) => {
    return (
        <View className="mb-4">
        <Text className="text-sm text-gray-700 mb-1">{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                />
        </View>
    );
};

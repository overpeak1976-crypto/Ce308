import { Text, TouchableOpacity, View } from "react-native";

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
};

export const CustomButton = ({
    title,
    onPress,
    variant = "primary",
    size = "md",
}: CustomButtonProps) => {
    const variantClasses = {
        primary: "bg-blue-500",
        secondary: "bg-gray-400",
        danger: "bg-red-500",
    };

    const sizeClasses = {
        sm: "px-3 py-1",
        md: "px-4 py-1.5",
        lg: "px-5 py-2",
    };

    return (
        <View className="self-start rounded-md overflow-hidden">
            <TouchableOpacity
                onPress={onPress}
                className={[
                "active:bg-opacity-70",
                variantClasses[variant],
                sizeClasses[size],
                ].join(" ")}
            >
                <Text className="text-white text-sm font-medium text-center">
                {title}
                </Text>
            </TouchableOpacity>
        </View>
    );
};


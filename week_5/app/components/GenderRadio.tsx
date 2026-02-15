import React from "react";
import { View, Text, Pressable } from "react-native";

interface GenderRadioProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const options = ["ชาย", "หญิง", "ไม่ระบุ"];

const GenderRadio: React.FC<GenderRadioProps> = ({
    value,
    onChange,
    error,
    }) => {
    return (
        <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 8, fontWeight: "600" }}>
            เลือกเพศ *
        </Text>

        {/* Horizontal Layout */}
        <View style={{ flexDirection: "row" }}>
            {options.map((item) => (
            <Pressable
                key={item}
                onPress={() => onChange(item)}
                style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
                }}
            >
                {/* วงกลม */}
                <View
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#333",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 6,
                }}
                >
                {value === item && (
                    <View
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#333",
                    }}
                    />
                )}
                </View>

                <Text>{item}</Text>
            </Pressable>
            ))}
        </View>

        {error && (
            <Text style={{ color: "red", marginTop: 4 }}>
            {error}
            </Text>
        )}
        </View>
    );
};

export default GenderRadio;

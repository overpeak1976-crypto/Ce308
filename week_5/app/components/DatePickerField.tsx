import React, { useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
    value: Date | null;
    onChange: (date: Date) => void;
    error?: string;
}

const DatePickerField: React.FC<Props> = ({
    value,
    onChange,
    error,
}) => {
    const [show, setShow] = useState(false);

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 8, fontWeight: "600" }}>
            วันเกิด *
        </Text>

        <Pressable
            onPress={() => setShow(true)}
            style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 6,
            }}
        >
            <Text>
            {value ? formatDate(value) : "เลือกวันเกิด"}
            </Text>
        </Pressable>

        {show && (
            <DateTimePicker
            value={value || new Date()}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
                setShow(Platform.OS === "ios");
                if (selectedDate) {
                onChange(selectedDate);
                }
            }}
            />
        )}

        {error && (
            <Text style={{ color: "red", marginTop: 4 }}>
            {error}
            </Text>
        )}
        </View>
    );
};

export default DatePickerField;

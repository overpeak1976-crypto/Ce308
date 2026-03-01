import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.name}>Nantawat Vijitkul</Text>
        <Text>66110693@dpu.ac.th</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 20, marginBottom: 20 },
    name: { fontSize: 18, fontWeight: "bold" },
});
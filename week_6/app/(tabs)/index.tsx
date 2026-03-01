import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const products = [
    {
        id: "1",
        name: "Premium Coffee Bean",
        price: 450,
        description: "เมล็ดกาแฟคุณภาพสูงจากดอย",
    },
    {
        id: "2",
        name: "Green Tea Powder",
        price: 290,
        description: "ชาเขียวแท้ 100%",
    },
    {
        id: "3",
        name: "Oat Milk 1L",
        price: 115,
        description: "นมโอ๊ตเพื่อสุขภาพ",
    },
];

export default function MarketScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                router.push({
                    pathname: "/details",
                    params: {
                    name: item.name,
                    price: item.price.toString(),
                    description: item.description,
                    },
                })
                }
            >
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>฿{item.price}</Text>
            </TouchableOpacity>
            )}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 3,
    },
    name: { fontSize: 16, fontWeight: "bold" },
    price: { color: "green", marginTop: 4 },
});
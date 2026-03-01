// import { View, Text, Button } from "react-native";
// import { router } from "expo-router";

// export default function DetailsScreen() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text style={{ fontSize: 24, marginBottom: 20 }}>Details Screen</Text>

//     <Button
//         title="Go Back"
//         onPress={() => router.back()}
//     />

//     <Button
//         title="Go to settings (Orange Header)"
//         onPress={() => router.push('/settings')}
//     />
//         </View>
//     )
// }


import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
    const { name, price, description } = useLocalSearchParams();

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>฿{price}</Text>
        <Text style={styles.desc}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    price: { fontSize: 18, color: "green", marginBottom: 10 },
    desc: { fontSize: 16 },
});
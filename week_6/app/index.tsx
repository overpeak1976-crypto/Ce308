import { Text, View, Button, StyleSheet, Pressable, ScrollView } from "react-native";
import { router } from 'expo-router';

const products = [
  { id: '1', name: 'iPhon 15', price: '32,900' },
  { id: '2', name: 'iPhon Air', price: '23,900' },
]

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>

      <Button
        title="Go to Details"
        onPress={() => router.push('/details')}
      />

      <Button
        title="Go to Peofile (Purple Header)"
        onPress={() => router.push('/profile')}
      />

      <Button
        title="Go to settings (Orange Header)"
        onPress={() => router.push('/settings')}
      />

      <Button
        title="Open Login Modal"
        onPress={() => router.push('/login')}
      />

      <Text style={styles.sectionTitle}>รายการสินค้า</Text>
      {products.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => {
            router.push({
              pathname: '/product/[id]',
              params: {
                id: item.id,
                name: item.name,
                price: item.price
              }
            });
          }}
          style={styles.productCard}
        >
          <Text>{item.name}</Text>
          <Text style={styles.price}>{item.price} บาท</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent:'center',
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  productCard: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    width: '100%',
    borderRadius: 8,
  },
  price: {
    color: '#666',
    marginTop: 5,
  },
});

import "./global.css";
import { View, Text, FlatList } from "react-native";
import { useState } from "react";
import { ItemList, type Item } from "./component/ItemList";
import { CustomInput } from "./component/CustomInput";
import { CustomButton } from "./component/CustomButton";

export default function Index() {
  // ✅ สินค้า 3 อัน (คงที่)
  const items: Item[] = [
    {
      id: "1",
      productName: "Apple",
      price: 1000,
      pcs: 10,
      btnSize: "sm",
      btnColor: "primary",
    },
    {
      id: "2",
      productName: "Banana",
      price: 2000,
      pcs: 5,
      btnSize: "md",
      btnColor: "secondary",
    },
    {
      id: "3",
      productName: "Mango",
      price: 3000,
      pcs: 8,
      btnSize: "lg",
      btnColor: "danger",
    },
  ];

  // ✅ state ฟอร์ม (แสดงผลเฉย ๆ)
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [pcs, setPcs] = useState("");

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-4">
            กรอกข้อมูลสินค้า
          </Text>

          <CustomInput
            label="ชื่อสินค้า"
            value={productName}
            onChangeText={setProductName}
            placeholder="กรอกชื่อสินค้า"
          />

          <CustomInput
            label="ราคา"
            value={price}
            onChangeText={setPrice}
            placeholder="กรอกราคา"
            keyboardType="numeric"
          />

          <CustomInput
            label="จำนวน"
            value={pcs}
            onChangeText={setPcs}
            placeholder="กรอกจำนวน"
            keyboardType="numeric"
          />

          <CustomButton
            title="ยืนยัน"
            onPress={() => {
              console.log(productName, price, pcs);
            }}
            size="md"
            variant="primary"
          />

          <Text className="text-lg font-semibold mt-6">
            รายการสินค้า
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <ItemList items={[item]} />
      )}
    />
  );
}

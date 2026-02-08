import { View, Text } from "react-native";
import { CustomButton } from "./CustomButton";

type ItemCardProps = {
    productName: string;
    price: number;
    pcs: number;
    btnSize: "sm" | "md" | "lg";
    btnColor: "primary" | "secondary" | "danger";
};

export const ItemCard = ({
    productName,
    price,
    pcs,
    btnSize,
    btnColor,
}: ItemCardProps) => {
    return (
        <View className="bg-white px-4 py-3 rounded-xl mb-3 shadow-sm">
        <Text className="text-[2.25rem] font-bold leading-tight">
            ชื่อสินค้า: {productName}
        </Text>

        <Text className="text-base text-gray-700 mt-1">
            ราคา: {price}
        </Text>

        <Text className="text-base text-gray-700 mb-3">
            จำนวน: {pcs}
        </Text>

        <CustomButton
            title="สั่งซื้อ"
            size={btnSize}
            variant={btnColor}
            onPress={() => console.log(productName)}
        />
    </View>
    );
};





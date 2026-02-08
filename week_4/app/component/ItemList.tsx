import { View, Text, FlatList } from 'react-native';
import { ItemCard } from './ItemCard'

export type Item = {
    id: string;
    productName: string;
    price: number;
    pcs: number;
    btnSize: "sm" | "md" | "lg";
    btnColor: "primary" | "secondary" | "danger";
};

type ItemListProps = {
    items: Item[];
};

export const ItemList = ({ items }: ItemListProps) => {
    return (
    <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
        <ItemCard {...item} />
        )}
    />
    );
};


import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";


//  CART SLICE

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CartItem[],
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.totalAmount +=
        action.payload.price * action.payload.quantity;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        state.totalAmount -= item.price * item.quantity;
      }
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});


//  TODO SLICE

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [] as Todo[],
  },
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
  },
});


//  STORE

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    todo: todoSlice.reducer,
  },
});

// CART UI

function CartScreen() {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: any) => state.cart);

  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>

      <TextInput
        placeholder="ชื่อสินค้า"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="จำนวน"
        style={styles.input}
        keyboardType="numeric"
        value={qty}
        onChangeText={setQty}
      />
      <TextInput
        placeholder="ราคา"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <View style={styles.btn}>
        <Button
          title="เพิ่มลงตะกร้า"
          onPress={() => {
            dispatch(
              cartSlice.actions.addItem({
                id: Date.now().toString(),
                name,
                quantity: Number(qty),
                price: Number(price),
              })
            );
            setName(""); setQty(""); setPrice("");
          }}
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item: CartItem) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.item}>
            <Text>
              {item.name} x{item.quantity} ={" "}
              {item.price * item.quantity} บาท
            </Text>
            <Button
              title="ลบ"
              onPress={() =>
                dispatch(cartSlice.actions.removeItem(item.id))
              }
            />
          </View>
        )}
      />

      <Text style={styles.total}>รวม: {totalAmount} บาท</Text>

      <Button
        title="ล้างตะกร้า"
        onPress={() => dispatch(cartSlice.actions.clearCart())}
      />
    </View>
  );
}


//  TODO UI

function TodoScreen() {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todo.todos);
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      <TextInput
        placeholder="เพิ่มงาน..."
        style={styles.input}
        value={text}
        onChangeText={setText}
      />

      <View style={styles.btn}>
        <Button
          title="เพิ่มงาน"
          onPress={() => {
            dispatch(
              todoSlice.actions.addTodo({
                id: Date.now().toString(),
                text,
                completed: false,
              })
            );
            setText("");
          }}
        />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item: Todo) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                dispatch(todoSlice.actions.toggleTodo(item.id))
              }
            >
              <Text
                style={{
                  textDecorationLine: item.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {item.text}
              </Text>
            </TouchableOpacity>

            <Button
              title="ลบ"
              onPress={() =>
                dispatch(todoSlice.actions.removeTodo(item.id))
              }
            />
          </View>
        )}
      />
    </View>
  );
}


//  SWITCH SCREEN

function MainApp() {
  const [screen, setScreen] = useState<"cart" | "todo">("cart");

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.switch}>
        <Button title="Cart" onPress={() => setScreen("cart")} />
        <Button title="Todo" onPress={() => setScreen("todo")} />
      </View>

      {screen === "cart" ? <CartScreen /> : <TodoScreen />}
    </View>
  );
}


//  APP ROOT

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}


//  STYLE

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  btn: {
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#ddd",
  },
});

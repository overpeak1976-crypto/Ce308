import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

const DATA = [
  { id: "1", title: "การใช้ View" },
  { id: "2", title: "การใช้ Text" },
  { id: "3", title: "การใช้ ScrollView" },
  { id: "4", title: "การใช้ FlatList" },
];

const App = () => {
  //ฟังก์ชันสำหรับสร้างหน้าตาของแต่ละแถว(เปรียบเหมือน <il> )
  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.itemContainer}>
      <View style={styles.dot} />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* {contentContainerStyle คือการกำหนดสไตล์ให้กับเนื้อหาภายใน ScrollView} */}

      {/* ส่วนหัวข้อ (Header) */}
      <View style={styles.header}>
        <Text style={styles.headerText}> My Profile</Text>
      </View>

      {/* การใช้ Flexbox จัดเรียงการ์ดแนว row */}
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: "#BEA9DF" }]}>
          <Text style={styles.boxText}>รหัส</Text>
          <Text style={styles.boxText}>66110693</Text>
        </View>
        <View style={[styles.box, { backgroundColor: "#CCB7E5" }]}>
          <Text style={styles.boxText}>คณะ</Text>
          <Text style={styles.boxText}>วิศวกรรมศาสตร์</Text>
        </View>
        <View style={[styles.box, { backgroundColor: "#D9C4EC" }]}>
          <Text style={styles.boxText}>สาขา</Text>
          <Text style={styles.boxText}>วิศวกรรมคอมพิวเตอร์</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>ข้อมูลส่วนตัว:</Text>
        <View style={styles.listItem}>
          <Text>ชื่อ: นันทวัฒน์ วิจิตรกูล</Text>
        </View>
        <View style={styles.listItem}>
          <Text>ชื่อเล่น: คิว</Text>
        </View>
        <View style={styles.listItem}>
          <Text>อีเมล: 66110693@dpu.ac.th</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>การศึกษา:</Text>
        <View style={styles.listItem}>
          <Text>ระดับอุดมศึกษา: มหาลัยธุรกิจบัณฑิตย์</Text>
        </View>
        <View style={styles.listItem}>
          <Text>สาขา: วิศวกรรมคอมพิวเตอร์(ชั้นปีที่3 qdqwda)p</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>ที่อยู่:tdt</Text>
        {Array.from({ length: 1 }).map((_, index) => (
          <View key={index} style={styles.listItem}>
            <Text>150/2 </Text>
          </View>
        ))}
      </View>

      <View style={styles.contentSection}>
        <FlatList
          data={DATA} //กรอกข้อมูลที่จะนำมาแสดง
          renderItem={renderItem} //ฟังก์ชันวาดหน้าตาแต่ละแถว
          keyExtractor={(item) => item.id} //กำหนด key ให้แต่ละแถว
          ListHeaderComponent={
            <Text style={styles.headerFlatList}>สิ่งที่ชอบ</Text>
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  header: {
    height: 100,
    backgroundColor: "#B19CD8",
    justifyContent: "center", //จัดกลางแนวตั้ง
    alignItems: "center", //จัดกลางแนวนอน
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row", //จัดเรียงแนวนอน
    justifyContent: "space-between", //เว้นระยะห่างระหว่างกัน
    marginBottom: 20,
  },
  box: {
    flex: 1, //แบ่งพื้นที่เท่าๆกัน(เพราะมี 2 กล่องจะได้คนละ 50%)
    height: 100,
    marginHorizontal: 5, //เว้นระยะห่างระหว่างกล่อง
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  boxText: {
    color: "white",
    fontWeight: "700",
    fontSize: 11,
  },
  contentSection: {
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#B19CD8",
  },
  contentSectionFlatList: {
    marginTop: 20,
  },
  headerFlatList: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 20,
    backgroundColor: "#B19CD8",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderLeftWidth: 1,
    borderLeftColor: "#B19CD8",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderLeftColor: "purple",
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
  },
});

export default App;


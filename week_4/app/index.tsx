import "./global.css"
import { CenteredView } from "./component/CenteredView";
import { Text, View } from "react-native";
import { CustomButton } from "./component/CustomButton";
import { ItemList } from "./component/ItemList"


export default function Index() {

    const data = [
      { id: "1", title: "Apple", pcs: 3},
      { id: "2", title: "Banana", pcs: 5},
      { id: "3", title: "Manko", pcs: 9},
    ]

    return (
      <CenteredView>
        <ItemList items={data} />
      </CenteredView>
    
  );
}

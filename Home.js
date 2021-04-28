import React from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import {
  Container,
  Text,
  Input,
  Item,
  Button,
  Toast,
  ListItem,
} from "native-base";
import firebase from "./config";
import * as Application from "expo-application";
import emoji from "moji-translate";

const Home = (props) => {
  const db = firebase.firestore();

  const [wanted, setWanted] = React.useState([]);
  const [inputWanted, setInputWanted] = React.useState("");
  const [inputWantedPrice, setInputWantedPrice] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    getWanted();
  }, []);

  const textToEmoji = async (text) => {
    return emoji.getEmojiForWord(text);
  };

  const getWanted = async () => {
    const wanted = await db
      .collection(Application.androidId)
      .orderBy("date", "desc")
      .get();
    let data = [];
    wanted.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setWanted(data);
  };

  const addWanted = async () => {
    if (!inputWanted | !inputWantedPrice) return;
    setSuccess(true);
    const emoji = await textToEmoji(inputWanted);
    await db
      .collection(Application.androidId)
      .doc()
      .set({
        name: `${emoji} ${inputWanted}`,
        date: new Date(),
        price: parseFloat(inputWantedPrice),
      });
    getWanted();
    setInputWanted("");
    setInputWantedPrice("");
    Toast.show({
      text: "Added",
    });
    setSuccess(false);
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem
        button
        onPress={() =>
          props.navigation.navigate("Wanted", { ...item, getWanted })
        }
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Poppins_300Light",
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
          <Text style={{ fontSize: 15, fontFamily: "Poppins_300Light" }}>
            {item.price.toFixed(2)}
          </Text>
        </View>
      </ListItem>
    );
  };

  return (
    <>
      <Container>
        <Item success={success}>
          <Input
            placeholder="Wanted"
            onChangeText={(text) => setInputWanted(text)}
            // placeholderTextColor="#000"
            value={inputWanted}
            style={{ fontFamily: "Poppins_300Light" }}
          />
          <Input
            placeholder="0.00"
            onChangeText={(text) => setInputWantedPrice(text)}
            // placeholderTextColor="#000"
            keyboardType="number-pad"
            value={inputWantedPrice}
            style={{ fontFamily: "Poppins_300Light" }}
          />
          <Button transparent onPress={addWanted}>
            <Text>confirm</Text>
          </Button>
        </Item>

        <Container>
          <SafeAreaView>
            <FlatList
              data={wanted}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </Container>
      </Container>
    </>
  );
};

export default Home;

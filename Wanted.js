import React from "react";
import { Text, Input, Button, Item, Container } from "native-base";
import { View, Toast } from "react-native";
import firebase from "./config";
import * as Application from "expo-application";

const Wanted = (props) => {
  const { name, price, id, getWanted } = props.route.params;

  const [cost, setCost] = React.useState("");
  const [pay, setPay] = React.useState("");

  React.useEffect(() => {
    setCost(price);
    props.navigation.setOptions({
      headerTitle: (props) => (
        <Text
          style={{
            fontFamily: "Poppins_300Light",
            fontSize: 20,
          }}
        >
          {name} - {price}
        </Text>
      ),
      headerRight: () => (
        <Button onPress={() => remove(id)} transparent>
          <Text>Remove</Text>
        </Button>
      ),
    });
  }, []);

  const remove = async (id) => {
    await firebase
      .firestore()
      .collection(Application.androidId)
      .doc(id)
      .delete();
    props.navigation.navigate("home");
    getWanted();
    Toast.show({
      text: "Removed",
    });
  };

  const payHandler = (amt) => {
    setPay(amt);
  };

  const total = (parseFloat(cost) / parseFloat(pay)).toFixed(2);

  return (
    <Container>
      <View style={{ margin: 10 }}>
        <Item>
          <Input
            placeholder="Will pay per day"
            placeholderTextColor="#6b6b6b"
            keyboardType="numeric"
            onChangeText={payHandler}
            value={pay.toString()}
            style={{
              fontFamily: "Poppins_300Light",
              height: 60,
              fontSize: 40,
            }}
          />
        </Item>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0,
            paddingBottom: 20,
          }}
        />

        {pay && cost ? (
          total < 1 ? (
            <Text style={{ fontFamily: "Poppins_300Light", fontSize: 50 }}>
              You can buy that item obviously. 😑
            </Text>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: "Poppins_300Light",
                  fontSize: 100,
                  textAlign: "center",
                  color: "#216694",
                }}
              >
                {/* You probably getting that item on{" "} */}
                {total > 365
                  ? `${
                      !isFinite((total / 365).toFixed(2))
                        ? `${(total / 365).toFixed(2)}`
                        : `${(total / 365).toFixed(2)}`
                    }`
                  : `${total}`}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_300Light",
                  fontSize: 50,
                  textAlign: "center",
                }}
              >
                {total > 365
                  ? `${!isFinite((total / 365).toFixed(2)) ? `:)` : `year`}`
                  : `day`}
              </Text>
            </>
          )
        ) : null}
      </View>
    </Container>
  );
};

export default Wanted;

import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Content, Text, Input, Item } from "native-base";

const Home = (props) => {
  const [cost, setCost] = React.useState("");
  const [pay, setPay] = React.useState("");

  const costHandler = (amt) => {
    // var reg = new RegExp("^[0-9]+$");
    // if (reg.test(amt)) return setCost(amt);
    // if (amt === "") return setCost("");
    // Alert.alert("Numbers only.");
    setCost(amt);
  };

  const payHandler = (amt) => {
    // var reg = new RegExp("^[0-9]+$");
    // if (reg.test(amt)) return setPay(amt);
    // if (amt === "") return setPay("");
    // Alert.alert("Numbers only.");
    setPay(amt);
  };

  const total = (parseFloat(cost) / parseFloat(pay)).toFixed(2);

  return (
    <Container>
      <Content style={{ margin: 10 }}>
        <Item>
          <Input
            placeholder="How much does product cost?"
            placeholderTextColor="#6b6b6b"
            keyboardType="numeric"
            onChangeText={costHandler}
            value={cost.toString()}
          />
        </Item>
        <Item>
          <Input
            placeholder="How much you would like to pay per day?"
            placeholderTextColor="#6b6b6b"
            keyboardType="numeric"
            onChangeText={payHandler}
            value={pay.toString()}
          />
        </Item>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0,
            paddingBottom: 20,
          }}
        />
        {cost ? (
          <Text style={styles.regular}>
            Item Cost: {cost && parseFloat(cost).toFixed(2)}
          </Text>
        ) : null}
        {pay ? (
          <Text style={styles.regular}>
            Paying at {pay && parseFloat(pay).toFixed(2)} / day
          </Text>
        ) : null}

        {pay && cost ? (
          total < 1 ? (
            <Text style={styles.regular}>You can buy that item obviously.</Text>
          ) : (
            <Text style={styles.regular}>
              You probably getting that item on{" "}
              {total > 365
                ? `${
                    !isFinite((total / 365).toFixed(2))
                      ? `${(total / 365).toFixed(2)} year/s GOODLUCK!`
                      : `${(total / 365).toFixed(2)} year/s`
                  }`
                : `${total} day/s`}
            </Text>
          )
        ) : null}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontSize: 25,
  },
});

export default Home;

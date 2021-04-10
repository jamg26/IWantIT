import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import * as Font from "expo-font";

export default function App() {
  const Stack = createStackNavigator();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      });

      setReady(true);
    };
    loadFont();
  }, []);

  return (
    ready && (
      <>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="I Want It" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    )
  );
}

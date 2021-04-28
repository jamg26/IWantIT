import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import * as Font from "expo-font";
import "./config.js";
import { Root } from "native-base";
import Wanted from "./Wanted";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";

export default function App() {
  const Stack = createStackNavigator();
  const [ready, setReady] = React.useState(false);

  useFonts({
    Poppins_400Regular,
    Poppins_300Light,
  });

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
        <Root>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="home"
                component={Home}
                options={{ title: "I Want It!" }}
              />
              <Stack.Screen name="Wanted" component={Wanted} />
            </Stack.Navigator>
          </NavigationContainer>
        </Root>
      </>
    )
  );
}

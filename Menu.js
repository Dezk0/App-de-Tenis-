import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import 'react-native-url-polyfill/auto';
import CORREO from "./Correo";
import MIEMBRO from "./Miembro";
import V3 from "./v3";
import SINGIN from "./Singin";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={CORREO} />
          <Stack.Screen name="v2" component={MIEMBRO} />
          <Stack.Screen name="v3" component={V3} />
          <Stack.Screen name="nuevo usuario" component={SINGIN} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
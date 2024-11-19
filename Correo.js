import React, { Component } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from '@rneui/themed';
import { supabase } from './SupaBase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/FontAwesome';

export default class Correo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      password: "",
    };
  }

  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('login');
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: this.state.correo,
      password: this.state.password,
    });

    if (error) {
      Alert.alert("El correo o la contraseña no son correctos");
    } else {
      Alert.alert("Bienvenido");
      this.props.navigation.navigate("v2");
      try {
        await AsyncStorage.setItem('login', this.state.correo);
      } catch (e) {
        console.error(e);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a tu SneakerStore</Text>
        <Image source={require('./Imagenes/SS.png')} style={styles.logo} />

        <Input
          placeholder="Correo"
          leftIcon={<Icons name="envelope" size={20} />}
          containerStyle={styles.inputContainer}
          value={this.state.correo}
          onChangeText={(value) => this.setState({ correo: value })}
        />

        <Input
          placeholder="Contraseña"
          leftIcon={<Icons name="lock" size={20} />}
          containerStyle={styles.inputContainer}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(value) => this.setState({ password: value })}
        />

        {/* Botón de Iniciar Sesión con ícono */}
        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Icons name="sign-in" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Botón de Crear Cuenta Nueva con ícono */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("nuevo usuario")}
        >
          <Icons name="user-plus" size={20} color="#FFF" />
          <Text style={styles.buttonText}>Crear Cuenta Nueva</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
});
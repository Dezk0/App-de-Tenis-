import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from './SupaBase'; // Importa tu configuración de Supabase

export default class Singin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleRegister = async () => {
    const { email, password } = this.state;

    // Validación básica
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Registro en Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Registro exitoso', 'El usuario ha sido registrado correctamente.');
      this.props.navigation.navigate('Inicio'); // Navega a la pantalla de inicio o donde prefieras
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Usuario</Text>
        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title="Registrarse" onPress={this.handleRegister} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

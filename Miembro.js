import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import { supabase } from './SupaBase';

export default class Miembro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Datos: [],
    };
  }

  // Método para obtener los datos de Supabase
  componentDidMount = async () => {
    let { data: Tienda, error } = await supabase.from('Tienda').select('*');
    if (error) {
      console.error("Error fetching data from Supabase:", error.message);
    } else {
      this.setState({ Datos: Tienda });
    }
  };

  // Método para el cierre de sesión
  exit = async () => {
    try {
      await AsyncStorage.removeItem('login');
      console.log('Usuario deslogueado.');
    } catch (e) {
      console.error("Error removing login:", e);
    }
  };

  // Renderizar cada elemento
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log(item.id);
        this.props.navigation.navigate("v3", { id: item.id });
      }}
    >
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.Imagen }}
          style={styles.itemImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.Producto}</Text>
          <Text style={styles.itemSubtitle}>Cantidad: {item.Cantidad}</Text>
          <Text style={styles.itemSubtitle}>Tamaño: {item.Tamaño}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <FlatList
          data={this.state.Datos}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <Button title="Desloguearse" onPress={this.exit} color="#007BFF" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 40,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  itemSubtitle: {
    fontSize: 16,
    color: 'blue',
  },
});
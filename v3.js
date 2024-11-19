import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { supabase } from './SupaBase';

export default class v3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          producto: null,
        };
      }
    
      // Obtener los detalles del producto seleccionado
      componentDidMount = async () => {
        const { id } = this.props.route.params; // Obtener el id del producto desde los parámetros de navegación
        let { data: producto, error } = await supabase
          .from('Tienda')
          .select('*')
          .eq('id', id)
          .single(); // Obtener solo un elemento con ese id
    
        if (error) {
          console.error("Error fetching product details:", error.message);
        } else {
          this.setState({ producto });
        }
      };
    
      render() {
        const { producto } = this.state;
        if (!producto) {
          return <Text>Cargando detalles...</Text>;
        }
    
        return (
          <View style={styles.container}>
            <Image source={{ uri: producto.Imagen }} style={styles.productImage} />
            <Text style={styles.productTitle}>{producto.Producto}</Text>
            <Text style={styles.productDetails}>Cantidad: {producto.Cantidad}</Text>
            <Text style={styles.productDetails}>Tamaño: {producto.Tamaño}</Text>
            <Text style={styles.productDetails}>Descripción: {producto.Descripcion}</Text>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
      },
      productImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
      },
      productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
      },
      productDetails: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 5,
        textAlign: 'center',
      },
    });

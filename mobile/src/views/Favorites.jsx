import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Favorites() {

  const [favoritos, setFavoritos] = useState([])
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@favoritos');
      console.log(value)
      if (value == null || value == "") {
        return []
      }
      return (JSON.parse(value))

    } catch (e) {
      console.log(e)
      return []
    }
  };

  useFocusEffect(useCallback(() => {
    const cargar = async () => {
      setLoading(true)
      try {
        const data = await getData();

        if (data) {
          setFavoritos(data)
        } else {
          setFavoritos("no data")
        }
      } catch (e) {
        console.log('No se pudieron cargar las imágenes');

      } finally {
        setLoading(false);
      }
    }
    cargar()
  }, []))
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        // Usamos FlatList para mostrar los IDs guardados correctamente
        <FlatList
          data={favoritos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View>
              <Image source={{ uri: item.Poster }} style={styles.imagen}/>
              

              <Text>{item.Title}</Text>

            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  imagen: { width: 150, height: 200 },
});

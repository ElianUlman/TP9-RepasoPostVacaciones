import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES, FONTS } from '../styles';
import { Ionicons } from '@expo/vector-icons';


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

  const deleteFavorite = async (movieId) => {
    try {
      const updatedFavs = favoritos.filter(item => item.imdbID !== movieId);

      await AsyncStorage.setItem(
        '@favoritos',
        JSON.stringify(updatedFavs)
      );

      setFavoritos(updatedFavs);
    } catch (e) {
      console.log('No se pudo eliminar el favorito:', e);
    }
  };

  useFocusEffect(useCallback(() => {
    const cargar = async () => {
      setLoading(true)
      try {
        const data = await getData();
        const cleaned = Array.isArray(data) ? data.filter(item => item && item.imdbID && item.Title && item.Poster && item.Poster !== 'N/A') : [];
        setFavoritos(cleaned);
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
        <Text style={styles.loading}>Cargando...</Text>
      ) : favoritos && favoritos.length > 0 ? (
        <FlatList
          data={favoritos}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.Poster }}
                style={styles.imagen}
              />

              <View style={styles.cardBottom}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.Title}
                </Text>

                <TouchableOpacity
                  onPress={() => deleteFavorite(item.imdbID)}
                  activeOpacity={0.6}
                  style={styles.deleteButton}
                >
                  <Ionicons
                    name="trash-outline"
                    size={22}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.empty}>No hay favoritos guardados</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: SIZES.pagePadding,
  },
  list: { paddingBottom: 24 },
  card: { marginBottom: SIZES.cardMargin, backgroundColor: COLORS.bgElevated, padding: 12, borderRadius: 10, borderColor: COLORS.border, borderWidth: 1 },
  imagen: { width: Math.min(160, SIZES.screenWidth * 0.6), height: Math.min(220, SIZES.screenHeight * 0.32), borderRadius: 6, backgroundColor: COLORS.surface },
  title: { color: COLORS.text, marginTop: 8, ...FONTS.title },
  loading: { color: COLORS.textMuted },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  title: {
    color: COLORS.text,
    ...FONTS.title,
    flex: 1,
    marginRight: 12,
  },

  deleteButton: {
    padding: 6,
  },
});

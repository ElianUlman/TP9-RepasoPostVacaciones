import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { movieDetail } from '../services/api';
import { COLORS, SIZES, FONTS } from '../styles';

export default function MovieDetail() {
    const route = useRoute();
    const { movieId } = route.params || {};
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const data = await movieDetail(movieId);
                console.log(" sdguhiuhyzsgfkjhb")
                console.log(data)
                setMovie(data);
            } catch (e) {
                console.log('No se pudo cargar la película', e);
            } finally {
                setLoading(false); // Ocultamos el indicador de carga al terminar
            }
        };

        getMovie();

    }, [])



    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {loading ? (
                <Text style={styles.loading}>Cargando...</Text>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.title}>{movie?.Title}</Text>
                    <Image source={{ uri: movie.Poster }} style={styles.imagen} />
                    <Text style={styles.text}>{"Actores: " + movie?.Actors}</Text>
                    <Text style={styles.text}>{"Premios: " + movie?.Awards}</Text>
                    <Text style={styles.text}>{"Pais: " + movie?.Country}</Text>
                </View>
            )}
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg },
    content: { padding: SIZES.pagePadding },
    card: { backgroundColor: COLORS.bgElevated, padding: 16, borderRadius: 10, borderColor: COLORS.border, borderWidth: 1 },
    title: { color: COLORS.text, marginBottom: 12, ...FONTS.title },
    imagen: { width: '100%', height: SIZES.screenHeight * 0.5, borderRadius: 8, backgroundColor: COLORS.surface },
    text: { color: COLORS.text, marginTop: 8 },
    loading: { color: COLORS.textMuted },
});

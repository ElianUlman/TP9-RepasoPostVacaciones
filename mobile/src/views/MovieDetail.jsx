import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { movieDetail } from '../services/api';

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
        <View style={styles.container}>
            

            {loading ? <Text>cargando...</Text> :

                <View>

                    <Text>{movie?.Title}</Text>

                    <Image source={{ uri: movie.Poster }} style={styles.imagen}/>

                    <Text>{"Actores: "+movie?.Actors}</Text>
                    <Text>{"Premios: " + movie?.Awards}</Text>
                    <Text>{"Pais: "+movie?.Country}</Text>

                </View>

            }
            <StatusBar style="auto" />
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
    imagen: { width: 300, height: 400 },
});

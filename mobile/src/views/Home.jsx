import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator, Pressable, Image, TextInput, Text } from 'react-native';
import { simpleMovie } from '../services/api.js'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import FavoriteBtn from '../components/FavoriteBtn.jsx';


export default function Home() {

    const [posters, setPosters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("batman")

    const navigation = useNavigation();

    useEffect(() => {
        const cargarPoster = async () => {
            setLoading(true)
            try {
                const data = await simpleMovie(searchQuery);

                if (data && data.Search) {
                    setPosters(data.Search);
                } else {
                    setPosters([]);
                }
            } catch (e) {
                console.log('No se pudieron cargar las imágenes');

            } finally {
                setLoading(false);
            }
        }
        cargarPoster()
    }, [searchQuery])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setSearchQuery}
                value={searchQuery}
            />

            <FlatList
                data={posters}
                keyExtractor={(item) => item.imdbID.toString()}
                numColumns={1}
                contentContainerStyle={styles.list}
                /**ListHeaderComponent={<BarraEstados userList={images} />} */
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => { navigation.navigate('MovieDetail', { movieId: item.imdbID}) } }
                    >
                        <View style={styles.card}>

                            {loading ?
                                <Text>loading</Text>
                                :

                                <View>
                                    <Image
                                        source={{ uri: item.Poster }}
                                        style={styles.imagen}
                                    />
                                    <Text>{item.Title}</Text>
                                    <FavoriteBtn id={item.imdbID}></FavoriteBtn>
                                </View>

                            }


                        </View>


                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
    list: { paddingBottom: 12 },
    card: { marginBottom: 12 },
    imagen: { width: 150, height: 200 },
    input: { marginTop: "10%" },
});

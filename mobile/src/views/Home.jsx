import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator, Pressable, Image, TextInput, Text } from 'react-native';
import { simpleMovie } from '../services/api.js'
import React, { useState, useEffect } from 'react';




export default function App() {

    const [posters, setPosters] = useState([]);

    const [loading, setLoading] = useState(true);
    
    const [searchQuery, setSearchQuery] = useState("batman")  

    useEffect(() => {
        const cargarPoster = async () => {
            setLoading(true)
            try {
                const data = await simpleMovie(searchQuery);
                console.log("eesgrg")
                console.log(data)
                if (data && data.Search) {
                    setPosters(data.Search);
                } else {
                    setPosters([]);
                }
                console.log("posyers")
                console.log(posters)
            } catch (e) {
                console.log('No se pudieron cargar las imágenes');
                console.log(e)
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
                        onPress={() => { console.log("pressed!") } /**navigation.getParent()?.navigate("PostScreen", { post: item }) */}
                    >
                        <View style={styles.card}>

                            {loading ?
                                <Text>loading</Text>
                                :
                                <Image
                                    source={{ uri: item.Poster !== "N/A" ? item.Poster : require('../../assets/favicon.png') }}
                                    style={styles.imagen}
                                />
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
    imagen: { width: 150, height: 150 },
    input: {marginTop: "10%"},
});

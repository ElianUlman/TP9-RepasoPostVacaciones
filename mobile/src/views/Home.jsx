import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator, Pressable, Image } from 'react-native';
import { simpleMovie } from '../services/api.js'
import React, { useState, useEffect } from 'react';




export default function App() {

    const [posters, setPosters] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const cargarPoster = async () => {
            setLoading(true)
            try {
                const data = await simpleMovie("batman");
                setPosters(data);
            } catch (e) {
                console.log('No se pudieron cargar las imágenes');
            } finally {
                setLoading(false);
            }
        }
        cargarPoster()
    }, [])

    return (
        <View style={styles.container}>

            <FlatList
                data={posters}
                keyExtractor={(item) => item.id.toString()}
                numColumns={1}
                contentContainerStyle={styles.list}
                /**ListHeaderComponent={<BarraEstados userList={images} />} */
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => { console.log("pressed!") } /**navigation.getParent()?.navigate("PostScreen", { post: item }) */}
                    >
                        <View style={styles.card}>
                            {loading ? 
                            <Text>laoding</Text>
                            :
                                <Image
                                    source={{ uri: item.Poster }}
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
    container: { flex: 1, backgroundColor: '#000' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
    list: { paddingBottom: 12 },
    card: { marginBottom: 12 },
    imagen: { width: 150, height: 150 },
});

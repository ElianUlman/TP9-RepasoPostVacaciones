import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator, Pressable, Image, TextInput, Text } from 'react-native';
import { simpleMovie } from '../services/api.js'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import FavoriteBtn from '../components/FavoriteBtn.jsx';
import { COLORS, SIZES, FONTS } from '../styles';


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
                placeholder="Buscar película..."
                placeholderTextColor={COLORS.textMuted}
                style={styles.input}
                onChangeText={setSearchQuery}
                value={searchQuery}
            />

            <FlatList
                data={posters}
                keyExtractor={(item) => item.imdbID.toString()}
                numColumns={1}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => { navigation.navigate('MovieDetail', { movieId: item.imdbID }) }}
                    >
                        <View style={styles.card}>
                            {loading ? (
                                <Text style={styles.loading}>Cargando...</Text>
                            ) : (
                                <View style={styles.cardInner}>
                                    <Image
                                        source={{ uri: item.Poster }}
                                        style={styles.imagen}
                                    />
                                    <View style={styles.meta}>
                                        <Text style={styles.title} numberOfLines={2}>{item.Title}</Text>
                                        <FavoriteBtn movie={item} />
                                    </View>
                                </View>
                            )}
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg, padding: SIZES.pagePadding },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    list: { paddingBottom: 24 },
    card: { marginBottom: SIZES.cardMargin, backgroundColor: COLORS.bgElevated, borderRadius: 10, overflow: 'hidden', borderColor: COLORS.border, borderWidth: 1 },
    cardInner: { flexDirection: 'row', padding: 12, alignItems: 'center' },
    imagen: { width: Math.min(120, SIZES.screenWidth * 0.32), height: Math.min(160, SIZES.screenHeight * 0.25), borderRadius: 6, backgroundColor: COLORS.surface },
    meta: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
    title: { color: COLORS.text, ...FONTS.title },
    input: { marginTop: 12, padding: 10, borderRadius: 8, backgroundColor: COLORS.surface, color: COLORS.text, borderColor: COLORS.border, borderWidth: 1 },
    loading: { color: COLORS.textMuted },
});

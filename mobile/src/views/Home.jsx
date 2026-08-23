import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator, Pressable, Image, TextInput, Text } from 'react-native';
import { simpleMovie, filterSeacrh } from '../services/api.js'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import FavoriteBtn from '../components/FavoriteBtn.jsx';
import { COLORS, SIZES, FONTS } from '../styles';


export default function Home() {

    const [posters, setPosters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const [searchType, setSearchType] = useState(null);

    const navigation = useNavigation();

  

    useFocusEffect(useCallback(() => {
        const cargarPoster = async () => {
            setLoading(true)
            try {
                let data;
                if (searchType != null) {
                    data = await filterSeacrh(searchQuery, searchType)
                } else {
                    data = await simpleMovie(searchQuery);
                }

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
    }, [searchQuery, searchType]))

    const searchTypes = [
        { label: 'Película', value: 'movie' },
        { label: 'Serie', value: 'series' },
        { label: 'Episodio', value: 'episode' },
        { label: 'Cualquiera', value: null },
    ];

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar película..."
                placeholderTextColor={COLORS.textMuted}
                style={styles.input}
                onChangeText={setSearchQuery}
                value={searchQuery}
            />

            <View style={styles.checklist}>
                {searchTypes.map((type) => {
                    const selected = searchType === type.value;

                    return (
                        <Pressable
                            key={type.label}
                            style={styles.checkItem}
                            onPress={() => setSearchType(type.value)}
                        >
                            <View style={[
                                styles.checkbox,
                                selected && styles.checkboxSelected
                            ]}>
                                {selected && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                            </View>

                            <Text style={styles.checkLabel}>
                                {type.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
            {posters == "" ?
                <Text style={styles.introductoryText}>
                    Empieza a buscar!
                </Text>

                :
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
                                            <Text style={styles.title} numberOfLines={2}>
                                                {item.Title}
                                            </Text>
                                            <FavoriteBtn movie={item} />
                                        </View>
                                    </View>
                                )}
                            </View>
                        </Pressable>
                    )}
                />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        padding: SIZES.pagePadding
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    list: {
        paddingBottom: 24
    },

    card: {
        marginBottom: SIZES.cardMargin,
        backgroundColor: COLORS.bgElevated,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: COLORS.border,
        borderWidth: 1
    },

    cardInner: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center'
    },

    imagen: {
        width: Math.min(120, SIZES.screenWidth * 0.32),
        height: Math.min(160, SIZES.screenHeight * 0.25),
        borderRadius: 6,
        backgroundColor: COLORS.surface
    },

    meta: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between'
    },

    title: {
        color: COLORS.text,
        ...FONTS.title
    },

    input: {
        marginTop: 12,
        marginBottom: 12,
        padding: 10,
        borderRadius: 8,
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        borderColor: COLORS.border,
        borderWidth: 1
    },

    checklist: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },

    checkItem: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 8,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 7
    },

    checkboxSelected: {
        backgroundColor: COLORS.text,
        borderColor: COLORS.text
    },

    checkmark: {
        color: COLORS.bg,
        fontSize: 14,
        fontWeight: 'bold'
    },

    checkLabel: {
        color: COLORS.text,
        fontSize: 14
    },

    loading: {
        color: COLORS.textMuted
    },
    introductoryText: {
        color: COLORS.text,
        fontSize: 24
    },
});
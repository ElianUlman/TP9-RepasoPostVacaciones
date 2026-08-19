import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState, useEffect } from 'react';


export default function FavoriteBtn({ movie }) {

    const [favoritos, setFavoritos] = useState([])
    const [isPressed, setIsPressed] = useState(false)

    const saveData = async (dataToSave) => {
        try {
            const cleaned = Array.isArray(dataToSave)
                ? dataToSave.filter(item => item && item.imdbID && item.Title && item.Poster && item.Poster !== 'N/A')
                : [];
            await AsyncStorage.setItem('@favoritos', JSON.stringify(cleaned));
        } catch (e) {
            console.log(e)
        }
    };


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@favoritos');
            if (value == null) {
                return []
            }
            return JSON.parse(value)

        } catch (e) {
            console.log(e)
            return []
        }
    };

    useEffect(() => {

        const onLoad = async () => {
            const values = await getData();
            const cleaned = Array.isArray(values) ? values.filter(item => item && item.imdbID && item.Title && item.Poster && item.Poster !== 'N/A') : [];
            const existsInArray = values.some(item => item.imdbID == movie.imdbID)
            if (existsInArray) {
                setIsPressed(true)
            }
            setFavoritos(cleaned);
        }
        onLoad();

    }, [])

    

    const onBtnPress = async () => {
        const asyncFavs = await getData();
        if (!isPressed) {
            const updatedFavs = [...asyncFavs, movie];
            setFavoritos(updatedFavs)
            setIsPressed(true)
            saveData(updatedFavs)
        } else {
            const updatedFavs = asyncFavs.filter(item => item.imdbID !== movie.imdbID);
            setFavoritos(updatedFavs);
            setIsPressed(false)
            saveData(updatedFavs)
        }

    }


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.btn, isPressed ? styles.btnActive : styles.btnInactive]}
                onPress={() => onBtnPress()}
            >
                <Text style={[styles.btnText, isPressed ? styles.btnTextActive : styles.btnTextInactive]}>{isPressed ? 'Des-fav' : 'Favorito'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
    },
    btnText: { fontWeight: '600' },
    btnActive: { backgroundColor: '#2a2c2f', borderColor: '#828415' },
    btnInactive: { backgroundColor: '#fffef0', borderColor: '#bce40c' },
    btnTextActive: { color: '#d6d6b0' },
    btnTextInactive: { color: '#182000' },
});

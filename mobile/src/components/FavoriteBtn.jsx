import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

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
                onPress={onBtnPress}
                activeOpacity={0.6}
            >
                <Ionicons
                    name={isPressed ? 'star' : 'star-outline'}
                    size={24}
                    color={isPressed ? '#FFD700' : '#B8B8B8'}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});
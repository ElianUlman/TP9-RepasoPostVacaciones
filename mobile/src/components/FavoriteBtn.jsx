import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState, useEffect } from 'react';


export default function FavoriteBtn({ id }) {

    const [favoritos, setFavoritos] = useState([])
    const [isPressed, setIsPressed] = useState(false)

    const saveData = async (dataToSave) => {
        try {
            await AsyncStorage.setItem('@favoritos', JSON.stringify(dataToSave));
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
            setFavoritos(values);
        }
        onLoad();

    }, [])


    const onBtnPress = () => {
        if (!isPressed) {
            const updatedFavs = [...favoritos, id];
            setFavoritos(updatedFavs)
            setIsPressed(true)
            saveData(updatedFavs)
        } else {
            const updatedFavs = favoritos.filter(item => item !== id);
            setFavoritos(updatedFavs);
            setIsPressed(false)
            saveData(updatedFavs)
        }

    }


    return (
        <View style={styles.container}>
            {isPressed ?
                <Button
                    title="Des-favoritear"
                    color="#828415"
                    onPress={() => onBtnPress()}
                />
                :
                <Button
                    title="Favoritear"
                    color="#bce40c"
                    onPress={() => onBtnPress()}
                />
            }

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
});

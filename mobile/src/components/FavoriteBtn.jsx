import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState, useEffect } from 'react';


export default function FavoriteBtn({id}) {

    const [favoritos, setFavoritos] = useState([])
    const [isPressed, setIsPressed] = useState(false)

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('@favoritos', favoritos);
        } catch (e) {
            console.log(e)
        }
    };

    // Leer datos
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@favoritos');
            if(value == null){
                return []
            }
            return value

        } catch (e) {
            console.log(e)
        }
    };

    useEffect(()=>{

        const onLoad = () =>{
            const values = getData();
            setFavoritos(values)
        }

        onLoad();

    }, [])

    const onBtnPress = () => {
        if(!isPressed){
            favoritos.push(id)
            setIsPressed(true)
            saveData()
        }else{
            favoritos = favoritos.filter(item => item !== id);
            setIsPressed(false)
            saveData()
        }

    }


    return (
        <View style={styles.container}>
            <Button
                title="Favoritiear"
                color="#841584"
                onPress={() => onBtnPress()}
            />
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

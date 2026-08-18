import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
 

export default function Favorites() {
  return (
    <View style={styles.container}>
      <Text>u on favs :D</Text>
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
});

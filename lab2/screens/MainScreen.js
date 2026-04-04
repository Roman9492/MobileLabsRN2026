import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const DATA = Array.from({ length: 50 }).map((_, i) => ({
  id: (i + 1).toString(),
  title: `Подія №${i + 1}`,
  description: `Опис для новини під номером ${i + 1}. Це тестовий текст для лабораторної №2.`,
  image: `https://picsum.photos/id/${i + 15}/400/200`,
}));

export default function MainScreen({ navigation }) {
  return (
    <FlatList
      data={DATA}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DetailsScreen', { item })}>
          <Image source={{ uri: item.image }} style={styles.img} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
const styles = StyleSheet.create({
  card: { margin: 10, backgroundColor: '#fff', borderRadius: 8, elevation: 3, overflow: 'hidden' },
  img: { width: '100%', height: 150 },
  title: { padding: 10, fontSize: 18, fontWeight: 'bold' },
});
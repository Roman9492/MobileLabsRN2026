import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
  const { item } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  img: { width: '100%', height: 250, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 15 },
  desc: { fontSize: 16, color: '#333', lineHeight: 24 },
});
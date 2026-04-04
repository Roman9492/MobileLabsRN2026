import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';

const CONTACTS = [
  { title: 'Викладачі', data: ['Нерода Сергій Іванович'] },
  { title: 'Одногрупники', data: ['Андронік Аліна', 'Гудзь Святослав', 'Політун Владислав', 'Рудницький Арсеній', 'Новаковський Олег'] },
];

export default function ContactsScreen() {
  return (
    <SectionList
      sections={CONTACTS}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}><Text style={styles.name}>{item}</Text></View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
}
const styles = StyleSheet.create({
  header: { fontSize: 18, fontWeight: 'bold', backgroundColor: '#f4f4f4', padding: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontSize: 16 },
});
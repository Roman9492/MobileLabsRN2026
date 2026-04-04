import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <ScrollView style={styles.screen}>
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.newsCard}>
          <Text style={styles.newsTitle}>Заголовок новини {i}</Text>
          <Text style={styles.newsDate}>Дата новини: 03.04.2026</Text>
          <Text style={styles.newsText}>Короткий текст новини про події в університеті Житомирська політехніка.</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function GalleryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.galleryGrid}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <View key={i} style={styles.photoBox} />
      ))}
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.regTitle}>Реєстрація</Text>
      
      <Text style={styles.label}>Електронна пошта</Text>
      <TextInput style={styles.input} placeholder="example@ztu.edu.ua" />
      
      <Text style={styles.label}>Пароль</Text>
      <TextInput style={styles.input} secureTextEntry={true} />
      
      <Text style={styles.label}>Пароль (ще раз)</Text>
      <TextInput style={styles.input} secureTextEntry={true} />

      <Text style={styles.label}>Прізвище</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Ім'я</Text>
      <TextInput style={styles.input} />

      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.btnText}>Зареєструватися</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="school" size={30} color="#0056b3" style={{ marginRight: 10 }} />
          <Text style={styles.headerTitle}>FirstMobileApp</Text>
        </View>
      </View>

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName = route.name === 'Головна' ? 'home' : route.name === 'Фото' ? 'images' : 'person';
              return <Ionicons name={iconName} size={18} color={color} />;
            },
            tabBarActiveTintColor: '#0056b3',
            tabBarIndicatorStyle: { backgroundColor: '#0056b3' },
          })}
        >
          <Tab.Screen name="Головна" component={HomeScreen} />
          <Tab.Screen name="Фото" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Задоєнко Роман, група ІПЗ-24-3</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  logo: { width: 120, height: 40 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  screen: { flex: 1, padding: 20 },
  newsCard: { marginBottom: 20, borderBottomWidth: 0.5, borderColor: '#ddd', paddingBottom: 10 },
  newsTitle: { fontSize: 17, fontWeight: 'bold' },
  newsDate: { fontSize: 12, color: '#888', marginVertical: 5 },
  newsText: { fontSize: 14 },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
  photoBox: { width: '45%', height: 130, backgroundColor: '#f0f0f0', marginBottom: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' },
  regTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 14, marginBottom: 5, color: '#444' },
  input: { height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15, paddingLeft: 10 },
  submitBtn: { backgroundColor: '#0056b3', padding: 15, borderRadius: 5, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  footer: { padding: 8, backgroundColor: '#f8f8f8', alignItems: 'center', borderTopWidth: 1, borderColor: '#eee' },
  footerText: { fontSize: 12, fontWeight: '500' }
});
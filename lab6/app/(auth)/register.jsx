import { router } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebaseConfig';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      const userCredential = await register(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        age: age,
        city: city,
        email: email
      });

      Alert.alert("Успіх", "Акаунт створено!");
      router.replace('/(app)/profile'); 
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Реєстрація</Text>
        <TextInput placeholder="Ім'я" placeholderTextColor="#888" style={styles.input} onChangeText={setName} />
        <TextInput placeholder="Вік" placeholderTextColor="#888" style={styles.input} onChangeText={setAge} keyboardType="numeric" />
        <TextInput placeholder="Місто" placeholderTextColor="#888" style={styles.input} onChangeText={setCity} />
        <TextInput placeholder="Email" placeholderTextColor="#888" style={styles.input} onChangeText={setEmail} autoCapitalize="none" />
        <TextInput placeholder="Пароль" placeholderTextColor="#888" style={styles.input} onChangeText={setPassword} secureTextEntry />
        
        <View style={styles.buttonContainer}>
          <Button title="Зареєструватися" onPress={handleRegister} />
        </View>
        <Button title="Назад до входу" onPress={() => router.back()} color="gray" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#000' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#fff' },
  input: { borderWidth: 1, borderColor: '#555', padding: 10, marginBottom: 10, borderRadius: 5, color: '#fff' },
  buttonContainer: { marginBottom: 15 }
});
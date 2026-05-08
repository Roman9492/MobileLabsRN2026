import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();

  const handleReset = async () => {
    try {
      await resetPassword(email);
      Alert.alert("Перевірте пошту", "Інструкції з відновлення надіслано.");
      router.back(); 
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Відновлення паролю</Text>
        <TextInput 
          placeholder="Ваш Email" 
          placeholderTextColor="#888"
          style={styles.input} 
          onChangeText={setEmail} 
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <Button title="Надіслати лінк" onPress={handleReset} />
        </View>
        <Button title="Назад" onPress={() => router.back()} color="gray" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#000' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#fff' },
  input: { borderWidth: 1, borderColor: '#555', padding: 10, marginBottom: 15, borderRadius: 5, color: '#fff' },
  buttonContainer: { marginBottom: 15 }
});
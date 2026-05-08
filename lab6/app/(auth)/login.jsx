import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Button,
    Keyboard,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace('/(app)/profile');
    } catch (error) {
      Alert.alert("Помилка", "Неправильний email або пароль");
    }
  };

  return (
    // Огортаємо екран, щоб ховати клавіатуру
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Вхід</Text>
        <TextInput 
          placeholder="Email" 
          placeholderTextColor="#888" // Додаємо колір плейсхолдера для темної теми
          style={styles.input} 
          onChangeText={setEmail} 
          autoCapitalize="none"
        />
        <TextInput 
          placeholder="Пароль"
          placeholderTextColor="#888" 
          style={styles.input} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
        <Button title="Увійти" onPress={handleLogin} />
        
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.link}>Немає акаунту? Зареєструватися</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.link}>Забули пароль?</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#000' }, // Темний фон
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#fff' }, // Білий текст
  input: { borderWidth: 1, borderColor: '#555', padding: 10, marginBottom: 15, borderRadius: 5, color: '#fff' }, // Світлий текст у полі
  link: { color: '#4da6ff', marginTop: 15, textAlign: 'center' } // Блакитні лінки
});
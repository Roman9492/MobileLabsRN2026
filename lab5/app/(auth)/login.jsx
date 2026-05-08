import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
    Button,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Викликаємо метод login з контексту [cite: 78, 85]

  const handleLogin = () => {
    login(email, password); // Пункт 2.4.5 [cite: 85]
    router.replace('/'); // Перехід на головний екран після входу [cite: 92]
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Вхід</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Пароль" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
        
        <Button title="Увійти" onPress={handleLogin} />
        
        <Link href="/register" style={styles.link}>
          Немає акаунту? Зареєструватися
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center', 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 15, 
    borderRadius: 5 
  },
  link: { 
    marginTop: 20, 
    color: '#007AFF', 
    textAlign: 'center' 
  }
});
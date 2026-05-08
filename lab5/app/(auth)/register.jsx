import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth(); 

  const handleRegister = () => {
    register(email, password, name); 
    router.replace('/'); 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>Реєстрація</Text>
          
          <TextInput 
            style={styles.input} 
            placeholder="Ім'я" 
            placeholderTextColor="#8e8e93" 
            value={name} 
            onChangeText={setName} 
          />
          
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#8e8e93"
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput 
            style={styles.input} 
            placeholder="Пароль" 
            placeholderTextColor="#8e8e93"
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
          />
          
          <TextInput 
            style={styles.input} 
            placeholder="Підтвердження паролю" 
            placeholderTextColor="#8e8e93"
            secureTextEntry 
          />
          
          <View style={styles.buttonContainer}>
            <Button title="Зареєструватися" onPress={handleRegister} color="#007AFF" />
          </View>
          
          <Link href="/login" style={styles.link}>
            Вже є акаунт? Увійти
          </Link>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center',
    color: '#000' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 8,
    fontSize: 16,
    color: '#000', 
    backgroundColor: '#f9f9f9' // Світлий фон для контрасту
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden'
  },
  link: { 
    marginTop: 25, 
    color: '#007AFF', 
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  }
});
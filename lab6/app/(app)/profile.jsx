import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebaseConfig';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState({ name: '', age: '', city: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [passwordForDelete, setPasswordForDelete] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: profileData.name,
        age: profileData.age,
        city: profileData.city
      });
      Alert.alert("Успіх", "Дані оновлено!");
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const credential = EmailAuthProvider.credential(user.email, passwordForDelete);
      await reauthenticateWithCredential(user, credential);

      await deleteDoc(doc(db, "users", user.uid));

      await user.delete();

      Alert.alert("Успіх", "Ваш обліковий запис видалено.");
    } catch (error) {
      Alert.alert("Помилка", "Неправильний пароль або сталась помилка.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мій Профіль</Text>
      <Text style={{marginBottom: 20}}>Email: {user?.email}</Text>

      <TextInput
        style={[styles.input, !isEditing && styles.disabledInput]}
        value={profileData.name}
        onChangeText={(text) => setProfileData({...profileData, name: text})}
        editable={isEditing}
        placeholder="Ім'я"
      />
      <TextInput
        style={[styles.input, !isEditing && styles.disabledInput]}
        value={profileData.age}
        onChangeText={(text) => setProfileData({...profileData, age: text})}
        editable={isEditing}
        placeholder="Вік"
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, !isEditing && styles.disabledInput]}
        value={profileData.city}
        onChangeText={(text) => setProfileData({...profileData, city: text})}
        editable={isEditing}
        placeholder="Місто"
      />

      {isEditing ? (
        <Button title="Зберегти зміни" onPress={handleUpdate} color="green" />
      ) : (
        <Button title="Редагувати профіль" onPress={() => setIsEditing(true)} />
      )}

      <View style={styles.spacer}>
        <Button title="Вийти з акаунту" onPress={logout} color="gray" />
      </View>

      <View style={styles.spacer}>
        <Button title="Видалити акаунт" onPress={() => setShowDeleteModal(!showDeleteModal)} color="red" />
      </View>

      {/* Форма підтвердження видалення */}
      {showDeleteModal && (
        <View style={styles.modal}>
          <Text style={{fontWeight: 'bold', marginBottom: 10, color: 'red'}}>Підтвердження видалення</Text>
          <Text style={{marginBottom: 10}}>Введіть ваш пароль для підтвердження:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Пароль"
            value={passwordForDelete}
            onChangeText={setPasswordForDelete}
          />
          <Button title="Остаточно видалити" onPress={handleDeleteAccount} color="red" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff', color: '#000' },
  disabledInput: { backgroundColor: '#f0f0f0', color: '#888' },
  spacer: { marginTop: 15 },
  modal: { marginTop: 30, padding: 20, backgroundColor: '#ffe6e6', borderRadius: 10, borderWidth: 1, borderColor: 'red' }
});
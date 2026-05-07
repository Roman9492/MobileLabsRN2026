import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TouchableOpacity, 
  TextInput, Modal, Alert, Button, KeyboardAvoidingView, 
  Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
// Використовуємо legacy для сумісності з останніми версіями Expo
import * as FileSystem from 'expo-file-system/legacy';

export default function App() {
  const [currentPath, setCurrentPath] = useState(FileSystem.documentDirectory);
  const [files, setFiles] = useState([]);
  const [storageStats, setStorageStats] = useState({ total: 0, free: 0, used: 0 });
  
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  
  const [newItemName, setNewItemName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    loadStorageStats();
    if (currentPath) {
      loadFiles(currentPath);
    }
  }, [currentPath]);

  const loadStorageStats = async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const used = total - free;
      const formatGB = (bytes) => (bytes / (1024 * 1024 * 1024)).toFixed(2);
      
      setStorageStats({
        total: formatGB(total),
        free: formatGB(free),
        used: formatGB(used),
      });
    } catch (error) {
      console.log("Помилка статистики:", error);
    }
  };

  const loadFiles = async (path) => {
    try {
      const fileNames = await FileSystem.readDirectoryAsync(path);
      const fileDetails = await Promise.all(
        fileNames.map(async (name) => {
          const fullUri = path.endsWith('/') ? path + name : path + '/' + name;
          const info = await FileSystem.getInfoAsync(fullUri, { size: true });
          return { name, ...info };
        })
      );
      fileDetails.sort((a, b) => (a.isDirectory === b.isDirectory ? 0 : a.isDirectory ? -1 : 1));
      setFiles(fileDetails);
    } catch (error) {
      console.log("Помилка завантаження файлів:", error);
    }
  };

  const handleItemPress = async (item) => {
    if (item.isDirectory) {
      const newPath = item.uri.endsWith('/') ? item.uri : item.uri + '/';
      setCurrentPath(newPath);
    } else if (item.name.toLowerCase().endsWith('.txt')) {
      try {
        const content = await FileSystem.readAsStringAsync(item.uri);
        setSelectedFile(item);
        setFileContent(content);
        setEditModalVisible(true);
      } catch (e) {
        Alert.alert('Помилка', 'Не вдалося прочитати файл');
      }
    } else {
      Alert.alert('Інформація', 'Підтримується лише перегляд .txt файлів');
    }
  };

  const goBack = () => {
    if (!currentPath || currentPath === FileSystem.documentDirectory) return;
    let path = currentPath;
    if (path.endsWith('/')) path = path.slice(0, -1);
    const lastSlashIndex = path.lastIndexOf('/');
    const newPath = path.substring(0, lastSlashIndex + 1);
    setCurrentPath(newPath);
  };

  const handleCreate = async () => {
    const safeName = newItemName.trim();
    if (!safeName) {
      Alert.alert('Помилка', 'Введіть назву');
      return;
    }
    const basePath = currentPath.endsWith('/') ? currentPath : currentPath + '/';
    try {
      if (isCreatingFolder) {
        await FileSystem.makeDirectoryAsync(basePath + safeName, { intermediates: true });
      } else {
        const fileName = safeName.toLowerCase().endsWith('.txt') ? safeName : `${safeName}.txt`;
        await FileSystem.writeAsStringAsync(basePath + fileName, 'Початковий вміст файлу');
      }
      setCreateModalVisible(false);
      setNewItemName('');
      loadFiles(currentPath);
    } catch (error) {
      Alert.alert('Помилка створення', error.message);
    }
  };

  const handleSaveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(selectedFile.uri, fileContent);
      setEditModalVisible(false);
      Keyboard.dismiss();
      Alert.alert('Успіх', 'Зміни збережено');
      loadFiles(currentPath);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося зберегти зміни');
    }
  };

  const handleDelete = (item) => {
    Alert.alert(
      'Видалення',
      `Ви дійсно хочете видалити ${item.name}?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        { 
          text: 'Видалити', 
          style: 'destructive',
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(item.uri);
              loadFiles(currentPath);
            } catch (e) {
              Alert.alert('Помилка', 'Не вдалося видалити об\'єкт');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Статистика */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Статистика пам'яті (ГБ):</Text>
        <Text>Загальний обсяг: {storageStats.total}</Text>
        <Text>Вільний простір: {storageStats.free}</Text>
        <Text>Зайнятий простір: {storageStats.used}</Text>
      </View>

      {/* Навігація з виправленим відображенням шляху */}
      <View style={styles.navContainer}>
        <TouchableOpacity 
          onPress={goBack} 
          disabled={!currentPath || currentPath === FileSystem.documentDirectory}
          style={styles.backButton}
        >
          <Text style={[styles.navBtn, (!currentPath || currentPath === FileSystem.documentDirectory) && styles.disabled]}>⬆️ Вгору</Text>
        </TouchableOpacity>
        
        <View style={styles.breadcrumbWrapper}>
          <Text style={styles.breadcrumb} numberOfLines={1} ellipsizeMode="head">
            {currentPath === FileSystem.documentDirectory 
              ? "Головна" 
              : "/" + currentPath.replace(FileSystem.documentDirectory, "")}
          </Text>
        </View>
      </View>

      {/* Список файлів */}
      <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <TouchableOpacity style={styles.fileInfo} onPress={() => handleItemPress(item)}>
              <Text style={styles.icon}>{item.isDirectory ? '📁' : '📄'}</Text>
              <Text style={styles.fileName}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => { setSelectedFile(item); setInfoModalVisible(true); }} style={styles.actionBtn}>
                <Text>ℹ️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item)} style={styles.actionBtn}>
                <Text>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Папка порожня</Text>}
      />

      {/* Кнопки керування */}
      <View style={styles.createContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Нова папка" onPress={() => { setIsCreatingFolder(true); setCreateModalVisible(true); }} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Новий .txt" onPress={() => { setIsCreatingFolder(false); setCreateModalVisible(true); }} />
        </View>
      </View>

      {/* Модалки */}
      <Modal visible={createModalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{isCreatingFolder ? 'Створити папку' : 'Створити файл'}</Text>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                value={newItemName}
                onChangeText={setNewItemName}
                autoFocus
              />
              <View style={styles.modalActions}>
                <Button title="Скасувати" color="red" onPress={() => { setCreateModalVisible(false); setNewItemName(''); }} />
                <Button title="Створити" onPress={handleCreate} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={editModalVisible} animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.editContainer}>
              <Text style={styles.modalTitle}>Файл: {selectedFile?.name}</Text>
              <TextInput
                style={styles.textArea}
                multiline
                value={fileContent}
                onChangeText={setFileContent}
                textAlignVertical="top"
              />
              <View style={styles.modalActionsEdit}>
                <Button title="Закрити" color="red" onPress={() => { setEditModalVisible(false); Keyboard.dismiss(); }} />
                <Button title="Зберегти" onPress={handleSaveFile} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      <Modal visible={infoModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Властивості</Text>
            <Text style={styles.infoText}><Text style={styles.bold}>Назва:</Text> {selectedFile?.name}</Text>
            <Text style={styles.infoText}><Text style={styles.bold}>Тип:</Text> {selectedFile?.isDirectory ? 'Папка' : 'Файл'}</Text>
            {!selectedFile?.isDirectory && <Text style={styles.infoText}><Text style={styles.bold}>Розмір:</Text> {selectedFile?.size} байт</Text>}
            <Text style={styles.infoText}>
              <Text style={styles.bold}>Змінено:</Text> {selectedFile?.modificationTime ? new Date(selectedFile.modificationTime * 1000).toLocaleString() : 'Невідомо'}
            </Text>
            <View style={{ marginTop: 20 }}>
              <Button title="Закрити" onPress={() => setInfoModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', paddingTop: 50 },
  statsContainer: { padding: 16, backgroundColor: '#FFF', margin: 10, borderRadius: 12, elevation: 2 },
  statsTitle: { fontWeight: '700', fontSize: 17, marginBottom: 8, color: '#1C1C1E' },
  navContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, padding: 12, backgroundColor: '#E5E5EA', borderRadius: 10, marginBottom: 10 },
  backButton: { paddingRight: 10, borderRightWidth: 1, borderRightColor: '#C7C7CC' },
  breadcrumbWrapper: { flex: 1, paddingLeft: 10 },
  breadcrumb: { fontSize: 14, color: '#3A3A3C', fontWeight: '500' },
  navBtn: { fontWeight: '600', color: '#007AFF', fontSize: 16 },
  disabled: { color: '#8E8E93' },
  fileItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, marginHorizontal: 10, marginTop: 8, borderRadius: 12 },
  fileInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  icon: { fontSize: 28, marginRight: 12 },
  fileName: { fontSize: 17, color: '#1C1C1E' },
  actions: { flexDirection: 'row', gap: 15 },
  actionBtn: { padding: 5 },
  createContainer: { flexDirection: 'row', padding: 20, gap: 10 },
  buttonWrapper: { flex: 1 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#8E8E93', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)', padding: 20 },
  modalContent: { backgroundColor: '#FFF', padding: 24, borderRadius: 16 },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#F2F2F7', padding: 15, borderRadius: 10, fontSize: 16, marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-around' },
  modalActionsEdit: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  editContainer: { flex: 1, backgroundColor: '#FFF', padding: 20, paddingTop: 45 },
  textArea: { flex: 1, backgroundColor: '#F2F2F7', borderRadius: 12, padding: 15, fontSize: 16, marginVertical: 20 },
  bold: { fontWeight: '600' },
  infoText: { fontSize: 16, marginBottom: 10 }
});
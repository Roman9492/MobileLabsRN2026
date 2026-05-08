import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PRODUCTS } from '../../../constants/data';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return <View style={styles.container}><Text>Товар не знайдено</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Налаштовуємо заголовок екрана */}
      <Stack.Screen options={{ title: product.name }} />
      
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.descriptionTitle}>Опис товару:</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  image: { width: '100%', height: 300, resizeMode: 'cover' },
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 22, color: '#34C759', fontWeight: 'bold', marginBottom: 16 },
  descriptionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  description: { fontSize: 16, color: '#444', lineHeight: 24 }
});
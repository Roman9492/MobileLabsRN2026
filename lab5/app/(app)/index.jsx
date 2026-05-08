import { Link } from 'expo-router';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PRODUCTS } from '../../constants/data';
import { useAuth } from '../../context/AuthContext';

export default function CatalogScreen() {
  const { logout } = useAuth(); 

  const renderItem = ({ item }) => (
    <Link href={`/details/${item.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Каталог товарів</Text>
        <Button title="Вийти" onPress={logout} color="#FF3B30" />
      </View>

      <FlatList
        data={PRODUCTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: '#FFF' 
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  list: { padding: 10 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    marginBottom: 10, 
    borderRadius: 12, 
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  info: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 18, color: '#34C759', fontWeight: 'bold' }
});
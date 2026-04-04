import React from 'react';
import { Button, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen';
import DetailsScreen from './screens/DetailsScreen';
import ContactsScreen from './screens/ContactsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const showProfile = () => {
    Alert.alert("Автор", "Задоєнко Роман\nГрупа ІПЗ-24-3", [{ text: "Ок" }]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerStyle: { backgroundColor: '#f4511e' }, 
          headerTintColor: '#fff' 
        }}
      >
        <Stack.Screen 
          name="MainScreen" 
          component={MainScreen} 
          options={({ navigation }) => ({
            title: 'Новини',
            headerLeft: () => <Button onPress={showProfile} title="Автор" color="#fff" />,
            headerRight: () => (
              <Button 
                onPress={() => navigation.navigate('ContactsScreen')} 
                title="Контакти" 
                color="#fff" 
              />
            ),
          })} 
        />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ title: 'Деталі' }} />
        <Stack.Screen name="ContactsScreen" component={ContactsScreen} options={{ title: 'Контакти' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
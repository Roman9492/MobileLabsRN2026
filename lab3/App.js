import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  GestureHandlerRootView, 
  TapGestureHandler, 
  LongPressGestureHandler, 
  PanGestureHandler, 
  FlingGestureHandler,
  PinchGestureHandler,
  State,
  Directions
} from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

export default function App() {
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({
    taps: 0, doubleTaps: 0, longPresses: 0, drags: 0, swipesRight: 0, swipesLeft: 0, pinches: 0,
  });
  const [notifiedTasks, setNotifiedTasks] = useState([]);

  const tasks = [
    { id: 'taps', text: "Tap 10 times", cur: stats.taps, goal: 10 },
    { id: 'doubleTaps', text: "Double-tap 5 times", cur: stats.doubleTaps, goal: 5 },
    { id: 'longPresses', text: "Hold for 3 seconds", cur: stats.longPresses, goal: 1 },
    { id: 'drags', text: "Drag the Roman", cur: stats.drags, goal: 1 },
    { id: 'swipesRight', text: "Swipe Right", cur: stats.swipesRight, goal: 1 },
    { id: 'swipesLeft', text: "Swipe Left", cur: stats.swipesLeft, goal: 1 },
    { id: 'pinches', text: "Pinch to resize", cur: stats.pinches, goal: 1 },
    { id: 'score100', text: "Reach 100 points", cur: score, goal: 100 },
  ];

  useEffect(() => {
    tasks.forEach(task => {
      if (task.cur >= task.goal && !notifiedTasks.includes(task.id)) {
        Alert.alert("🎉 Mission Accomplished!", `Task "${task.text}" is done!`);
        setNotifiedTasks(prev => [...prev, task.id]);
      }
    });
  }, [stats, score]);

  const updateStat = (key, points = 0) => {
    setScore(s => s + points);
    setStats(prev => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const InfoRow = ({ emoji, color, label, points }) => (
    <View style={styles.infoRow}>
      <View style={[styles.iconCircle, { backgroundColor: color + '22' }]}>
        <Text style={{ fontSize: 18 }}>{emoji}</Text>
      </View>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoPoints}>{points}</Text>
    </View>
  );

   const GameHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => Alert.alert("Menu")}>
        <Text style={styles.headerIcon}>≡</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Click on Roman</Text>
      <TouchableOpacity onPress={() => Alert.alert("Search")}>
        <Text style={styles.headerIcon}>🔍</Text>
      </TouchableOpacity>
    </View>
  );

  const TitleHeader = ({ title }) => (
    <View style={styles.titleHeader}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );

  function GameScreen() {
    const doubleTapRef = useRef(null);
    const flingRightRef = useRef(null);
    const flingLeftRef = useRef(null);
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const onPanStateChange = (e) => {
      if (e.nativeEvent.state === State.END) {
        updateStat('drags', 0);
        Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
      }
    };

    return (
      <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
        <GameHeader /> 
        <ScrollView contentContainerStyle={styles.screen}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>SCORE</Text>
            <Text style={styles.scoreNumber}>{score}</Text>
          </View>

          <PinchGestureHandler onGestureEvent={Animated.event([{nativeEvent:{scale}}],{useNativeDriver:true})} onHandlerStateChange={(e) => e.nativeEvent.state === State.END && (updateStat('pinches', 3), Animated.spring(scale, {toValue:1, useNativeDriver:true}).start())}>
            <Animated.View>
              <PanGestureHandler onGestureEvent={Animated.event([{nativeEvent:{translationX:translateX, translationY:translateY}}],{useNativeDriver:true})} onHandlerStateChange={onPanStateChange} waitFor={[flingRightRef, flingLeftRef]}>
                <Animated.View style={{ transform: [{ translateX }, { translateY }, { scale }] }}>
                  <FlingGestureHandler ref={flingLeftRef} direction={Directions.LEFT} onHandlerStateChange={(e) => e.nativeEvent.state === State.ACTIVE && updateStat('swipesLeft', 5)}>
                    <View>
                      <FlingGestureHandler ref={flingRightRef} direction={Directions.RIGHT} onHandlerStateChange={(e) => e.nativeEvent.state === State.ACTIVE && updateStat('swipesRight', 5)}>
                        <View>
                          <LongPressGestureHandler onHandlerStateChange={(e) => e.nativeEvent.state === State.ACTIVE && updateStat('longPresses', 10)} minDurationMs={3000}>
                            <View>
                              <TapGestureHandler onHandlerStateChange={(e) => e.nativeEvent.state === State.ACTIVE && updateStat('doubleTaps', 2)} numberOfTaps={2} ref={doubleTapRef}>
                                <TapGestureHandler onHandlerStateChange={(e) => e.nativeEvent.state === State.ACTIVE && updateStat('taps', 1)} waitFor={doubleTapRef}>
                                  <View style={styles.circle}><Text style={styles.circleText}>ROMA</Text></View>
                                </TapGestureHandler>
                              </TapGestureHandler>
                            </View>
                          </LongPressGestureHandler>
                        </View>
                      </FlingGestureHandler>
                    </View>
                  </FlingGestureHandler>
                </Animated.View>
              </PanGestureHandler>
            </Animated.View>
          </PinchGestureHandler>

          <View style={styles.instructionCard}>
            <InfoRow emoji="👆" color="#00BFFF" label="Tap" points="+1 point" />
            <InfoRow emoji="✌️" color="#FFA500" label="Double-tap" points="+2 points" />
            <InfoRow emoji="✋" color="#9370DB" label="Long-press (3s)" points="+10 points" />
            <InfoRow emoji="↔️" color="#FF4500" label="Swipe" points="+5 points" />
            <InfoRow emoji="🤏" color="#32CD32" label="Pinch" points="+3 points" />
          </View>
        </ScrollView>
      </View>
    );
  }

  function ChallengesScreen() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
        <TitleHeader title="Challenges" />
        <ScrollView style={styles.scrollScreen}>
          {tasks.map(task => (
            <View key={task.id} style={[styles.taskCard, task.cur >= task.goal && styles.taskDone]}>
              <Text style={styles.taskText}>{task.text}</Text>
              <Text style={styles.taskStatus}>{task.cur >= task.goal ? "✅" : `${task.cur}/${task.goal}`}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
        <TitleHeader title="Settings" />
        <View style={styles.screen}>
          <Text style={{color: '#888'}}>App settings in development</Text>
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ 
            headerShown: false, 
            tabBarShowLabel: false,
            tabBarStyle: { height: 60, borderTopWidth: 0, backgroundColor: '#fff', elevation: 15 },
            tabBarActiveTintColor: '#6C5CE7'
        }}>
          <Tab.Screen name="Game" component={GameScreen} options={{ 
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>▶</Text> 
          }} />
          <Tab.Screen name="Challenges" component={ChallengesScreen} options={{ 
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📋</Text> 
          }} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{ 
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>⚙️</Text> 
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, backgroundColor: '#fff', elevation: 2 },
  titleHeader: { alignItems: 'center', paddingTop: 50, paddingBottom: 15, backgroundColor: '#fff', elevation: 2 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  headerIcon: { fontSize: 24, color: '#6C5CE7', fontWeight: 'bold' },

  screen: { alignItems: 'center', backgroundColor: '#F8F9FA', paddingVertical: 30 },
  scoreContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 20, elevation: 4, marginBottom: 30, alignItems: 'center', width: 160 },
  scoreLabel: { fontSize: 12, color: '#BBB', fontWeight: 'bold' },
  scoreNumber: { fontSize: 40, fontWeight: 'bold', color: '#6C5CE7' },
  circle: { width: 130, height: 130, borderRadius: 65, backgroundColor: '#6C5CE7', justifyContent: 'center', alignItems: 'center', elevation: 10 },
  circleText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  instructionCard: { backgroundColor: '#fff', width: '85%', borderRadius: 25, padding: 20, marginTop: 40, elevation: 3 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  infoLabel: { flex: 1, fontSize: 15, color: '#555', fontWeight: '500' },
  infoPoints: { fontSize: 14, color: '#888' },

  scrollScreen: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  taskCard: { backgroundColor: '#fff', padding: 18, borderRadius: 15, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', elevation: 2 },
  taskDone: { backgroundColor: '#E8F5E9', borderColor: '#4CAF50', borderWidth: 1 },
  taskText: { fontSize: 16, color: '#333' },
  taskStatus: { fontWeight: 'bold', color: '#777' }
});
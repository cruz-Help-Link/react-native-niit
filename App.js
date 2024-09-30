import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import * as Progress from "react-native-progress"; // Import the Progress library
import { NavigationContainer } from "@react-navigation/native";

// CREATE MY SCREEN
function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Home Screen</Text>
    </View>
  );
}
function GalleryScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Gallery Screen</Text>
    </View>
  );
}

// Loading Screen
function LoadingScreen({ navigation }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 1) {
          clearInterval(interval);
          navigation.replace("MainApp"); // Navigate to the main app when loading is complete
          return 1;
        }
        return prevProgress + 0.1; // Increment progress by 10% every 500ms
      });
    }, 500);
    return () => clearInterval(interval);
  }, [navigation]);

  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Just a minute...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
      <Progress.Bar
        progress={progress}
        width={220}
        color="blue"
        style={styles.progressBar}
      />
    </View>
  );
}

const Stack = createDrawerNavigator();

function MainApp() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      {/* <Stack.Screen name="Tabs" component={NavTab} /> */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer initialRouteName="Loading">
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

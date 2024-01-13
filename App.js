import * as Notifications from "expo-notifications";
import { Button, StyleSheet, Text, View, LogBox, Alert } from "react-native";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  LogBox.ignoreAllLogs();

  useEffect(() => {
    // Request permission for notifications
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission denied");
      }
    };

    requestNotificationPermission();
  }, []);

  const scheduleLocalNotification = async () => {
    // Check if permission is granted before scheduling the notification
    const { status } = await Notifications.getPermissionsAsync();

    if (status === "granted") {
      // Schedule the local notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Title",
          body: "This is local notification body.",
        },
        trigger: {
          seconds: 2, // Time delay before the notification is shown
        },
      });
    } else {
      Alert.alert("Enable notifications permission from device settings.");
    }
  };
  return (
    <View style={styles.container}>
      <Text>Local Notification Test</Text>
      <Button
        onPress={scheduleLocalNotification}
        title="Schedule Notification"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});

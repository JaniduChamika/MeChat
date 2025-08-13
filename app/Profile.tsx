import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  async function loaduser() {
    const userJsonText = await AsyncStorage.getItem("user");
    const userObject = JSON.parse(userJsonText);
    setUser(userObject);
    // console.log(userObject.name);
  }

  loaduser();
  async function handleLogout() {
    await AsyncStorage.removeItem("user");
    router.push("/signin");
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4">
        <Text className="text-xl font-bold text-center mb-6">My Profile </Text>
        <View className="flex-row items-center justify-center mb-6">
          <Image
            className="w-24 h-24 rounded-full"
            source={{
              uri:
                "http://10.0.2.2:8080/React-Native/MeChat/backend/" +
                user?.profile_url,
            }}
          />
        </View>
        <Text className="text-center text-lg font-semibold mb-6">
          {user?.name}
        </Text>
        <TouchableOpacity
          className="flex-row items-center p-4 border-b border-gray-200"
          onPress={() => router.push("/Account")}
        >
          <Text className="flex-1 text-gray-600">Account Details</Text>
          <Text className="text-gray-400">
            <MaterialIcons name="arrow-forward-ios" color="#c4c4c4" size={20} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <Text className="flex-1 text-gray-600">Settings</Text>
          <Text className="text-gray-400">
            <MaterialIcons name="arrow-forward-ios" color="#c4c4c4" size={20} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <Text className="flex-1 text-green-500">Contact Us</Text>
          <Text className="text-gray-400">
            <MaterialIcons name="arrow-forward-ios" color="#c4c4c4" size={20} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-4 mt-6 bg-gray-100 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-center text-gray-600">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

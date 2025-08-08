import { router } from "expo-router";
import React from "react";
import {
      Image,
      SafeAreaView,
      Text,
      TouchableOpacity,
      View,
} from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 mt-5">
        <Text className="text-xl font-bold text-center mb-6">My Profile </Text>
        <View className="flex-row items-center justify-center mb-6">
          <Image
            className="w-24 h-24 rounded-full"
            source={{
              uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            }}
          />
        </View>
        <Text className="text-center text-lg font-semibold mb-6">
          Cristina Kardashian
        </Text>
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <Text className="flex-1 text-gray-600">Account Details</Text>
          <Text className="text-gray-400">icon</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <Text className="flex-1 text-gray-600">Settings</Text>
          <Text className="text-gray-400">icon</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
          <Text className="flex-1 text-green-500">Contact Us</Text>
          <Text className="text-gray-400">icon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-4 mt-6 bg-gray-100 rounded-lg"
          onPress={() => router.push("/signin")}
        >
          <Text className="text-center text-gray-600">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    console.log("Sign up pressed");
  };

  // const handlePhoneSignUp = () => {
  //   console.log("Phone sign up pressed");
  // };

  // const handleBackPress = () => {
  //   console.log("Back pressed");
  // };

  const handleProfileImagePress = () => {
    console.log("Profile image pressed");
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Content */}
      <View className="flex-1 px-8 pt-2 justify-center">
        {/* Title */}
        <Text className="text-3xl font-bold text-blue-500 mb-12">Sign Up</Text>

        {/* Profile Image */}
        <View className="items-center mb-10">
          <TouchableOpacity
            onPress={handleProfileImagePress}
            className="relative"
          >
            <View className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            {/* Camera Icon */}
            <View className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 items-center justify-center">
              <Text className="text-gray-600 text-xs">📷</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/*  Name Input */}
        <View className="mb-6">
          <TextInput
            placeholder="Name"
            value={firstName}
            onChangeText={setFirstName}
            className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
            placeholderTextColor="#9CA3AF"
          />
        </View>

   

        {/* Email Input */}
        <View className="mb-6">
          <TextInput
            placeholder="E-mail Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <View className="mb-10">
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            className="w-full py-4 px-6 border border-gray-200 rounded-full text-base text-black bg-gray-50 focus:border-blue-300 focus:bg-white"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSignUp}
          className="w-full bg-blue-500 py-4 rounded-full mb-5 active:bg-blue-600"
        >
          <Text className="text-white text-base font-semibold text-center">
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Phone Sign Up */}
        <View className="items-center mb-8">
          <TouchableOpacity
            className="mt-4"
            onPress={() => router.push("/signin")}
          >
            <Text className="text-black-500 text-center">
              Already have an account?{" "}
              <Text className="text-blue-500 font-semibold">Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

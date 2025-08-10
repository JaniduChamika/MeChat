import { router } from "expo-router";
import React, { useState } from "react";
import {
      Image,
      KeyboardAvoidingView,
      Platform,
      SafeAreaView,
      ScrollView,
      Text,
      TextInput,
      TouchableOpacity,
      View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function ChatScreen() {
  const [messageText, setMessageText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleBackPress = () => {
    console.log("Back pressed");
  };

  const handleSettingsPress = () => {
    console.log("Settings pressed");
  };

  const handleCallPress = () => {
    console.log("Call pressed");
  };

  const handleVideoPress = () => {
    console.log("Video call pressed");
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Send message:", messageText);
      setMessageText("");
    }
  };

  const handleCameraPress = () => {
    console.log("Camera pressed");
  };

  const handleMicPress = () => {
    console.log("Mic pressed");
  };

  const handleVoicePlay = () => {
    setIsPlaying(!isPlaying);
    console.log("Play voice message");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
         
        {/* Chat Header */}
        <View className="flex-row items-center justify-between px-4 py-5 mt-5 border-b border-gray-100">
          <View className="flex-row items-center flex-1 ">
            <TouchableOpacity
              onPress={() => router.push("/Layout")}
              className="mr-3"
            >
              <Text className="text-black text-xl">
                <Ionicons name="caret-back" color="#000" size={24} />
              </Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold mt-1 text-black">
              Porsche Taycan Wannabuys
            </Text>
          </View>

          <View className="flex-row items-center space-x-3">
            <TouchableOpacity onPress={handleCallPress} className="mr-5">
              <Text className="text-blue-500 text-lg">
                <Ionicons name="call" color="#000" size={24} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleVideoPress}>
              <Text className="text-blue-500 text-lg">
                <Ionicons name="videocam" color="#000" size={24} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Sent Message */}
          <View className="flex-row justify-end mb-4">
            <View className="bg-blue-500 rounded-2xl px-4 py-3 max-w-xs">
              <Text className="text-white text-sm">
                Just did a drive test today with this beauty
              </Text>
            </View>
            <View className="w-8 h-8 rounded-full overflow-hidden ml-2">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Image Message */}
          <View className="flex-row justify-end mb-4">
            <View className="max-w-xs">
              <View className="rounded-2xl overflow-hidden">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop",
                  }}
                  className="w-60 h-48"
                  resizeMode="cover"
                />
              </View>
            </View>
            <View className="w-8 h-8 rounded-full overflow-hidden ml-2">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Received Message */}
          <View className="flex-row items-start mb-4">
            <View className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=32&h=32&fit=crop&crop=face",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="bg-gray-200 rounded-2xl px-4 py-3 max-w-xs">
              <Text className="text-black text-sm">
                Wow, that's gorgeous 🔥🔥🔥
              </Text>
            </View>
          </View>

          {/* Voice Message */}
          <View className="flex-row items-start mb-4">
            <View className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="bg-gray-200 rounded-2xl px-4 py-3 flex-row items-center space-x-3 w-8/12 ">
              <TouchableOpacity onPress={handleVoicePlay}>
                <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
                  <Text className="text-white text-xs">▶️</Text>
                </View>
              </TouchableOpacity>
              <View className="flex-1 h-1 bg-blue-200 rounded-full">
                <View className="h-1 bg-blue-500 rounded-full w-1/4" />
              </View>
              <Text className="text-xs text-gray-500">00:05</Text>
            </View>
          </View>

          {/* More Messages */}
          <View className="flex-row justify-end mb-4">
            <View className="bg-blue-500 rounded-2xl px-4 py-3 max-w-xs">
              <Text className="text-white text-sm">
                Wow, is that how the fake engine sounds like?
              </Text>
            </View>
            <View className="w-8 h-8 rounded-full overflow-hidden ml-2">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>

          <View className="flex-row items-start mb-4">
            <View className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=32&h=32&fit=crop&crop=face",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="bg-gray-200 rounded-2xl px-4 py-3 max-w-xs">
              <Text className="text-black text-sm">That sound 😍</Text>
            </View>
          </View>

          <View className="flex-row justify-end mb-4">
            <View className="bg-blue-500 rounded-2xl px-4 py-3 max-w-xs">
              <Text className="text-white text-sm">Yeah, what a car!</Text>
            </View>
            <View className="w-8 h-8 rounded-full overflow-hidden ml-2">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Typing Indicator */}
          <View className="flex-row items-start mb-4">
            <View className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="bg-gray-200 rounded-2xl px-4 py-3">
              <View className="flex-row space-x-1">
                <View className="w-2 h-2 bg-gray-400 rounded-full" />
                <View className="w-2 h-2 bg-gray-400 rounded-full" />
                <View className="w-2 h-2 bg-gray-400 rounded-full" />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Input Area */}
        <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
          <TouchableOpacity onPress={handleCameraPress} className="mr-3">
            <Text className="text-blue-500 text-xl">
              {" "}
              <Ionicons name="camera" color="#000" size={24} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleMicPress} className="mr-3">
            <Text className="text-blue-500 text-xl">
              {" "}
              <Ionicons name="mic" color="#000" size={24} />
            </Text>
          </TouchableOpacity>

          <View className="flex-1 mx-2">
            <TextInput
              placeholder="Start typing..."
              value={messageText}
              onChangeText={setMessageText}
              className="py-4 px-4 bg-gray-100 rounded-full text-sm focus:bg-white "
              placeholderTextColor="#9CA3AF"
              onSubmitEditing={handleSendMessage}
            />
          </View>

          <TouchableOpacity onPress={handleSendMessage}>
            <Text className="text-blue-500 text-xl">
              {" "}
              <Ionicons name="send" color="#000" size={24} />
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

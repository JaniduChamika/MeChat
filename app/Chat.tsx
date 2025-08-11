import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useGlobalSearchParams } from "expo-router";

import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const chatdata1 = [
  {
    id: "1",
    msg: "Good Morning",
    time: "08.41 pm",
    side: "left", // left for received messages
    status: "seen",
    type: "text",
  },
  {
    id: "2",
    msg: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop",
    time: "08.41 pm",
    side: "right", // right for sent messages
    status: "seen",
    type: "image",
  },
  {
    id: "3",
    msg: "voice_message_url_here",
    time: "08.41 pm",
    side: "left",
    status: "seen",
    type: "voice",
  },
  {
    id: "4",
    msg: "Just did a drive test today with this beauty",
    time: "09.15 pm",
    side: "right",
    status: "delivered",
    type: "text",
  },
  {
    id: "5",
    msg: "Wow, that's gorgeous 🔥🔥🔥",
    time: "09.20 pm",
    side: "left",
    status: "seen",
    type: "text",
  },
];
export default function ChatScreen() {
  const params = useGlobalSearchParams();
  const friendId = params.friendId;
  const name = params.name;
  const profilePic = params.profilePic;

  const [messageText, setMessageText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [user, setUser] = useState(null);
  const [chatdata, setChatData] = useState(chatdata1);
  const [playingVoice, setPlayingVoice] = useState(null);
  useEffect(() => {
    loaduser();
  }, []);
  useEffect(() => {
    loadChat();
  }, [user]);
  async function loaduser() {
    const userJsonText = await AsyncStorage.getItem("user");
    const userObject = JSON.parse(userJsonText);
    setUser(userObject);
    // console.log(userObject.name);
  }

  async function loadChat() {
    var formData = new FormData();
    formData.append("user_id", user?.id);
    formData.append("friend_id", friendId);
    var request = new XMLHttpRequest();
    request.onreadystatechange = await function () {
      if (request.readyState == 4 && request.status == 200) {
        var response = request.responseText;
        var responseJSONText = JSON.parse(response);
        setChatData(responseJSONText);
        console.log(response);
      }
    };
    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/MeChat/backend/load-chat.php",
      true
    );
    request.send(formData);
  }

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

  // Function to get user avatar based on side
  function getUserAvatar(side) {
    return side === "left"
      ? "http://10.0.2.2:8080/React-Native/MeChat/backend/" + profilePic
      : "";
  }

  // Function to render different message types

  const renderMessage = ({ item }) => {
    console.log("Rendering message:", item);
    const isRight = item.side === "right";

    return (
      <View
        key={item.id}
        className={`flex-row ${isRight ? "justify-end" : "items-start"} mb-1 px-2`}
      >
        {/* Left side avatar */}
        {!isRight && (
          <View className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <Image
              source={{ uri: getUserAvatar(item.side) }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        )}
        {/* Message content */}
        <View className="max-w-xs">
          {item.type === "text" && (
            <View
             className={`${isRight ? 'bg-blue-500 rounded-3xl rounded-tr-none' : 'bg-gray-200 rounded-3xl rounded-tl-none'} px-4 py-3`}
            >
              <Text
                className={`${isRight ? "text-white" : "text-black"} text-sm`}
              >
                {item.msg}
              </Text>
            </View>
          )}

          {item.type === "img" && (
            <View className="rounded-2xl overflow-hidden border-2 border-blue-100 ">
              <Image
                source={{
                  uri:
                    "http://10.0.2.2:8080/React-Native/MeChat/backend/" +
                    item.msg,
                }}
                className="w-60 h-48"
                resizeMode="cover"
              />
            </View>
          )}

          {item.type === "voice" && (
            <View
              className={`${isRight ? "bg-blue-500" : "bg-gray-200"} rounded-2xl px-4 py-3 flex-row items-center space-x-3 w-48`}
            >
              <TouchableOpacity onPress={() => handleVoicePlay(item.id)}>
                <View
                  className={`w-8 h-8  rounded-full items-center justify-center`}
                >
                  <Text
                    className={`${isRight ? "text-blue-500" : "text-white"} text-xs`}
                  >
                    {playingVoice === item.id ? (
                      <Ionicons name="pause-sharp" color="#000" size={24} />
                    ) : (
                      <Ionicons name="play" color="#6E6E6E" size={24} />
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
              <View className="flex-1 h-1 bg-blue-200 rounded-full">
                <View className="h-1 bg-blue-500 rounded-full w-1/4" />
              </View>
              <Text
                className={`text-xs ${isRight ? "text-blue-100" : "text-gray-500"}`}
              >
                00:05
              </Text>
            </View>
          )}

          {/* Message time and status */}
          <View
            className={`flex-row items-center mt-1 ${isRight ? "justify-end" : "justify-start"}`}
          >
            <Text className="text-xs text-gray-400 mr-1">{item.time}</Text>
            {isRight && (
              <Text className="text-xs text-gray-400">
                {item.status === "seen" ? (
                  <Ionicons name="checkmark-done" color="#0189D3" size={16} />
                ) : item.status === "delivered" ? (
                  <Ionicons name="checkmark-done" color="#A4A4A5" size={16} />
                ) : (
                  <Ionicons name="checkmark-sharp" color="#A4A4A5" size={16} />
                )}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Chat Header */}
        <View className="flex-row items-center justify-between px-4  py-3 border-b border-t border-gray-100 bg-blue-50">
          <View className="flex-row items-center flex-1 ">
            <TouchableOpacity
              onPress={() => router.push("/Layout")}
              className="mr-3"
            >
              <Text className="text-black text-xl">
                <Feather name="arrow-left" color="#000" size={24} />
              </Text>
            </TouchableOpacity>
            <View className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image
                source={{
                  uri:
                    "http://10.0.2.2:8080/React-Native/MeChat/backend/" +
                    profilePic,
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-lg font-semibold mt-1 text-black">
              {name}
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
        <FlatList
          data={chatdata}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 16 }}
          inverted={false} // Set to true if you want newest messages at bottom
        />

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

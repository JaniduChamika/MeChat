import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
const chats = [
  {
    id: "1",
    name: "Frientastics",
    message: "I love this great app 🔥🔥🔥",
    time: "17:17",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    online: false,
  },
  {
    id: "2",
    name: "Darren Black",
    message: "I know, right? 😍",
    time: "17:09",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    online: true,
  },
  {
    id: "3",
    name: "Lesa Richardson",
    message: "I'm so glad we found this app 🔥🔥🔥",
    time: "16:57",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=50&h=50&fit=crop&crop=face",
    online: false,
  },
  {
    id: "4",
    name: "Mark Twain",
    message: "Hey Cristina!",
    time: "16:49",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    online: false,
  },
  {
    id: "5",
    name: "3 Coma Club",
    message: "I will never drink again 😂😂💀",
    time: "16:41",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    online: false,
  },
  {
    id: "6",
    name: "Camila Bradley",
    message: "We had so much fun last night 🔥",
    time: "16:41",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    online: false,
  },
  {
    id: "7",
    name: "Curtis George",
    message: "Let me create a group 😎",
    time: "16:32",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    online: false,
  },
  {
    id: "8",
    name: "Florian Marcu",
    message: "This app is amazing 💥",
    time: "16:30",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    online: false,
  },
];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState();
  const [chatLast, setchatLast] = useState();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    //remove keyboard gap when keyboard is hidden
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    loadChatLast();
  }, [searchText, user]);

  async function loadChatLast() {
    const userJsonText = await AsyncStorage.getItem("user");
    const userObject = JSON.parse(userJsonText);
    var requestMsgObject = {
      userJsonObject: userObject,
      search_text: searchText,
    };
    var reqMsgJsonobject = JSON.stringify(requestMsgObject);
    // console.log(reqMsgJsonobject);
    var formData = new FormData();
    formData.append("reqMsgJsonobject", reqMsgJsonobject);
    var request = new XMLHttpRequest();
    request.onreadystatechange = await function () {
      if (request.readyState == 4 && request.status == 200) {
        var response = request.responseText;
        var responseJSONText = JSON.parse(response);
        setchatLast(responseJSONText);
        console.log("chat load: " + response);
      }
    };
    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/MeChat/backend/load-last-chat.php",
      true
    );
    request.send(formData);
  }

  const renderChat = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/Chat",
          params: {
            friendId: item.id,
            name: item.name,
            profilePic: item.image,
          },
        })
      }
      className="flex-row items-center px-5 py-2 border-b border-blue-50"
    >
      <View className="relative mr-4">
        <View className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            source={{
              uri:
                "http://10.0.2.2:8080/React-Native/MeChat/backend/" +
                item.image,
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        {item.online && (
          <View className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full" />
        )}
      </View>

      <View className="flex-1 ">
        <View className="flex-row justify-between items-center">
          <View className="flex-col items-start">
            <Text className="flex-row text-base font-semibold text-black">
              {item.name}
            </Text>
            <View className="flex-row items-center">
              {item.lastsender === "me" ? (
                <Text className="text-xs text-gray-400 mr-2">
                  {item.status === "seen" ? (
                    <Ionicons name="checkmark-done" color="#0189D3" size={13} />
                  ) : item.status === "delivered" ? (
                    <Ionicons name="checkmark-done" color="#A4A4A5" size={13} />
                  ) : (
                    <Ionicons
                      name="checkmark-sharp"
                      color="#A4A4A5"
                      size={13}
                    />
                  )}
                </Text>
              ) : (
                ""
              )}
              <Text className=" text-sm text-gray-600 " numberOfLines={1}>
                {item.message}
              </Text>
            </View>
          </View>

          <View className="flex-col items-center">
            <View className="flex-row">
              <Text className="text-xs text-gray-500 mr-2">{item.time}</Text>
            </View>

            {/* Unread count badge */}
            {item.count > 0 && (
              <View className="flex-row bg-blue-500 min-w-5 h-5 px-2 my-3 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {item.count > 99 ? "99+" : item.count}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : keyboardVisible
              ? "height"
              : undefined
        }
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}

        {/* Search Bar */}
        <View className="px-5 py-3">
          <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-1">
            <Text className="text-gray-400 mr-3">
              {" "}
              <Ionicons name="search-outline" color="#000" size={24} />
            </Text>
            <TextInput
              placeholder="Search for friends"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
              }}
              className="flex-1 text-base"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Chat List */}
        <FlatList
          data={chatLast}
          renderItem={renderChat}
          keyExtractor={(item) => item.id}
          className="flex-1"
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

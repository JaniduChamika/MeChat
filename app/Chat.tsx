import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useGlobalSearchParams } from "expo-router";

import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function ChatScreen() {
  const params = useGlobalSearchParams();
  const friendId = params.friendId;
  const name = params.name;
  const profilePic = params.profilePic;

  const [messageText, setMessageText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [user, setUser] = useState(null);
  const [chatdata, setChatData] = useState([]);
  const [playingVoice, setPlayingVoice] = useState(null);
  const [file, setFile] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loaduser();

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
    loadChat();
  }, [user]);

  async function loaduser() {
    const userJsonText = await AsyncStorage.getItem("user");
    const userObject = JSON.parse(userJsonText);
    setUser(userObject);
    // console.log(userObject.name);
  }

  function loadChat() {
    var formData = new FormData();
    formData.append("user_id", user?.id);
    formData.append("friend_id", friendId);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var response = request.responseText;
        var responseJSONText = JSON.parse(response);
        setChatData(responseJSONText);
        // console.log(response);
      }
    };
    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/MeChat/backend/load-chat.php",
      true
    );
    request.send(formData);
  }

  function SendMessage() {
    // console.log("Send message:", messageText);
    if (messageText.length != 0) {
      var requestMsgObject = {
        msg: messageText,
        from_user_id: user?.id,
        to_user_id: friendId,
      };
      var reqMsgJsonobject = JSON.stringify(requestMsgObject);
      var formData = new FormData();
      formData.append("reqMsgJsonobject", reqMsgJsonobject);
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          var response = request.responseText;

          if (response == "Success") {
            loadChat();
            setMessageText("");
          } else {
            console.log(response);
          }
        }
      };
      request.open(
        "POST",
        "http://10.0.2.2:8080/React-Native/MeChat/backend/chat-save.php",
        true
      );

      request.send(formData);
    }
  }

  // File type checker
  const getFileType = (mimeType, name) => {
    if (mimeType?.startsWith("image/")) return "image";
    if (mimeType?.includes("pdf") || name?.endsWith(".pdf")) return "pdf";
    return "document";
  };

  // File size formatter
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Pick document/file
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const fileInfo = {
          uri: file.uri,
          name: file.name,
          size: file.size,
          type: file.mimeType,
          fileType: getFileType(file.mimeType, file.name),
        };
        console.log("Selected file:", fileInfo);

        setSelectedFile(fileInfo);
        setShowPreviewModal(true);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
    setSelectedFile(null);
    setIsUploading(false);
  };

  const sendAttachment = () => {
    setIsUploading(true);
    var requestMsgObject = {
      from_user_id: user?.id,
      to_user_id: friendId,
      attach_type: selectedFile?.fileType,
    };
    var reqMsgJsonobject = JSON.stringify(requestMsgObject);
    var formData = new FormData();
    formData.append("reqMsgJsonobject", reqMsgJsonobject);
    formData.append("attachment", selectedFile);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var response = request.responseText;
        console.log(response);
        if (response == "Success") {
          loadChat();
          closePreviewModal();
          setIsUploading(false);
        } else {
          // console.log(response);
        }
      }
    };
    request.open(
      "POST",
      "http://10.0.2.2:8080/React-Native/MeChat/backend/attachment-save.php",
      true
    );

    request.send(formData);
  };

  const handleCallPress = () => {
    console.log("Call pressed");
  };

  const handleVideoPress = () => {
    console.log("Video call pressed");
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
  let lastMsgTime = "";
  let istimeVisible = true;
  const renderMessage = ({ item }) => {
    const isRight = item.side === "right";
    if (lastMsgTime == item.time) {
      istimeVisible = false;
    } else {
      istimeVisible = true;
    }
    lastMsgTime = item.time;
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
              className={`${isRight ? "bg-blue-500 rounded-3xl rounded-tr-none" : "bg-gray-200 rounded-3xl rounded-tl-none"} px-4 py-3`}
            >
              <Text
                className={`${isRight ? "text-white" : "text-black"} text-sm`}
              >
                {item.msg}
              </Text>
            </View>
          )}

          {item.type === "image" && (
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
          {istimeVisible ? (
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
                    <Ionicons
                      name="checkmark-sharp"
                      color="#A4A4A5"
                      size={16}
                    />
                  )}
                </Text>
              )}
            </View>
          ) : (
            ""
          )}
        </View>
      </View>
    );
  };

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // Render file preview based on type
  const renderFilePreview = () => {
    if (!selectedFile) return null;

    switch (selectedFile.fileType) {
      case "image":
        return (
          <View className="items-center">
            <Image
              source={{ uri: selectedFile.uri }}
              style={{
                width: screenWidth * 0.7,
                height: screenHeight * 0.4,
                borderRadius: 12,
              }}
              resizeMode="contain"
            />
          </View>
        );

      case "pdf":
        return (
          <View className="items-center bg-red-50 p-8 rounded-xl">
            <Feather name="file" color="#000" size={24} />
            <Text className="text-lg font-semibold text-gray-800 mt-4">
              PDF Document
            </Text>
            <Text className="text-sm text-gray-600 text-center mt-2">
              {selectedFile.name}
            </Text>
          </View>
        );

      default:
        return (
          <View className="items-center bg-blue-50 p-8 rounded-xl">
            <Feather name="file" color="#000" size={24} />
            <Text className="text-lg font-semibold text-gray-800 mt-4">
              Document
            </Text>
            <Text className="text-sm text-gray-600 text-center mt-2">
              {selectedFile.name}
            </Text>
          </View>
        );
    }
  };

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
          inverted={true}
        />

        {/* Input Area */}
        <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
          <TouchableOpacity onPress={pickDocument} className="mr-3">
            <Text className="text-blue-500 text-xl">
              {" "}
              <Entypo name="attachment" color="#000" size={20} />
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
              onSubmitEditing={SendMessage}
            />
          </View>

          <TouchableOpacity onPress={SendMessage}>
            <Text className="text-blue-500 text-xl">
              {" "}
              <Ionicons name="send" color="#000" size={24} />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Preview Modal */}
        <Modal
          visible={showPreviewModal}
          transparent={true}
          animationType="slide"
        >
          <View className="flex-1 bg-black/90">
            {/* Header */}
            <View className="flex-row  p-6 pt-12 items-center justify-between">
              <Text className="text-white font-semibold text-lg">Preview</Text>

              <View className="w-10" />
              <TouchableOpacity
                onPress={closePreviewModal}
                className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
              >
                <Ionicons name="close" color="#fff" size={24} />
              </TouchableOpacity>
            </View>

            {/* File Preview */}
            <ScrollView
              className="flex-1 px-6"
              contentContainerStyle={{
                justifyContent: "center",
                minHeight: "70%",
              }}
            >
              {renderFilePreview()}

              {/* File Info */}
              {selectedFile && (
                <View className="bg-white/10 rounded-xl p-4 mt-6">
                  <Text className="text-white font-semibold text-base mb-2">
                    {selectedFile.name}
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="text-white/70 text-sm">
                      Size: {formatFileSize(selectedFile.size)}
                    </Text>
                    <Text className="text-white/70 text-sm capitalize">
                      Type: {selectedFile.fileType}
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Bottom Actions */}
            <View className="p-6 pb-8">
              <View className="flex-row space-x-4 justify-end">
                <TouchableOpacity
                  onPress={sendAttachment}
                  disabled={isUploading}
                  className={` py-3 px-4 rounded-xl items-center flex-row justify-right ${
                    isUploading ? "bg-blue-400" : "bg-blue-500"
                  }`}
                >
                  <Text className="text-white font-semibold mr-2">
                    {isUploading ? "Sending..." : "Send"}
                  </Text>
                  <Ionicons name="send-sharp" color="#fff" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

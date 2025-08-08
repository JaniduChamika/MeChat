import { router } from "expo-router";
import React, { useState } from "react";
import {
      FlatList,
      Image,
      SafeAreaView,
      Text,
      TextInput,
      TouchableOpacity,
      View,
} from "react-native";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");

//   const stories = [
//     {
//       id: 1,
//       name: "Darren",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
//       online: false,
//     },
//     {
//       id: 2,
//       name: "Lesa",
//       image:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=60&h=60&fit=crop&crop=face",
//       online: true,
//     },
//     {
//       id: 3,
//       name: "Florian",
//       image:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
//       online: true,
//     },
//     {
//       id: 4,
//       name: "Curtis",
//       image:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
//       online: false,
//     },
//     {
//       id: 5,
//       name: "Camila",
//       image:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
//       online: false,
//     },
//   ];

  const chats = [
    {
      id: 1,
      name: "Frientastics",
      message: "I love this great app 🔥🔥🔥",
      time: "17:17",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      online: false,
    },
    {
      id: 2,
      name: "Darren Black",
      message: "I know, right? 😍",
      time: "17:09",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      online: true,
    },
    {
      id: 3,
      name: "Lesa Richardson",
      message: "I'm so glad we found this app 🔥🔥🔥",
      time: "16:57",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b3ae?w=50&h=50&fit=crop&crop=face",
      online: false,
    },
    {
      id: 4,
      name: "Mark Twain",
      message: "Hey Cristina!",
      time: "16:49",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      online: false,
    },
    {
      id: 5,
      name: "3 Coma Club",
      message: "I will never drink again 😂😂💀",
      time: "16:41",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      online: false,
    },
    {
      id: 6,
      name: "Camila Bradley",
      message: "We had so much fun last night 🔥",
      time: "16:41",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      online: false,
    },
    {
      id: 7,
      name: "Curtis George",
      message: "Let me create a group 😎",
      time: "16:32",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      online: false,
    },
    {
      id: 8,
      name: "Florian Marcu",
      message: "This app is amazing 💥",
      time: "16:30",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      online: false,
    },
    
  ];

  const handleMenuPress = () => {
    console.log("Menu pressed");
  };

  const handleSearchPress = () => {
    console.log("Search pressed");
  };

//   const handleStoryPress = (story) => {
//     console.log("Story pressed:", story.name);
//   };

  const handleChatPress = (chat) => {
    console.log("Chat pressed:", chat.name);
       router.push({ pathname: "/Chat", params: { id: chat.id.toString() } }); 
  };

//   const renderStory = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => handleStoryPress(item)}
//       className="flex items-center space-y-2 mr-4"
//     >
//       <View className="relative">
//         <View className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
//           <Image
//             source={{ uri: item.image }}
//             className="w-full h-full"
//             resizeMode="cover"
//           />
//         </View>
//         {item.online && (
//           <View className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
//         )}
//       </View>
//       <Text className="text-xs text-gray-600 font-medium">{item.name}</Text>
//     </TouchableOpacity>
//   );

  const renderChat = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleChatPress(item)}
      className="flex-row items-center px-5 py-4 border-b border-gray-50"
    >
      <View className="relative mr-4">
        <View className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            source={{ uri: item.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        {item.online && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
        )}
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-base font-semibold text-black">
            {item.name}
          </Text>
          <Text className="text-xs text-gray-500">{item.time}</Text>
        </View>
        <Text className="text-sm text-gray-600" numberOfLines={1}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 py-4 border-b border-gray-100">
        {/* <TouchableOpacity onPress={handleMenuPress}>
          <View className="space-y-1">
            <View className="w-5 h-0.5 bg-black" />
            <View className="w-5 h-0.5 bg-black" />
            <View className="w-5 h-0.5 bg-black" />
          </View>
        </TouchableOpacity> */}

        {/* <Text className="text-lg font-semibold text-black">Home</Text> */}

        {/* <TouchableOpacity onPress={handleSearchPress}>
          <View className="w-6 h-6 border-2 border-black border-opacity-60 rounded items-center justify-center">
            <Text className="text-xs">🔍</Text>
          </View>
        </TouchableOpacity> */}
      </View>

      {/* Search Bar */}
      <View className="px-5 py-3">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-1">
          <Text className="text-gray-400 mr-3">🔍</Text>
          <TextInput
            placeholder="Search for friends"
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 text-base"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Stories */}
      {/* <View className="px-5 py-2">
        <FlatList
          data={stories}
          renderItem={renderStory}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pb-2"
        />
      </View> */}

      {/* Chat List */}
      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      />

      {/* Home Indicator */}
      <View className="items-center pb-2">
        <View className="w-32 h-1 bg-black rounded-full" />
      </View>
    </SafeAreaView>
  );
}

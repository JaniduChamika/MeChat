import React, { useState, useCallback } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import { TabView } from "react-native-tab-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import Friend from "./Friend";
import Home from "./Home";
import Profile from "./Profile";

const TabViewExample = () => {
  const [index, setIndex] = useState(0);
  const [refreshKeys, setRefreshKeys] = useState({
    chat: 0,
    friend: 0,
    setting: 0
  });

  const routes = [
    { key: "chat", title: "Chat", icon: "chatbubbles" },
    { key: "friend", title: "Friend", icon: "people" },
    { key: "setting", title: "Setting", icon: "settings" },
  ];

  const handleIndexChange = useCallback((newIndex) => {
    const currentRoute = routes[newIndex];
    
    // Update index and refresh the selected tab
    setIndex(newIndex);
    setRefreshKeys(prev => ({
      ...prev,
      [currentRoute.key]: prev[currentRoute.key] + 1
    }));
  }, [routes]);

  const renderScene = useCallback(({ route }) => {
    // Only render the active scene to improve performance
    if (routes[index].key !== route.key) {
      return <View />;
    }

    switch (route.key) {
      case 'chat':
        return <Home key={refreshKeys.chat} />;
      case 'friend':
        return <Friend key={refreshKeys.friend} />;
      case 'setting':
        return <Profile key={refreshKeys.setting} />;
      default:
        return <View />;
    }
  }, [index, refreshKeys, routes]);

  const renderTabBar = useCallback((props) => {
    return (
      <View style={styles.tabBar} className="bg-gray-50">
        {routes.map((route, i) => {
          const isActive = index === i;
          
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => handleIndexChange(i)}
              key={route.key}
              activeOpacity={0.7}
            >
              <Ionicons
                name={route.icon}
                color={isActive ? "#0af" : "#666"}
                size={24}
              />
              <Text 
                style={{
                  color: isActive ? "#0af" : "#666",
                  fontSize: 12,
                  marginTop: 4,
                  fontWeight: isActive ? '600' : '400'
                }}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, [index, routes, handleIndexChange]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      tabBarPosition="bottom"
      swipeEnabled={false}
      lazy={true} // Enable lazy loading for better performance
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 20,
    marginBottom: 20,
    backgroundColor: '#f9fafb'
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    paddingTop: 8,
  },
});

export default TabViewExample;
import * as React from "react";
import {
  Animated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import Friend from "./Friend";
import Home from "./Home";
import Profile from "./Profile";
const ChatRoute = () => <Home />;
const FriendRoute = () => <Friend />;
const SettingRoute = () => <Profile />;
export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "chat", title: "Chat", icon: "chatbubbles" },
      { key: "friend", title: "Friend", icon: "people" },
      { key: "setting", title: "Setting", icon: "settings" },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const [chatColor, setChatColor] = React.useState("#0af");
    const [friendColor, setFriendColor] = React.useState("#000");
    const [settingColor, setSettingColor] = React.useState("#000");
    return (
      <View style={styles.tabBar} className="bg-gray-50">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => {
                this.setState({ index: i });

                setChatColor(route.key === "chat" ? "#0af" : "#000");
                setFriendColor(route.key === "friend" ? "#0af" : "#000");
                setSettingColor(route.key === "setting" ? "#0af" : "#000");
              }}
              key={route.key}
            >
              <Ionicons
                name={route.icon}
                color={
                  route.key === "chat"
                    ? chatColor
                    : route.key === "friend"
                      ? friendColor
                      : settingColor
                }
                size={24}
              />
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    chat: ChatRoute,
    friend: FriendRoute,
    setting: SettingRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        tabBarPosition="bottom"
        swipeEnabled={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
    marginBottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    paddingTop: 1,
  },
});

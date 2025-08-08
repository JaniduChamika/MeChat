import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Friend from "./Friend";
import "./global.css";
import Home from "./Home";
import Profile from "./Profile";
import ResetPw from "./reset";
import SignIn from "./signin";
import SignUp from "./signup";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: "Sign In",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPw"
        component={ResetPw}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="Friend"
        component={Friend}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Text,
} from "react-native";

import Theme from "../utils/Theme";

function CheckInHeader({ onPress, text, onPressD, onPressB }) {
  return (
    <View style={styles.container}>
      <View
        className="flex-row justify-between items-center"
        style={{ width: Platform.OS === "ios" ? "50%" : "60%" }}
      >
        <TouchableOpacity onPress={onPressB}>
          <Image
            source={require("../assets/images/backIcon.png")}
            className="h-[18] w-[11]"
          />
        </TouchableOpacity>

        <Text
          className="text-secondary text-2xl font-base self-center"
          style={{ marginLeft: Theme.hp(2) }}
        >
          {text}
        </Text>
      </View>

      <TouchableOpacity onPress={onPress}>
        <Image
          className="h-[20] w-[19]"
          source={require("../assets/images/search.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

export default CheckInHeader;
const styles = StyleSheet.create({
  container: {
    width: "87%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // alignSelf: 'center',
    marginLeft: 20,
    marginTop: Platform.OS === "ios" ? Theme.dh * 0.01 : Theme.dh * 0.03,
  },
});

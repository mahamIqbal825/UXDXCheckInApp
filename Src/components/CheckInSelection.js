import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import Theme from "../utils/Theme";

function CheckInSelection({
  allPress,
  notCheckPress,
  checkPress,
  allBG,
  notBG,
  checkBG,
  colorAll,
  colorNot,
  colorCheck,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.buttonAll, { backgroundColor: allBG }]}
        onPress={allPress}
      >
        <View style={styles.allCont}>
          <Image
            source={require("../assets/images/all.png")}
            style={[styles.allImage, { tintColor: colorAll }]}
          />
        </View>
        <Text style={[styles.allText, { color: colorAll }]}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonNotChek, { backgroundColor: notBG }]}
        onPress={notCheckPress}
      >
        <View style={styles.notCheckCont}>
          <Image
            source={require("../assets/images/notCheck.png")}
            style={[styles.notCheckImage, { tintColor: colorNot }]}
          />
        </View>
        <Text style={[styles.notCheckText, { color: colorNot }]}>
          Not Checked in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.checkButton, { backgroundColor: checkBG }]}
        onPress={checkPress}
      >
        <View style={styles.checkCont}>
          <Image
            source={require("../assets/images/check.png")}
            style={[styles.checkImage, { tintColor: colorCheck }]}
          />
        </View>
        <Text style={[styles.checkText, { color: colorCheck }]}>
          Checked in
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default CheckInSelection;
const styles = StyleSheet.create({
  container: {
    height: 45,
    width: Platform.OS == "ios" ? "88%" : "93%",
    borderWidth: 1,
    borderColor: Theme.borderColor,
    alignSelf: "center",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: Theme.hp(2),
  },
  buttonAll: {
    borderRightWidth: 1,
    borderRightColor: Theme.borderColor,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonNotChek: {
    borderRightWidth: 1,
    borderRightColor: Theme.borderColor,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  allCont: {
    paddingLeft: Platform.OS == "ios" ? Theme.wp(6) : Theme.wp(5),
    paddingRight: Platform.OS == "ios" ? Theme.wp(3) : Theme.wp(2),
  },
  allImage: {
    height: 11.9,
    width: 13.6,
  },
  allText: {
    paddingRight: Platform.OS == "ios" ? Theme.wp(5) : Theme.wp(5),
    fontSize: 12,
    fontWeight: "400",
  },
  notCheckCont: {
    paddingLeft: Platform.OS == "ios" ? Theme.wp(4) : Theme.wp(2),
    paddingRight: 6,
  },
  notCheckImage: {
    height: 12.75,
    width: 15.3,
  },
  notCheckText: {
    paddingRight: 15,
    fontSize: 12,
    fontWeight: "400",
  },
  checkCont: {
    paddingLeft: Platform.OS == "ios" ? Theme.wp(4) : Theme.wp(3),
    paddingRight: 5,
  },
  checkImage: {
    height: 14.4,
    width: 14.4,
  },
  checkText: {
    paddingRight: 15,
    fontSize: 12,
    fontWeight: "400",
  },
  checkButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

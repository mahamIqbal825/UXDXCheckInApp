import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Theme from "../utils/Theme";
function LogoutModal({ isVisible, pressOk, pressNo }) {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal}>
        <Text style={styles.textLogout}>Do you want to logout?</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: Theme.hp(4),
          }}
        >
          <TouchableOpacity style={styles.okBtn} onPress={pressOk}>
            <Text style={[styles.text, { color: "white" }]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={pressNo}>
            <Text style={[styles.text, { color: Theme.borderColor }]}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default LogoutModal;
const styles = StyleSheet.create({
  modal: {
    flex: 0.2,
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
  },
  textLogout: {
    alignSelf: "center",
    fontSize: 20,
    marginTop: Theme.hp(2),
    fontWeight: "500",
  },
  okBtn: {
    height: 40,
    width: "30%",
    backgroundColor: Theme.primaryColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    height: 40,
    width: "30%",
    borderWidth: 1,
    borderColor: Theme.borderColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 20, fontWeight: "600" },
});

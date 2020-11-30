import React, { useEffect, useState } from 'react';
import { 
  View, ScrollView, 
  Text, TextInput, 
  StyleSheet, 
  Modal, 
  Alert, 
  Keyboard, 
  TouchableOpacity, 
  TouchableHighlight, 
  TouchableWithoutFeedback, 
  Button, 
  Platform 
} from "react-native";
import { Colors } from "../constants/Colors.ts";

export default function CreditsModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={styles.horizontalContainer}>
                  <Button style={styles.openButton} title="Done"
                    onPress={() => { setModalVisible(!modalVisible); }} />
                </View>

                <Text style={styles.modalText}>
                  Credits!!
                </Text>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => { setModalVisible(true); }}
      >
        <Text style={styles.textStyle}>?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#c8a2c8",
    width: "90%", 
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    // backgroundColor: "#F194FF",
    // padding: 10,
    borderRadius: 20,
    elevation: 2, 

    position: "relative", 
    top: -12, 
    left: 22
  },
  textStyle: {
    color: Colors.text,
    fontSize: 26, 
    // fontWeight: "bold",
    // textAlign: "center", 
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }, 
  horizontalContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    margin: 4
  }, 
  title: {
    fontSize: 28, 
    padding: 15, 
    height: 50, 
    borderBottomWidth: 1, 
    borderColor: "gray", 
  }
});



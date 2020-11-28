import React, { useEffect, useState } from 'react';
import { 
  View, ScrollView, 
  Text, TextInput, 
  StyleSheet, 
  Modal, 
  Alert, 
  Keyboard, 
  TouchableHighlight, 
  TouchableWithoutFeedback, 
  Button, 
  Platform 
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { v4 as uuidv4 } from 'uuid';

export default function CreditsModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.outerWrapperView}>
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
                <Button style={styles.openButton}
                  title="Done"
                  onPress={() => { setModalVisible(!modalVisible); }} />

                {
                  // <Button style={styles.openButton}
                  //   title="Save" 
                  //   onPress={saveData} /> 
                }
              </View>

              <Text style={styles.modalText}>
                Credits!!
              </Text>


            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => { setModalVisible(true); }}
      >
        <Text style={styles.textStyle}>?</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapperView: {
    // position: "absolute", 
    // top: 0, 
    // right: 0
  }, 
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
    color: "white",
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



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
          <TouchableWithoutFeedback onPress={() => { setModalVisible(!modalVisible); }} >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                {
                  // <View style={styles.buttonContainer}>
                  //   <Button 
                  //     style={styles.openButton} 
                  //     color={Colors.text}
                  //     title="Done"
                  //     onPress={() => { setModalVisible(!modalVisible); }} />
                  // </View>
                }

                <View style={styles.textContainer}>
                  <Text style={styles.headerText}>
                    CREATED BY {"\n"}
                  </Text>
                  <Text style={styles.namesText}>
                    Elizabeth Wu {"\n"} 
                    Felicia Renelus {"\n"} 
                    Jasmine Shum {"\n"} 
                    Jennifer Wang {"\n"} 
                    Kevin Hsu {"\n"} 
                    Mandy He {"\n"} 
                  </Text>
                  <Text style={styles.modalText}>
                    {"Special thanks to all the salted caramel lattes and cookies out there <3"}
                  </Text>
                </View>

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
    backgroundColor: Colors.mocha,

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
    borderRadius: 20,
    elevation: 2, 

    paddingLeft: 10,
    paddingRight: 10,

    position: "relative", 
    top: -12, 
    left: 14
  },
  textStyle: {
    color: Colors.text,
    fontSize: 26, 
    // fontWeight: "bold",
    // textAlign: "center", 
  },
  headerText: {
    textShadowColor: Colors.text,
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 5,
    textDecorationLine: "underline", 
    color: Colors.yellow,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  namesText: {
    textShadowColor: Colors.text,
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 5,
    color: Colors.yellow,
    marginBottom: 8,
    textAlign: "center",
    fontSize: 16
  },
  modalText: {
    textShadowColor: Colors.text,
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 5,


    color: Colors.yellow,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14
  }, 
  horizontalContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    margin: 4
  }, 
  buttonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'absolute',
    width: '100%', 
    top: 6,
  }, 
  textContainer: {
    paddingTop: 20, 
    paddingBottom: 30, 
  },
  title: {
    fontSize: 28, 
    padding: 15, 
    height: 50, 
    borderBottomWidth: 1, 
    borderColor: "gray", 
  }
});



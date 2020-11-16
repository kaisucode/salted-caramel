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

export default function NewReminder({ insertData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, onChangeTitle] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  useEffect(() => {
    onChangeTitle("");
    setDate(new Date());
    setMode('date');
  }, [modalVisible]);

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
  };

  const saveData = () => {
    if (title){
      date.setSeconds(0);
      setModalVisible(!modalVisible); 
      insertData({"key": uuidv4(), "title": title, "date": date});
    }
    else {
      console.log("task name required");
    }
  };

  const showDatepicker = () => { showMode('date'); };
  const showTimepicker = () => { showMode('time'); };

  return (
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
                <TextInput
                  style={{...styles.modalText, ...styles.title}}
                  onChangeText = {text => onChangeTitle(text)}
                  value = {title}
                  placeholder = "Task name..."
                />
              </View>

              <Text style={styles.modalText}>New Task that you are probably going to procrastinate on</Text>

              <View style={styles.horizontalContainer}>
                <Button onPress={showDatepicker} title="Set date" />
                <Button onPress={showTimepicker} title="Set time" />
              </View>

              <View style={{width: "100%"}}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeTime} 
                />
              </View>

              <View style={styles.horizontalContainer}>
                <Button style={styles.openButton}
                  title="Cancel"
                  onPress={() => { setModalVisible(!modalVisible); }} />
                <Button style={styles.openButton}
                  title="Save" 
                  onPress={saveData} /> 
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Add a new reminder</Text>
      </TouchableHighlight>
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
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



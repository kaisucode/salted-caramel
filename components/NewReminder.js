import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, TextInput, Button, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewReminder({ insertData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, onTaskNameChange] = useState("");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  useEffect(() => {
    const currentDate = date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  }, [])

  const onChange = (event, selectedDate) => {
    console.log("selected: " + selectedDate);
    console.log("before change date: " + date);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const saveData = () => {
    console.log("saved date!!!: " + date);
    console.log(taskName);
    if (taskName){
      setModalVisible(!modalVisible); 
      insertData({"title": taskName, "date": date});
      console.log("just inserted data from component");
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={styles.horizontalContainer}>
              <TextInput
                style={{...styles.modalText, ...styles.taskName}}
                onChangeText = {text => onTaskNameChange(text)}
                value = {taskName}
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
                onChange={onChange} 
              />
            </View>

            <View style={styles.horizontalContainer}>
              <Button style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => { setModalVisible(!modalVisible); }}
                title="Cancel" />
              <Button style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={saveData}
                title="Save" />
            </View>

          </View>
        </View>
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
  taskName: {
    fontSize: 28, 
    padding: 15, 
    height: 50, 
    borderBottomWidth: 1, 
    borderColor: "gray", 
  }
});



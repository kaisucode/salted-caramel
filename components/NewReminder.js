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

export default function NewReminder({ insertData, isNewReminder, oldReminderData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, onChangeTitle] = useState("");

  const [isScheduledReminderMode, setIsScheduledReminderMode] = useState(true);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('datetime');

  useEffect(() => {
    if (isNewReminder){
      onChangeTitle("");
      setDate(new Date());
      setMode('datetime');
    }
    else{
      onChangeTitle(oldReminderData.title);
      setDate(oldReminderData.date);
      const curMode = (oldReminderData.isScheduled) ? "datetime" : "countdown";
      setMode(curMode);
      setModalVisible(true);
    }
  }, [modalVisible]);

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);

    const newDate = new Date();
    if (currentMode == "countdown")
    {
      newDate.setMinutes(10);
      newDate.setHours(0);
    }
    setDate(newDate);
  };

  const saveData = () => {
    if (!title){
      console.log("task name required");
      return;
    }

    date.setSeconds(0);

    const keyToUse = (isNewReminder) ? uuidv4() : oldReminderData.key;

    const newData = {"key": keyToUse, "title": title, "date": date, "isScheduled": (mode == "datetime")}
    insertData(newData);

    setModalVisible(!modalVisible); 
  };

  const cancelSaveData = () => {
    if (isNewReminder)
      setModalVisible(!modalVisible);
    else
      insertData(oldReminderData);
  }

  const showDatetime = () => { showMode('datetime'); };
  const showCountdown = () => { showMode('countdown'); };

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
                <TextInput
                  style={{...styles.modalText, ...styles.title}}
                  onChangeText = {text => onChangeTitle(text)}
                  value = {title}
                  placeholder = "Task name..."
                />
              </View>

              <Text style={styles.modalText}>New Task that you are probably going to procrastinate on</Text>

              <View style={styles.horizontalContainer}>
                <Button onPress={showDatetime} title="Scheduled" />
                <Button onPress={showCountdown} title="Recurring" />
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
                  onPress={cancelSaveData} />
                <Button style={styles.openButton}
                  title="Save" 
                  onPress={saveData} /> 
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>

      {isNewReminder &&
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >

          <Text style={styles.textStyle}>+</Text>
        </TouchableHighlight>
      }
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
    top: -15, 
    right: 20
  },
  textStyle: {
    color: "white",
    fontSize: 30, 
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



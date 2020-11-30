import React, { useEffect, useState } from 'react';
import { 
  View, ScrollView, 
  Text, TextInput, 
  StyleSheet, 
  Modal, 
  Alert, 
  Keyboard, 
  TouchableHighlight, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Button, 
  Platform 
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { v4 as uuidv4 } from 'uuid';
import { Colors } from "../constants/Colors.ts";

export default function NewReminder({ insertData, isNewReminder, oldReminderData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, onChangeTitle] = useState("");


  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('datetime');
  const [isScheduledReminderMode, setIsScheduledReminderMode] = useState(true);

  useEffect(() => {
    if (isNewReminder){
      let newDate = new Date();
      onChangeTitle("");
      setDate(newDate);
      setMode('datetime');
      setIsScheduledReminderMode(true);
    }
    // else{
    //   onChangeTitle(oldReminderData.title);
    //   setDate(oldReminderData.date);
    //   const curMode = (oldReminderData.isScheduled) ? "datetime" : "countdown";
    //   setMode(curMode);
    //   setModalVisible(true);
    // }
  }, [modalVisible]);

  useEffect(() => {
    if (!isNewReminder){
      console.log("modal rendered!!");
      onChangeTitle(oldReminderData.title);
      setDate(oldReminderData.date);
      console.log("date: " + JSON.stringify(oldReminderData.date));

      if (oldReminderData.isScheduled){
        setMode("datetime");
        setIsScheduledReminderMode(true);
      }
      else{
        setMode("countdown");
        setIsScheduledReminderMode(false);
      }
      setModalVisible(true);
    }
  }, []);

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    if (isNewReminder){
      currentDate.setSeconds(0);
    }

    setDate(currentDate);
    console.log("new DATE:         " + JSON.stringify(date));
    console.log("currentDate:         " + JSON.stringify(currentDate));
  };

  const showMode = (currentMode) => {
    setMode(currentMode);

    const newDate = new Date();
    if (currentMode == "countdown")
    {
      setIsScheduledReminderMode(false);
      newDate.setMinutes(1); // just one minute for testing
      newDate.setHours(0);
    }
    else
      setIsScheduledReminderMode(true);
    setDate(newDate);
  };

  const saveData = () => {
    if (!title){
      console.log("task name required");
      return;
    }

    const keyToUse = (isNewReminder) ? uuidv4() : oldReminderData.key;
    const newData = {"key": keyToUse, "title": title, "date": date, "isScheduled": (mode == "datetime")}
    console.log("NewReminder: saving and inserting data");


    try {
      console.log("trying to see if date works: checkpoint1");
      console.log(date.getHours());
      console.log(date.getMinutes());
    } catch (e) {
      console.log("DATE IS BROKEEEEEEEEEEEEEEEEEEEEN");
    }


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

              <View style={styles.buttonContainer}>

                <View style={styles.buttonLeft}>
                  <Button 
                    style={styles.openButton}
                    title="Cancel"
                    color={Colors.text}
                    onPress={cancelSaveData} />
                </View>
                <View style={styles.buttonRight}>
                  <Button 
                    style={styles.openButton}
                    color={Colors.text}
                    title="Save" 
                    onPress={saveData} /> 
                </View>
              </View>

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
                <View style={ isScheduledReminderMode ? styles.modeButtonContainerActivated : styles.modeButtonContainer}>
                  <Button color={"white"} onPress={showDatetime} title="Scheduled" />
                </View>
                <View style={ isScheduledReminderMode ? styles.modeButtonContainer : styles.modeButtonContainerActivated}>
                  <Button color={"white"} onPress={showCountdown} title="Recurring" />
                </View>
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

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>

      {isNewReminder &&
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>
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
    backgroundColor: Colors.mocha,
    width: "90%", 
    width: '100%',
    height: '90%',
    borderRadius: 20,
    padding: 30,
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
  newButton: {
    backgroundColor: 'transparent',
    paddingLeft: 10,
    paddingRight: 10,

    borderRadius: 20,
    elevation: 2, 

    position: "relative", 
    top: -15, 
    right: 12,
  },
  textStyle: {
    color: Colors.text,
    fontSize: 30, 
    // fontWeight: "bold",
    // textAlign: "center", 
  },
  modalText: {
    color: Colors.text,
    marginBottom: 15,
    textAlign: "center"
  }, 
  horizontalContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    margin: 4,
    marginTop: 20
  }, 
  openButton: {
    backgroundColor: "black",
    // padding: 10,
    // borderRadius: 20,
    // elevation: 2, 

    // position: "relative", 
    // top: -15, 
  },
  buttonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    // justifyContent: 'center', 
    position: 'absolute',
    width: '100%', 
    top: 6,
  }, 
  buttonLeft: {
    width: '50%', 
    alignItems: 'flex-start', 
    left: 0,
  },
  buttonRight: {
    width: '50%', 
    alignItems: 'flex-end', 
    right: 0,
  },
  modeButtonContainer: {
    backgroundColor: Colors.text,
    padding: 2,
    margin: 10,
    borderRadius: 10, 
  },
  modeButtonContainerActivated: {
    backgroundColor: Colors.text,
    padding: 2,
    margin: 10,
    borderRadius: 10, 
    borderColor: "white",
    borderWidth: 2,
  }, 
  title: {
    fontSize: 24, 
    padding: 15, 
    height: 60, 
    borderBottomWidth: 1, 
    borderColor: Colors.text, 
  }
});



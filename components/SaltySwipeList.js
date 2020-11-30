import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import NewReminder from './NewReminder';

import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Notifications from 'expo-notifications';

import { Colors } from "../constants/Colors.ts";

export default function SaltySwipeList({ listData, setListData, updateReminder }) {

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = async (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    const notifID = listData[prevIndex].notificationID;
    newData.splice(prevIndex, 1);
    setListData(newData);
    try {
      await Notifications.cancelScheduledNotificationAsync(notifID);
      console.log("deleted notif for: " + listData[prevIndex].title);
    } catch(e){
      console.log("deleteRow: failed to cancel scheduled notification");
      console.log(e);
    }
  };

  const onRowDidOpen = rowKey => {
    // console.log('This row opened', rowKey);
  };

  const renderItem = data => {
    const datetime = new Date(data.item.date)
    const dateString = datetime.toDateString();
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();

    const datetimeString = `${dateString} ${hours}:${minutes}`;
    const prefix = (data.item.isScheduled) ? "Scheduled: " : "Recurring: ";

    return (
      <View style={styles.rowFront}>
        <Text>{ prefix + data.item.title }</Text>
        <Text>{ datetimeString }</Text>
      </View>
    )};

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => editRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const [reminderToBeEdited, setReminderToBeEdited] = useState({});
  const [shouldRenderEditor, setShouldRenderEditor] = useState(false);

  const editRow = async (rowMap, rowKey) => {
    console.log("button pressed");
    const newData = [...listData];
    const targetIndex = listData.findIndex(item => item.key === rowKey);

    setReminderToBeEdited(listData[targetIndex]);
    setShouldRenderEditor(true);
    closeRow(rowMap, rowKey);
    console.log("SaltySwipeList: editRow");
  };

  const receiveUpdatedContent = (content) => {
    console.log("SaltySwipeList: receiveUpdatedContent");

    try {
      console.log("trying to see if date works: checkpoint2");
      console.log(content.date.getHours());
      console.log(content.date.getMinutes());
    } catch (e) {
      console.log("DATE IS BROKEEEEEEEEEEEEEEEEEEEEN");
    }


    const newContent = {...content};
    updateReminder(newContent);
    setShouldRenderEditor(false);
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={closeRow}>
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
          disableRightSwipe
          closeOnRowPress
          closeOnRowOpen
          closeOnScroll
          closeOnRowBeginSwipe
        />
      </TouchableWithoutFeedback>

      {shouldRenderEditor && 
        <NewReminder 
          style={styles.newReminderButton} 
          insertData={receiveUpdatedContent} 
          isNewReminder={false}
          oldReminderData={reminderToBeEdited}
        />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#343d46',
    backgroundColor: Colors.backgroundColor,
    backgroundColor: '#f6be9a',
    backgroundColor: '#a9714B',
    backgroundColor: Colors.gold,
    flex: 1,

    borderTopColor: Colors.text,
    borderTopWidth: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#a9714B',
    backgroundColor: Colors.gold,

    alignItems: 'center',
    justifyContent: 'center',
    height: 75,

    borderBottomColor: Colors.text,
    borderBottomWidth: 1,
  },
  rowBack: {
    // backgroundColor: '#343d46',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    borderBottomColor: Colors.text,
    borderBottomWidth: 1,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: Colors.text,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

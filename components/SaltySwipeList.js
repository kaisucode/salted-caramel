import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Notifications from 'expo-notifications';

export default function SaltySwipeList({ listData, setListData }) {

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
    } catch(e){
      console.log("deleteRow: failed to cancel scheduled notification");
      console.log(e);
    }
  };

  const onRowDidOpen = rowKey => {
    // console.log('This row opened', rowKey);
  };

  const renderItem = data => (
    <View style={styles.rowFront}>
      {
      // <Text>
      //   {data.item.isScheduled
      //     ? "Scheduled: "
      //     : "Recurring: "
      //   }
      // </Text>
      }
      <Text>{data.item.title}</Text>
      <Text>{"" + (data.item.date)}</Text>
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343d46',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#F6BE9A',
    backgroundColor: '#DDA778', 

    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  rowBack: {
    backgroundColor: '#343d46',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    borderBottomColor: 'black',
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
    backgroundColor: 'purple',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

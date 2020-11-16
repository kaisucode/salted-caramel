import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';

import { Text, View } from '../components/Themed';
import EditScreenInfo from '../components/EditScreenInfo';
import NewReminder from '../components/NewReminder';
import SaltySwipeList from '../components/SaltySwipeList';

export default function TabOneScreen() {

	const defaultData = [
		{
			"key": "5078cf4c-5ff4-4aa4-9a05-2271f2d175fc", 
			"title": "task1", 
			"date": new Date(1598051730000), 
			"notificationID": "blah2"
		}, 
		{
			"key": "e48be5d3-30f5-48a3-8481-b1d961be784f",
			"title": "task2",
			"date": new Date(1598056000000), 
			"notificationID": "blah"
		} 
	];

	const [allReminders, setAllReminders] = useState([...defaultData]);

	// For dev use; re-initialize data at any time
	const setDefaultData = async () => {
		const newReminders = [...defaultData];
		const dataToStore = JSON.stringify({"data": newReminders});
		try {
			await AsyncStorage.setItem('@reminder_data', dataToStore);
			setAllReminders(newReminders);
		} catch(e){
			console.log("Error storing data: " + e);
		}
		
		Notifications.scheduleNotificationAsync({
			content: {
				title: "Plz get back to work",
				body: "Scheduled Reminder: blah",
			},
			trigger: null,
		});
	};

	const storeData = async (contents) => {
		const newReminders = [...allReminders];
		const notifID = await Notifications.scheduleNotificationAsync({
			content: {
				title: "Plz get back to work",
				body: "Scheduled Reminder: " + contents.title,
			},
			trigger: contents.date
		});

		contents["notificationID"] = notifID;
		newReminders.push(contents);

		const dataToStore = JSON.stringify({"data": newReminders});
		try {
			await AsyncStorage.setItem('@reminder_data', dataToStore);
			setAllReminders(newReminders);
		} catch(e){
			console.log("Error storing data: " + e);
		}
	};

	const getData = async () => {
		try {
			const stringReminders = await AsyncStorage.getItem('@reminder_data')
			console.log("returned stored object: " + JSON.stringify(stringReminders));
			return jsonReminders = (stringReminders != null) ? JSON.parse(stringReminders).data : null;
		} catch (e) {
			console.log("Error loading data: " + e);
		}
	}

	const changeReminderData = (newData) => {
		setAllReminders(newData);
	}

	useEffect(() => {
		getData().then((arrReminders) => {
			setAllReminders(arrReminders);
		}, () => {
			setAllReminders(defaultData);
		});

		// notification settings
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: false,
				shouldSetBadge: false,
			}),
		});
	}, []);

	const clearAllNotifications = async () => {
		await Notifications.cancelAllScheduledNotificationsAsync();
	}

  return (
    <View style={{flex: 1}}>
    <View style={styles.container}>

			<Text style={styles.title}>Scheduled Reminders</Text>
			<NewReminder insertData={storeData}/>

			<Button onPress={setDefaultData} title="reset to default data" />
			<Button onPress={clearAllNotifications} title="clear all notifications" />

    </View>
		<SaltySwipeList listData={allReminders} setListData={changeReminderData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

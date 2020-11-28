import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';

import { Text, View } from '../components/Themed';
import EditScreenInfo from '../components/EditScreenInfo';
import NewReminder from '../components/NewReminder';
import CreditsModal from '../components/CreditsModal';
import SaltySwipeList from '../components/SaltySwipeList';

export default function TabOneScreen({ navigation }) {

	const defaultData = [
		{
			"key": "5078cf4c-5ff4-4aa4-9a05-2271f2d175fc", 
			"title": "task1", 
			"date": new Date(1598051730000), 
			"notificationID": "blah2", 
			"isScheduled": true
		}, 
		{
			"key": "e48be5d3-30f5-48a3-8481-b1d961be784f",
			"title": "task2",
			"date": new Date(1598056000000), 
			"notificationID": "blah", 
			"isScheduled": false
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

		const aTrigger = (contents.isScheduled) ? contents.date : {
			hours: contents.date.getHours(), 
			minutes: contents.date.getMinutes(), 
			repeats: true
		};

		const notifID = await Notifications.scheduleNotificationAsync({
			content: {
				title: "Plz get back to work",
				body: "Reminder: " + contents.title,
			},
			trigger: aTrigger
		});

		console.log(JSON.stringify(newReminders));
		console.log(newReminders.length);
		console.log("---------");
		contents["notificationID"] = notifID;
		newReminders.push(contents);

		console.log(JSON.stringify(newReminders));
		console.log(newReminders.length);
		console.log(contents.key);

		changeReminderData(newReminders);
	};

	const getData = async () => {
		try {
			const stringReminders = await AsyncStorage.getItem('@reminder_data')
			console.log("returned stored object: " + JSON.stringify(stringReminders));
			return jsonReminders = (stringReminders != null) ? JSON.parse(stringReminders).data : null;
		} catch (e) {
			console.log("Error loading data: " + e);
		}
	};

	const changeReminderData = async (newData) => {
		const dataToStore = JSON.stringify({"data": newData});
		try {
			await AsyncStorage.setItem('@reminder_data', dataToStore);
			setAllReminders(newData);
		} catch(e){
			console.log("Error storing data: " + e);
		}
	};

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

	React.useLayoutEffect(() => {
    navigation.setOptions({
			headerRight: () => (
				<NewReminder style={styles.newReminderButton} insertData={storeData}/>
			),
			headerLeft: () => (
				<CreditsModal style={styles.newReminderButton} />
			),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
			<SaltySwipeList listData={allReminders} setListData={changeReminderData}/>

			<Button onPress={setDefaultData} title="reset to default data" />
			<Button onPress={clearAllNotifications} title="clear all notifications" />
			{
				// <View style={styles.container}>
				//   <Text style={styles.title}>Scheduled Reminders</Text>
				// </View>
			}
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
	newReminderButton: {
		position: "absolute", 
		top: 0,
		backgroundColor: 'blue',
		borderColor: "red", 
		borderWidth: 1,
	}, 
});

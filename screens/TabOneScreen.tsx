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
import { getRandomMessage } from '../components/utils.js';

import { Colors } from "../constants/Colors.ts";

export default function TabOneScreen({ navigation }) {

	const defaultData = [
		{
			"key": "5078cf4c-5ff4-4aa4-9a05-2271f2d175fc", 
			"title": "Welcome!", 
			"date": new Date(1598051730000), 
			"notificationID": "blah2", 
			"isScheduled": true
		}, 
		{
			"key": "e48be5d3-30f5-48a3-8481-b1d961be784f",
			"title": "This is a very salty app",
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

	const createNotificationFromReminder = async (contents) => {
		const numOfSeconds = (contents.date.getHours() * 60 + contents.date.getMinutes()) * 60;
		const aTrigger = (contents.isScheduled) ? contents.date : {
			seconds: numOfSeconds,
			repeats: true
		};

		try {
			const notifID = await Notifications.scheduleNotificationAsync({
				content: {
					title: "Salty Caramel: " + contents.title,
					body: getRandomMessage("foo"),
				},
				trigger: aTrigger
			});
			return notifID;
		} catch(e) {
			// in case the timestamp has already passed, in which case no notification needed, 
			// and this is just to fill the list data to keep track of the title and timestamp
			console.log(e);
			return "";
		}
	}

	const storeReminder = async (contents) => {
		createNotificationFromReminder(contents).then((newNotifID) => {
			contents["notificationID"] = newNotifID;
			console.log("notifID generated: " + JSON.stringify(contents));
			const newReminders = [...allReminders];
			newReminders.push(contents);
			changeReminderData(newReminders);
		}) 
	};

	const updateReminder = async (contents) => {

    try {
      console.log("trying to see if date works: checkpoint3");
      console.log(contents.date.getHours());
      console.log(contents.date.getMinutes());
    } catch (e) {
      console.log("DATE IS BROKEEEEEEEEEEEEEEEEEEEEN");
    }

    const targetIndex = allReminders.findIndex(item => item.key === contents.key);
		const oldNotifID = contents["notificationID"];
    try {
      await Notifications.cancelScheduledNotificationAsync(oldNotifID);
    } catch(e){
      console.log("deleteRow: failed to cancel scheduled notification");
      console.log(e);
    }

		const updatedContents = {...contents};
		const newReminders = [...allReminders];
		updatedContents["notificationID"] = createNotificationFromReminder(contents);
		console.log("TabOneScreen: updateReminder");
		console.log("TabOneScreen: updateReminder: " + JSON.stringify(newReminders[targetIndex]));
		newReminders[targetIndex] = updatedContents;
		console.log("TabOneScreen: updateReminder: " + JSON.stringify(newReminders[targetIndex]));
		console.log("TabOneScreen: contents: " + JSON.stringify(contents));
		console.log("TabOneScreen: updatedcontents: " + JSON.stringify(updatedContents));
		changeReminderData(newReminders);
	}

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
			headerStyle: { backgroundColor: Colors.header },
			headerTintColor: Colors.text,
			headerRight: () => (
				<NewReminder 
					style={styles.newReminderButton} 
					insertData={storeReminder} 
					isNewReminder={true}
				/>
			),
			headerLeft: () => (
				<CreditsModal 
					style={styles.newReminderButton} 
					setDefaultData={setDefaultData}
					clearAllNotifications={clearAllNotifications}
				/>
			),
    });
  }, [navigation, allReminders]);

  return (
    <View style={{flex: 1}}>
			<SaltySwipeList listData={allReminders} setListData={changeReminderData} updateReminder={updateReminder}/>
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

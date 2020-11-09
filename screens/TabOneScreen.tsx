import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import NewReminder from '../components/NewReminder';
import { Text, View } from '../components/Themed';
// import DateTimePicker from '@react-native-community/datetimepicker';

export default function TabOneScreen() {

	const [allReminders, setAllReminders] = useState({
		"task1": {"date": new Date(1598051730000)}, 
		"task2": {"date": new Date(1598056000000)}
	});
	const [orderedTaskNames, setOrderedTaskNames] = useState(["task1", "task2"])

	const addReminder = (name, contents) => {
		var newReminders = allReminders;
		newReminders[name] = contents;
		setAllReminders(newReminders);

		var newTaskNames = orderedTaskNames;
		newTaskNames.push(name);
		setOrderedTaskNames(newTaskNames);

		console.log(JSON.stringify(allReminders));
	};

  return (
    <View style={styles.container}>
			<NewReminder insertData={addReminder}/>

			{
				orderedTaskNames.map(name => 
				<View>
					<Text>{ name }: { JSON.stringify(allReminders[name]["date"]) }</Text>
				</View>)
			}

			<Text> { JSON.stringify(allReminders) } </Text>

      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


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

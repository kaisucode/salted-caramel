import React, { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import NewReminder from '../components/NewReminder';
import { Text, View } from '../components/Themed';
// import DateTimePicker from '@react-native-community/datetimepicker';

 
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];


export default function TabOneScreen() {

	const [allReminders, setAllReminders] = useState({
		"task1": {"date": new Date(1598051730000)}, 
		"task2": {"date": new Date(1598056000000)}
	});
	const [orderedTaskNames, setOrderedTaskNames] = useState(["task1", "task2"]);

	const addReminder = (name, contents) => {
		var newReminders = allReminders;
		newReminders[name] = contents;
		setAllReminders(newReminders);

		var newTaskNames = orderedTaskNames;
		newTaskNames.push(name);
		setOrderedTaskNames(newTaskNames);

		console.log(JSON.stringify(allReminders));
	};

	const renderItem = ({ item }) => (
		<View>
			<Text>{ item }: { JSON.stringify(allReminders[item]["date"]) }</Text>
		</View>
	);

  return (
    <View style={styles.container}>
			<NewReminder insertData={addReminder}/>

			<SafeAreaView style={{flex: 1}} >
				<FlatList
					data={orderedTaskNames}
					renderItem={renderItem}
				/>
			</SafeAreaView>

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

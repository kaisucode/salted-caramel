import React, { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import NewReminder from '../components/NewReminder';
import { Text, View } from '../components/Themed';
 
export default function TabOneScreen() {

	const [allReminders, setAllReminders] = useState([
		{
			"title": "task1", 
			"date": new Date(1598051730000)
		}, 
		{
			"title": "task2",
			"date": new Date(1598056000000)
		} 
	]);

	const addReminder = (contents) => {
		const newReminders = [...allReminders];
		newReminders.push(contents);
		setAllReminders(newReminders);
	};

  // useEffect(() => {
  //   const currentDate = date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  // }, [])

	const renderItem = ({ item }) => (
		<View>
			<Text>{ item.title }: { JSON.stringify(item.date) }</Text>
		</View>
	);

  return (
    <View style={styles.container}>
			<NewReminder insertData={addReminder}/>

			<SafeAreaView style={{flex: 1}} >
				<FlatList
					data={allReminders}
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

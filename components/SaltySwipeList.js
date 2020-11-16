import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function SaltySwipeList() {
	// const [listData, setListData] = useState(
	//   Array(20)
	//   .fill('')
	//   .map((_, i) => ({ 
	//     key: `${i}`, 
	//     text: `item #${i}` 
	//   }))
	// );

	const [listData, setListData] = useState(
		[
			{
				"key": "task1", 
                "title": "task1", 
				"text": `${new Date(1598051730000)}`
			}, 
			{
				"key": "task2",
                "title": "task2", 
				"text": `${new Date(1598056000000)}`
			} 
		]
	);

	const closeRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};

	const deleteRow = (rowMap, rowKey) => {
		closeRow(rowMap, rowKey);
		const newData = [...listData];
		const prevIndex = listData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		setListData(newData);
	};

	const onRowDidOpen = rowKey => {
		// console.log('This row opened', rowKey);
	};

	const renderItem = data => (
		<View style={styles.rowFront}>
			<Text>{data.item.title}</Text>
			<Text>{data.item.text}</Text>
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
		backgroundColor: 'white',
		flex: 1,
		// width: '100%'
	},
	backTextWhite: {
		color: '#FFF',
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
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
		backgroundColor: 'blue',
		right: 75,
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0,
	},
});

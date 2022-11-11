// @ts-nocheck
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Pressable, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'


const ChooseCategory = ({ navigation }) => {
    const [productsList, setProductsList] = useState([]);
    useEffect(() => {
        setProductsList([
            {
                id: 1,
                name: "Cardiologist",
                image: require("./assets/heart.png"),
                selected: true
            },
            {
                id: 2,
                name: "Ophthalmologist",
                image: require("./assets/eye.png")
            },
            {
                id: 3,
                name: "Virologist",
                image: require("./assets/germs.png")
            },
            {
                id: 4,
                name: "Pulmonologist",
                image: require("./assets/lungs.png"),
                selected: true
            },
            {
                id: 5,
                name: "Gastroenterologist",
                image: require("./assets/stomach.png"),
                selected: true
            },
            {
                id: 6,
                name: "Rheumatologist",
                image: require("./assets/muscles.png")
            },
            {
                id: 7,
                name: "Stomatologist",
                image: require("./assets/teeth.png")
            },
            {
                id: 8,
                name: "Orthopedic",
                image: require("./assets/bone.png"),
                selected: true
            },
        ]);
    }, []);
    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Choose your category</Text>
            <FlatList
                style={styles.courseList}
                data={productsList}
                renderItem={({ item }) => <Course course={item} />}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    )
}

export default ChooseCategory;

const styles = StyleSheet.create({
    container: {
        paddingTop: '15%',
        flex: 1,
        backgroundColor: "#23AAFA",
        paddingHorizontal: 5
    },
    heading: { color: "#fff", fontWeight: 'bold', fontSize: 18, paddingLeft: 10, paddingBottom: 15, lineHeight: 23 },
    courseList: {
        flex: 1,
    },
    columnWrapper: {
        justifyContent: "space-around"
    }
})


const Course = ({ course }) => {
    return (
        <View style={courseStyles.container}>
            <Image source={course.image} style={courseStyles.image} />
            <Text style={[courseStyles.text, { color: course.selected ? "#23AAFA" : "#000" }]}>{course.name}</Text>
        </View>
    );
};

const courseStyles = StyleSheet.create({
    container: {
        marginBottom: 10,
        height: 140,
        width: 165,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '8%'
    },
    image: { height: 48, width: 38, resizeMode: 'contain' },
    text: { color: "#989DA0", textAlign: 'center' }

});

import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Pressable, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesList } from '../../store';
const ChooseCategory = ({ navigation }) => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const { api } = useSelector(state => state?.appointment);
    const categoryImages = [
        require("./assets/heart.png"),
        require("./assets/eye.png"),
        require("./assets/germs.png"),
        require("./assets/lungs.png"),
        require("./assets/stomach.png"),
        require("./assets/muscles.png"),
        require("./assets/teeth.png"),
        require("./assets/bone.png"),
    ]

    useEffect(() => {
        dispatch(getCategoriesList())
            .then(unwrapResult).then((res) => {
                setCategories(res)
            }).catch((error) => { console.log("Error: ", error) })
    }, [])

    useEffect(() => {
    setTimeout(() => {
        navigation.navigate('homeScreen')
    }, 3000);
    }, [])
    
    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Choose your category</Text>
            {api.loading == 'pending' && <Loader />}
            <FlatList
                style={styles.courseList}
                data={categories}
                renderItem={({ item, index }) => <Category category={item} index= {index} categoryImages={categoryImages}/>}
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


const Category = ({ category, index, categoryImages }) => {
    return (
        <View style={courseStyles.container}>
            <Image source={categoryImages[index]} style={courseStyles.image} />
            <Text style={[courseStyles.text, { color: "#000" }]}>{category.title}</Text>
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


import { ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View style={loaderStyles.container}>
      <View style={loaderStyles.loaderContainer}>
        <ActivityIndicator color="#000" />
      </View>
    </View>
  );
};
const loaderStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  loaderContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    elevation: 3
  }
});
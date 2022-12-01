import { View, Text, StyleSheet, Image, Pressable, Dimensions, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getServiceProviderList } from '../../../store';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const Home = ({ navigation }) => {
    const [screenWidth, setScreenWidth] = useState(null)
    const [serviceProviders, setServiceProviders] = useState([]);
    const dispatch = useDispatch();
    const { api, categories } = useSelector(state => state?.appointment);
   
    const categoryImages = [
        require("./assets/lungs.png"),
        require("./assets/heart.png"),
        require("./assets/bone.png"),
    ]

    useEffect(() => {
        const windowWidth = Dimensions.get('window').width;
        setScreenWidth(windowWidth);
    }, [])

    useEffect(() => {
        dispatch(getServiceProviderList())
            .then(unwrapResult).then((res) => {
                setServiceProviders(res);
                calculateRating(res)
            }).catch((error) => { console.log("Error: 1", error) })
    }, [])

    const calculateRating = (objArray) =>{
        var output = []
        const result = objArray.map(({ review_service_prov }) => review_service_prov)
        
    }
    


    return (
        <View style={styles.container}>
            {api.loading == 'pending' && <Loader></Loader>}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Image
                        // @ts-ignore
                        source={require("./assets/file.png")}
                        style={styles.message}
                    />
                    <Text style={styles.heading}>Home</Text>
                    <Image
                        // @ts-ignore
                        source={require("./assets/search.png")}
                        style={styles.search}
                    />
                </View>
                <FlatList
                    data={serviceProviders}
                    renderItem={({ item }) => <ExploreItem event={item} width={screenWidth} navigation={navigation} />}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />

                <View style={styles.headingContainer}>
                    <Text style={styles.title}>Category</Text>
                    <Text style={styles.subTitle}>View all</Text>
                </View>
                <FlatList
                    style={styles.courseList}
                    data={categories}
                    renderItem={({ item, index }) => <Category category={item} index={index} categoryImages={categoryImages}/>}
                    numColumns={3}
                    keyExtractor={item => item.id.toString()}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
            <View style={[styles.headingContainer, styles.topsec]}>
                <Text style={styles.title}>Top Rated Doctors</Text>
                <Text style={styles.subTitle}>View all</Text>
            </View>
            <ScrollView style={{ marginBottom: 65 }}>
                {
                    serviceProviders.map((item, index) =>
                        <Pressable style={styles.walletCard} key={index} onPress={() =>navigation.navigate('serviceProviderProfile', {item})}>
                            <View style={styles.walletInner}>
                                <View style={styles.imgContainer}>
                                    <Image source={{ uri:  item.image}} style={styles.image} />
                                </View>
                                <View style={styles.walletCarder}>
                                    <Text style={styles.eventName}>{item.name}</Text>
                                    <Text style={styles.eventType}>{item.category_name} </Text>
                                    <View style={styles.ratingContainer}>
                                        <Image source={require("./assets/rating.png")} style={styles.image} />
                                        <Text style={styles.attending}>({item?.review_service_prov?.length} reviews)</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )
                }
            </ScrollView>


            <View style={styles.footer}>
                <Footer
                    images={[
                        // @ts-ignore
                        require("./assets/home.png"),
                        // @ts-ignore
                        require("./assets/calender.png"),
                        // @ts-ignore
                        require("./assets/fsearch.png"),
                        // @ts-ignore
                        require("./assets/user.png")
                    ]}
                    routes={['home', 'schedule', 'search', 'clientProfile']}
                    navigation={navigation}
                />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: { paddingHorizontal: 10, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 15
    },
    back: { width: 11.25, height: 20, marginLeft: -15 },
    heading: { fontSize: 16, color: "#000", fontWeight: 'bold' },
    message: { width: 18, height: 12, resizeMode: "contain" },
    search: { width: 20, height: 15, resizeMode: "contain" },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    columnWrapper: {
        justifyContent: "space-around"
    },
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        marginVertical: 10
    },
    title: { fontSize: 16, fontWeight: 'bold', color: "#1E2022" },
    subTitle: {},
    courseList: { marginBottom: 20 },
    topsec: { marginHorizontal: 10, marginTop: 15, marginBottom: 10 },
    walletCard: {
        backgroundColor: "#fff",
        padding: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        borderRadius: 8,
        elevation: 15,
        shadowColor: "#ccc9c9",
        marginHorizontal: 15
    },
    walletInner: {
        display: "flex",
        flexDirection: "row"
    },
    walletCarder: {
        alignSelf: "center",
        display: "flex",
        flexDirection: "column"
    },
    eventName: {
        color: "#1E2022",
        fontSize: 14,
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: -5
    },
    eventType: {
        color: "#23AAFA",
        fontSize: 12,
        marginLeft: 10,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    attending: { color: "#ACAEAF", fontSize: 14, marginLeft: 10, fontWeight: 'bold' },
    imgContainer: {
        height: 75,
        width: 95,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dadada",
        borderRadius: 10
    },
    image: { resizeMode: "stretch", height: 10, width: 60, marginLeft: 10, marginRight: -5 },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    subTitle: { fontSize: 12, fontWeight: 'bold', color: "#1E2022" }
})


const Footer = props => {

    return (
        <View style={[footerStyles.footer]}>
            {props.images.map((image, index) => (
                <Pressable style={footerStyles.footerItem} key={index} onPress={() =>  props.navigation.reset({
                    index: 0,
                    routes: [{ name: props.routes[index] }]
                  })}>
                    <Image
                        style={footerStyles.footerImage}
                        source={image}
                    />
                </Pressable>
            ))}
        </View>
    );
};

const footerStyles = StyleSheet.create({
    footer: {
        height: 60,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    footerItem: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    footerImage: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    }
});


const ExploreItem = ({ event, width, navigation }) => {
    return (
        <View style={[exploreItemStyles.container, { width: width - 120 }]}>
            <Pressable onPress={() => { navigation.navigate('search') }}>
                <View style={exploreItemStyles.header}>
                    <View style={exploreItemStyles.heading}>
                        <Text style={exploreItemStyles.headingText}>{event.name}</Text>
                        <Text style={exploreItemStyles.text}>{event.category_name}</Text>
                    </View>
                </View>
            </Pressable>
            <View style={exploreItemStyles.detailsContainer}>
                <Image source={require("./assets/star.png")} style={exploreItemStyles.star} />
                <Text style={{ color: "#979797" }}>{event?.review_service_prov.length > 0 ? event?.review_service_prov[0]?.rating: '0.0'}</Text>
            </View>
        </View>
    );
};

const exploreItemStyles = StyleSheet.create({
    container: {
        width: 310,
        height: 220,
        marginHorizontal: 5,
        elevation: 1,
        marginVertical: 10,
        backgroundColor: "#f7eec4",
        overflow: "hidden",
        borderRadius: 10
    },
    image: {
        width: 20,
        height: 18,
        resizeMode: "contain",
    },
    imgContainer: {
        padding: 5, backgroundColor: "#fff", borderRadius: 25, alignItems: "center", shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight: 5,
        marginTop: -20
    },

    heading: {
        marginVertical: 10,
        paddingHorizontal: 10
    },
    headingText: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 5,
        color: "#000"
    },
    text: { color: "#77838F", fontWeight: 'bold' },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    detailsContainer: {
        position: 'absolute',
        bottom: 15,
        left: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    star: {
        width: 12,
        height: 12,
        resizeMode: "contain",
    }

});


const Category = ({ category, index, categoryImages }) => 
       index<3 &&
            <View style={courseStyles.container}>
                <Image source={categoryImages[index]} style={courseStyles.image} />
                <Text style={[courseStyles.text]}>{category.title}</Text>
            </View>

const courseStyles = StyleSheet.create({
    container: {
        marginBottom: 10,
        height: 90,
        width: 100,
        backgroundColor: "#FCF1D6",
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '4%'
    },
    image: { height: 27, width: 35, resizeMode: 'contain', alignSelf: 'flex-start', marginLeft: 10 },
    text: { color: "#23AAFA", textAlign: 'center', fontSize: 12 }

});


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
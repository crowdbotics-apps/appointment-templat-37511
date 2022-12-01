import { View, Text, StyleSheet, Image, Pressable, Dimensions, FlatList, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Search = ({ navigation }) => {
    const [providersList, setProvidersList] = useState([]);
    const { api, categories, service_providers_list } = useSelector(state => state?.appointment);

    useEffect(() => {
        setProvidersList(service_providers_list);
      }, [])

    const handleSearchStore = async (text) => {
        if (!text) {
          setProvidersList(service_providers_list)
        } else {
          const searchedVenders = service_providers_list.filter(element => element.name.toLowerCase().includes(text.toLowerCase()));
          setProvidersList(searchedVenders);
        }
      }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>

                <View style={styles.searchContainer}>
                    <Text style={styles.headText}>Search</Text>
                    <View style={styles.inputText}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                // value={searchText}
                                onChangeText={(text) => handleSearchStore(text)}
                                placeholder='Enter'
                                placeholderTextColor={"#000"}
                                style={{ paddingLeft: 10 }}
                            />
                        </View>
                        <Image source={require(
                            // @ts-ignore
                            "./assets/search.png")} style={styles.mr10} />
                    </View>
                </View>

                <View style={styles.headingContainer}>
                    <Text style={styles.title}>Category</Text>
                    <Text style={styles.subTitle}>View all</Text>
                </View>
                <FlatList
                    style={styles.courseList}
                    data={categories}
                    renderItem={({ item, index }) => <Category category={item} index={index}/>}
                    numColumns={3}
                    keyExtractor={item => item.id.toString()}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
            <View style={[styles.headingContainer, styles.topsec]}>
                <Text style={styles.title}>{service_providers_list.length} Doctors Found</Text>
                <Text></Text>
            </View>
            <ScrollView style={{ marginBottom: 65 }}>
                {
                    providersList.map((item, index) =>
                        <Pressable style={styles.walletCard} key={index} onPress={() =>navigation.navigate('serviceProviderProfile', {item})}>
                            <View style={styles.walletInner}>
                                <View style={styles.imgContainer}>
                                    <Image source={{ uri: item?.image }} style={styles.image} />
                                </View>
                                <View style={styles.walletCarder}>
                                    <Text style={styles.eventName}>{item?.name}</Text>
                                    <Text style={styles.eventType}>{item?.category_name} </Text>
                                    <View style={styles.ratingContainer}>
                                        <Image source={require("./assets/rating.png")} style={styles.image} />
                                        <Text style={styles.attending}>({item?.review_service_prov.length} reviews)</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.leftSection}>
                                <Pressable>
                                    <Text style={styles.date}>Book now</Text>
                                </Pressable>
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

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: { backgroundColor: "#fff" },

    footer: {
        position: 'absolute',
        flex: 0.1,
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
    courseList: { marginBottom: 20 },
    topsec: { marginTop: 20, marginBottom: 5 },
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
        marginHorizontal: 10
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
    searchContainer: { margin: 10 },
    headText: {
        marginLeft: 10,
        marginVertical: 10
    },
    inputText: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "#C4C4C4",
        backgroundColor: "#f7f7f7"
    },
    mr10: {
        marginRight: 10,
        height: 15,
        width: 15,
        resizeMode: "contain"
    },
    leftSection: { alignSelf: 'flex-start', marginTop: 7 },
    date: { fontSize: 12, color: "#1E2022", backgroundColor: "#12D790", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14, marginLeft: -5 },
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

const Category = ({ category, index }) => (
    index < 3 &&
    <View style={courseStyles.container}>
        <Image source={{ uri: category.image }} style={courseStyles.image} />
        <Text style={[courseStyles.text]}>{category.title}</Text>
    </View>
)

const courseStyles = StyleSheet.create({
    container: {
        marginBottom: 10,
        height: 100,
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
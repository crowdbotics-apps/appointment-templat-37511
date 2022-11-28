import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, ScrollView, Modal, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppointmentDetails from '../appointmentDetailsScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentList, getServiceProviderProfile } from '../../store';
import { unwrapResult } from '@reduxjs/toolkit';

const Profile = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const [modalVisible, setModalVisible] = useState(false);
    const { api } = useSelector((state) => state?.appointment)
    const dispatch = useDispatch();
    const [serviceProvider, setServiceProvider] = useState({});
    const [myAppointments, setMyAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState({});

    useEffect(() => {
        dispatch(getServiceProviderProfile())
            .then(unwrapResult).then((res) => {
                setServiceProvider(res[0]);
            }).catch((error) => {
                console.log("Error: ", error)
            })
    }, [])

    useEffect(() => {
        dispatch(getAppointmentList())
            .then(unwrapResult).then((res) => {
                setMyAppointments(res);
            }).catch((error) => {
                console.log("Error: ", error)
            })
    }, [])

    const data = [
        {
            id: 1,
            category: 'Electrocardiogram (ECG)',
            name: "Sara Smith",
            start_time: "09:00:00",
            image: require("./assets/heart.png")
        },
        {
            id: 2,
            category: 'Nuclear cardiac stress test',
            name: "Tara Thompson",
            start_time: "10:00:00",
            image: require("./assets/heart.png")
        },
        {
            id: 3,
            category: 'Magnetic resonance imaging',
            name: "Loyd Smith",
            start_time: "11:00:00",
            image: require("./assets/beat.png")
        }
    ];

const handleAppointmentDetails = (appointment) =>{
    setSelectedAppointment(appointment)
    setModalVisible(true)
}
    return (
        <View style={styles.container}>
            {api.loading == 'pending' && <Loader></Loader>}
            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.walletCard}>
                        <View style={styles.walletInner}>
                            <View style={styles.imgContainer}>
                                <Image source={{ uri: serviceProvider?.image }} style={styles.image} />
                            </View>
                            <View style={styles.walletCarder}>
                                <Text style={styles.eventName}>{serviceProvider?.name}</Text>
                                <Text style={styles.experience}>Working Time</Text>
                                <Text style={styles.eventType}>{serviceProvider?.available_days ? `${serviceProvider?.available_days[0]} - ${serviceProvider?.available_days[1]}` : ""} ( {serviceProvider?.opening_time}AM - {serviceProvider?.closing_time}PM)</Text>
                            </View>
                        </View>
                        <View style={styles.leftSection}>
                            <Image source={require('./assets/phone.png')} style={styles.phone} />
                            <Image source={require('./assets/message.png')} style={styles.phone} />
                        </View>
                    </View>
                    <View style={styles.scheduledContainer}>
                        <Text style={styles.dateTitle}>Schedule/Available time</Text>
                        <Pressable onPress={() =>navigation.navigate("myCalenderScreen")}>
                        <Text style={styles.subTitle}>View now</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.headingContainer}>
                    <TabView tabTitles={["Appointments", "Biography"]} selected={0} />
                    <Pressable onPress={() =>navigation.navigate("doctorNotificationsScreen")}>
                    <Image source={require(
                        // @ts-ignore
                        "./assets/notification.png")} style={styles.notification} />
                    </Pressable>
                   
                </View>

                {
                    myAppointments.map((item, index) =>
                        <View style={styles.mainCard} key={index}>
                            <View style={styles.walletCard}>
                                <View style={styles.walletInner}>
                                    <View style={styles.imgContainer2}>
                                        <Image
                                            source={require("./assets/beat.png")}
                                            style={styles.image}
                                        />
                                    </View>
                                    <View style={styles.walletCarder}>
                                        <Text style={styles.date}>{item?.servicer_detail?.category_name}</Text>
                                        <Text style={styles.eventName}>{item?.name} {item?.start_time.substr(0, 5)} am</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.buttonBottom}>
                                <Button buttonText={"ACCEPTED"} backgroundColor={"#23AAFA"} />
                                <Button buttonText={"DETAILS"} backgroundColor={"#FFF"} color={"#23AAFA"} borderColor={"#23AAFA"} borderWidth={1} onPress={() => handleAppointmentDetails(item)} />
                            </View>

                        </View>
                    )
                }
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[styles.centeredView, { width: windowWidth }]}>
                    <AppointmentDetails selectedAppointment={selectedAppointment} setModalVisible={setModalVisible} />
                </View>
            </Modal>
        </View >
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    headerContainer: { backgroundColor: '#fff' },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
        paddingLeft: 10,
        marginVertical: 15
    },
    title: { fontSize: 20, fontWeight: 'bold', color: '#1E2022' },

    walletCard: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 8
    },
    walletInner: {
        display: 'flex',
        flexDirection: 'row'
    },
    walletCarder: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    eventName: {
        color: '#000',
        fontSize: 14,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    eventType: {
        color: '#7C7C7C',
        fontSize: 12,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    experience: {
        color: '#354259',
        fontSize: 12,
        marginVertical: 5,
        marginLeft: 10,
        fontWeight: 'bold',

    },
    attending: { color: '#ACAEAF', fontSize: 14, marginLeft: 10, fontWeight: 'bold' },
    imgContainer: {
        height: 80,
        width: 95,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dadada',
        borderRadius: 10
    },
    imgContainer2: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 10
    },
    image: { resizeMode: 'contain', height: 22, width: 24, },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    leftSection: {
        marginTop: 10,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '17%'
    },

    subTitle: {
        fontSize: 14,
        color: '#fff',
        backgroundColor: '#23AAFA',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 14
    },
    phone: { height: 20, width: 20, resizeMode: 'contain' },
    scheduledContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, marginBottom: 25, paddingRight: 10 },
    dateTitle: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold'
    },
    time: {
        fontSize: 14,
        color: '#7C7C7C',
        fontWeight: 'bold'
    },
    notification: {
        height: 20, width: 20, resizeMode: 'contain'
    },
    mainCard: {
        elevation: 15,
        shadowColor: "#ccc9c9",
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginTop: 5,
        borderRadius: 12,
        marginBottom: 5
    },
    view: { fontSize: 30, color: "#000", fontWeight: "bold" },
    info: { marginHorizontal: 15, marginVertical: 5 },
    infoTitle: {},
    infoText: { fontSize: 12, color: "#7E7D7D" },
    rating: { color: "#000" },
    date: {
        fontSize: 14,
        marginLeft: 10,
        color: "#7E7D7D",
        marginBottom: 7
    },
    buttonBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        marginHorizontal: 10,
        borderTopColor: "#F2F2F2",
        borderTopWidth: 1
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: "100%"
    },
});



const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} underlayColor="#DDDDDD">
            <View
                style={[
                    btnStyles.button,
                    {
                        backgroundColor: props.backgroundColor ? props.backgroundColor : '#000000',
                        height: props.height ? props.height : 38,
                        borderWidth: props.borderWidth ? props.borderWidth : 0,
                        borderColor: props.borderColor ? props.borderColor : '#000000'
                    }
                ]}
            >
                <Text style={[btnStyles.text, { color: props.color ? props.color : '#ffffff' }]}>
                    {props.buttonText}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const btnStyles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 21,
        paddingHorizontal: "13%"

    },
    text: {
        fontWeight: 'bold',
        fontSize: 15
    }
});

const TabView = ({ tabTitles, selected }) => {
    return (
        <View style={tabViewStyles.paletteContainer}>
            {tabTitles.map((title, index) => (
                <View
                    style={
                        index === selected
                            ? tabViewStyles.selected
                            : tabViewStyles.unSelected
                    }
                    key={index}
                >
                    <Text style={{ color: index === selected ? "#000" : "#7C7C7C", fontSize: 12 }}>{title}</Text>
                </View>
            ))}
        </View>
    );
};

const tabViewStyles = StyleSheet.create({
    paletteContainer: {
        width: "70%",
        height: 48,
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 6,
        marginVertical: 10,
        marginHorizontal: 20
    },
    selected: {
        borderRadius: 10,
        flex: 1,
        backgroundColor: "#23AAFA",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "gray",
        elevation: 10,
    },
    unSelected: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10
    }
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
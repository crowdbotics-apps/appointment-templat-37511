import { View, Text, StyleSheet, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'

const AppointmentDetails = ({ setModalVisible }) => {
    const [profile, setProfile] = useState({
        age: "25",
        gender: "Male",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, faucibus aliquet hac proin in. Turpis iaculis nulla ultrices tincidunt. Velit leo facilisi feugiat eleifend. Viverra id pharetra quam egestas orci. Metus, ipsum libero, tempor, vel posuere. Aliquet lacus at sit nisl."
    })

    return (
        <View style={styles.modalView}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headingContainer}>
                    <Text style={styles.title}>Patient name</Text>
                    <Pressable onPress={() => setModalVisible(false)}>
                        <Image source={require(
                            // @ts-ignore
                            "./assets/close.png")} style={styles.image} />
                    </Pressable>
                </View>

                <View style={[styles.mainContainer]}>
                    <View style={[styles.docContainer]}>
                        <Text style={styles.descr}>Nuclear cardiac stress test</Text>
                        <Text style={styles.titleText}>Tara Tomphson</Text>
                    </View>
                    <View style={styles.inner}>
                        <Image source={require("./assets/phone.png")} style={[styles.check, { marginRight: 10 }]} />
                        <Image source={require("./assets/message.png")} style={styles.check} />
                    </View>
                </View>
                <Text style={[styles.title, { marginTop: 15 }]}>Date/time</Text>
                <View style={styles.topWrapper}>
                    <View style={styles.topContainer}>
                        <Image />
                        <Text style={styles.dateText}>June 2022</Text>
                        <Image />
                    </View>
                    <View style={[styles.inner, { marginVertical: 20 }]}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.month}>Mon</Text>
                            <Text>20</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.month}>Mon</Text>
                            <Text>20</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.month}>Mon</Text>
                            <Text>20</Text>
                        </View>
                        <View style={[styles.dateContainer, { backgroundColor: "#12D790" }]}>
                            <Text style={[styles.month, styles.color]}>Mon</Text>
                            <Text style={styles.color}>20</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.month}>Mon</Text>
                            <Text>20</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.month}>Mon</Text>
                            <Text>20</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.month}>Mon</Text>
                            <Text>20</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.inner, { marginVertical: 10 }]}>
                    <Text style={styles.text}>09:00 am</Text>
                    <Text style={styles.text}>10:00 am</Text>
                </View>

                <View style={styles.cardInfo}>
                    <Text style={styles.subHeading}>Profile details</Text>
                    <View style={styles.feeContainer}>
                        <View>
                            <Text style={[styles.mr10]}>Age</Text>
                            <View style={styles.feeSection}>
                                <TextInput placeholder={profile.age} placeholderTextColor={"#000"} editable={false} />
                            </View>
                        </View>
                        <View>
                            <Text style={[styles.mr10]}>Gender</Text>
                            <View style={styles.feeSection}>
                                <TextInput placeholder={profile.gender} placeholderTextColor={"#000"} editable={false} />
                            </View>
                        </View>
                    </View>
                    <Text style={styles.mr10}>Notes</Text>
                    <View style={styles.textInput}>
                        <Text style={styles.notes}>{profile.notes}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default AppointmentDetails;

const styles = StyleSheet.create({
    modalView: {
        height: "95%", width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        position: "absolute",
        bottom: 0
    },
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },
    title: { fontSize: 16, fontWeight: 'bold', color: "#1E2022" },
    image: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    docContainer: {},
    mainContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center", backgroundColor: "#FCF0EF", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10
    },
    check: {
        height: 19, width: 19, resizeMode: 'contain',
    },
    inner: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleText: {
        fontWeight: 'bold',
        color: "#2D2D2D",
        marginBottom: 5
    },
    descr: {
        marginBottom: 5,
        fontSize: 12,
        color: "#828586",
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    dateText: {
        fontSize: 14,
        color: "#2D2D2D",
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
    dateContainer: {
        backgroundColor: "#F4F8FA",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 10,
    },
    month: {
        marginBottom: 5,
        fontSize: 12,
        color: "#828586"
    },
    topWrapper: { backgroundColor: "#fff", paddingHorizontal: 5, width: "100%" },
    color: { color: "#fff" },
    cardInfo: {
        backgroundColor: "#fff",
        marginBottom: 60
    },
    subHeading: { fontSize: 16, fontWeight: 'bold', marginLeft: 10, marginTop: 10, marginBottom: 20, color: "#2D2D2D" },
    mr10: {
        marginLeft: 15,
        marginBottom: 10
    },
    InputBox: { paddingHorizontal: 10, borderColor: "#C4C4C4", borderWidth: 1, marginHorizontal: 10, borderRadius: 10, marginBottom: 10, backgroundColor: "#f7f7f7" },
    textInput: { borderWidth: 1, borderRadius: 10, borderColor: "#C4C4C4", paddingHorizontal: 5, height: 140, backgroundColor: "#f7f7f7" },
    feeContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    feeSection: {
        justifyContent: "center",
        alignItems: "flex-start",
        height: 49,
        borderColor: "#C4C4C4",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: "33%",
        backgroundColor: "#f7f7f7"
    },
    text: { fontSize: 16, color: "#fff", backgroundColor: "#12D790", paddingHorizontal: '13%', paddingVertical: '3%', borderRadius: 5 },
    notes: { color: "#7C7C7C", padding: 10 }
})

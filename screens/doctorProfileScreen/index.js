import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

const DoctorProfile = ({ navigation, route }) => {
    const [serviceProvider, setServiceProvider] = useState({});

useEffect(() => {
    if (route?.params.item) {
        const { item } = route.params;
        setServiceProvider(item);
      }
  
}, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.walletCard}>
                        <View style={styles.walletInner}>
                            <View style={styles.imgContainer}>
                                <Image source={{ uri: serviceProvider?.image }} style={styles.image} />
                            </View>
                            <View style={styles.walletCarder}>
                                <Text style={styles.eventName}>{serviceProvider?.name}</Text>
                                <Text style={styles.eventType}>{serviceProvider?.category_name} </Text>
                                <Text style={styles.experience}>{serviceProvider?.experience}+ Years Experience </Text>
                                <View style={styles.ratingContainer}>
                                    <Image source={require('./assets/rating.png')} style={styles.image} />
                                    <Text style={styles.attending}>({serviceProvider?.reviews?.length} reviews)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.leftSection}>
                            <Image source={require('./assets/phone.png')} style={styles.phone} />
                            <Image source={require('./assets/message.png')} style={styles.phone} />
                            <Image source={require('./assets/heart.png')} style={styles.phone} />
                        </View>
                    </View>
                    <View style={styles.scheduledContainer}>
                        <Text style={styles.dateTitle}>Working Time</Text>
                        <Text style={styles.time}>{serviceProvider?.available_days ? `${serviceProvider?.available_days[0]} - ${serviceProvider?.available_days[1]}` : ""} ( {serviceProvider?.opening_time}AM - {serviceProvider?.closing_time}PM)</Text>
                    </View>
                </View>
                <View style={styles.headingContainer}>
                    <Text style={styles.title}>Schedule</Text>
                    <Text style={styles.subTitle}>View now</Text>
                </View>

                <View style={styles.descriptionWrapper}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>Biography:</Text>
                        <Text style={styles.descriptionText}>
                            {serviceProvider?.biography}
                        </Text>
                    </View>

                    <View style={styles.headingContainer}>
                        <Text style={styles.locText}>Location:</Text>
                        <Image source={require('./assets/loc.png')} style={styles.loc} />
                    </View>
                    <Image source={require('./assets/map.png')} style={styles.map} />
                </View>
                <View style={styles.buttonBottom}>
                    <Button
                        onPress={() => navigation.navigate('appointmentScreen')}
                        buttonText="Book Appointment"
                        backgroundColor={'#12D790'}
                    />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Footer
                    images={[
                        // @ts-ignore
                        require('./assets/home.png'),
                        // @ts-ignore
                        require('./assets/calender.png'),
                        // @ts-ignore
                        require('./assets/fsearch.png'),
                        // @ts-ignore
                        require('./assets/user.png')
                    ]}
                    routes={['homeScreen', 'orderStatusScreen', 'searchScreen', 'accountScreen']}
                    navigation={navigation}
                />
            </View>
        </View>
    );
};

export default DoctorProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: { paddingHorizontal: 0, backgroundColor: '#fff' },

    footer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: 0
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 15
    },
    title: { fontSize: 20, fontWeight: 'bold', color: '#1E2022' },

    walletCard: {
        backgroundColor: '#fff',
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
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
        color: '#1E2022',
        fontSize: 14,
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: -5
    },
    eventType: {
        color: '#23AAFA',
        fontSize: 12,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    experience: {
        color: '#354259',
        fontSize: 12,
        marginLeft: 10,
        fontWeight: 'bold',
        marginBottom: 10
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
    image: { resizeMode: 'stretch', height: 10, width: 60, marginLeft: 10, marginRight: -5 },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    leftSection: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '27%'
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
    scheduledContainer: { paddingLeft: 15, marginBottom: 25 },
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
    descriptionContainer: { paddingHorizontal: 15, paddingTop: 10 },
    descriptionWrapper: { backgroundColor: '#fff', paddingBottom: 45 },
    descriptionTitle: { fontWeight: 'bold', color: '#000', fontSize: 15 },
    descriptionText: { fontWeight: 'bold', color: '#7C7C7C', fontSize: 15, textAlign: 'justify', marginTop: 2 },
    bottomText: { fontWeight: 'bold', color: '#7C7C7C', fontSize: 15, textAlign: 'justify', marginTop: 10 },
    locText: { fontSize: 15, color: '#000', fontWeight: 'bold' },
    loc: { height: 20, width: 20, resizeMode: 'contain' },
    map: { height: 149, width: '95%', resizeMode: 'contain', alignSelf: 'center' },
    buttonBottom: {
        marginTop: 30,
        marginBottom: 80,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const Footer = (props) => {
    return (
        <View style={[footerStyles.footer]}>
            {props.images.map((image, index) => (
                <Pressable
                    style={footerStyles.footerItem}
                    key={index}
                    onPress={() => props.navigation.navigate(props.routes[index])}
                >
                    <Image style={footerStyles.footerImage} source={image} />
                </Pressable>
            ))}
        </View>
    );
};

const footerStyles = StyleSheet.create({
    footer: {
        height: 60,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40
    },
    footerItem: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    footerItemText: {
        fontSize: 13,
        color: '#fff',
        marginTop: 5
    },
    footerImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
});

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} underlayColor="#DDDDDD">
            <View
                style={[
                    btnStyles.button,
                    {
                        backgroundColor: props.backgroundColor ? props.backgroundColor : '#000000',
                        height: props.height ? props.height : 49,
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
        borderRadius: 10,
        width: 307
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15
    }
});

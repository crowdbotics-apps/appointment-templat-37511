import React, { useEffect, useState } from "react";
import {
  Text, StyleSheet, View, Image, ScrollView, Pressable
} from "react-native";

const Messages = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        id: 1,
        title: "Sara Smith",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac integer vulputate ac adipiscing in non vitae.",
        time: "10:00AM",
        // @ts-ignore
        image: require("./assets/profile1.png")

      },
      {
        id: 2,
        title: "Esther Howard",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel, auctor non pellentesque id vestibulum. ",
        time: "11:00AM",
        // @ts-ignore
        image: require("./assets/profile2.png")
      },
      {
        id: 3,
        title: "Brooklyn Simmons",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat at est in elit cum netus sapien id arcu.",
        time: "12:00PM",
        // @ts-ignore
        image: require("./assets/profile3.png")
      }

    ])
  }, [])


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          // @ts-ignore
          source={require("./assets/back.png")}
          style={styles.back}
        />
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Patients message</Text>
          <Image source={require(
            // @ts-ignore
            "./assets/message.png")} style={styles.notification} />
        </View>

        <Text style={styles.heading}>Today Jun 23:</Text>
        {
          messages.map((notification, index) =>
            <View style={styles.listContainer} key={index}>
              <Text style={styles.timeText}>{notification.time}</Text>
              <View style={styles.walletCard}>
                <Image source={notification.image} style={styles.image} />
                <View style={styles.walletCarder}>
                  <Text style={styles.eventName}>{notification.title}</Text>
                  <Text style={styles.eventType}>{notification.description}</Text>
                </View>
              </View>
            </View>
          )
        }
        <View style={styles.prevContainer}>
          <Text style={[styles.heading]}>Yesterday Jun 22:</Text>
          {
            messages.map((notification, index) =>
              index < 2 &&
              <View style={[styles.listContainer]} key={index}>
                <Text style={styles.timeText}>{notification.time}</Text>
                <View style={styles.walletCard}>
                  <Image source={notification.image} style={styles.image} />
                  <View style={styles.walletCarder}>
                    <Text style={styles.eventName}>{notification.title}</Text>
                    <Text style={styles.eventType}>{notification.description}</Text>
                  </View>
                </View>
              </View>
            )
          }
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  listContainer: {
    backgroundColor: "#F6F9FE",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10
  },
  walletCard: {
    marginRight: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  eventName: {
    fontSize: 15,
    marginLeft: 15,
    fontWeight: "bold",
    color: "#354259"
  },
  eventType: {
    color: "#A5BECC",
    fontSize: 12,
    marginLeft: 15,
    maxWidth: 280,
    marginVertical: 5,
    fontWeight: "bold"
  },

  timeText: {
    fontSize: 12,
    color: "#000",
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: -5,
    zIndex: 99,
    fontWeight: "bold"
  },
  image: {
    height: 56,
    width: 56,
    resizeMode: "contain"
  },
  notification: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  back: { height: 18, width: 18, resizeMode: "contain", marginTop: 20, marginBottom: 10 },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    marginVertical: 15
  },
  title: { fontSize: 16, fontWeight: 'bold', color: "#1E2022" },
  subTitle: { fontSize: 12, fontWeight: 'bold', color: "#1E2022" },
  heading: { fontSize: 15, fontWeight: 'bold', color: "#354259", marginVertical: 5 },
  prevContainer: {
    marginTop: 10,
    paddingBottom: 70
  }
});

export default Messages;

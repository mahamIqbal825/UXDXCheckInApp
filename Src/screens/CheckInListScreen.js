import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import database from "@react-native-firebase/database";
import CheckInHeader from "../components/CheckInHeader";
import Theme from "../utils/Theme";
import CheckInSelection from "../components/CheckInSelection";
import CheckInList from "../components/CheckInList";
import Loading from "../components/Loading";
import { CameraScreen } from "react-native-camera-kit";
import ErrorLoading from "../components/ErrorLoading";

var Sound = require("react-native-sound");
function MainScreen(props) {
  const [selected, setSelected] = useState("all");
  // const [ticket, setTicket] = useState([]);
  // const [checkInTicket, setCheckInTicket] = useState([]);
  // const [notCheckInTicket, setNotCheckInTicket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkInListTickets, setCheckInListTickets] = useState([]);
  const [checkedInListTickets, setCheckedInListTickets] = useState([]);
  const [isScanned, setIsScanned] = useState(false);
  const [openQRScanner, setOpenQRScanner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [error, setError] = useState("");
  const [filteredScans, setFilteredScans] = useState([]);
  const [filteredCheckScans, setFilteredCheckScans] = useState([]);
  const [filteredNonCheckScans, setFilteredNonCheckScans] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [visible, setVisible] = useState(false);
  // let results = [];
  // let docData = [];
  useEffect(() => {
    Sound.setCategory("Playback");
    getTicketsForCheckInList(props.route.params?.allData);
  }, [props]);

  useEffect(() => {
    checkedInListTickets.forEach((checkInRecord) => {
      checkInListTickets.forEach((ticket) => {
        if (checkInRecord.ticketRef == ticket.ticketRef) {
          ticket.isCheckedIn = checkInRecord.isCheckedIn;
        }
      });
    });
    setCheckInListTickets(checkInListTickets)
  }, [checkedInListTickets])

  useEffect(() => {
    filterData()
  }, [checkInListTickets])

  useEffect(() => {
    filterData()
  }, [filterValue])

  const filterData = () => {
    const lowerCaseFilter = filterValue.toLowerCase();
    if (!filterValue || filterValue == "") {
      setFilteredScans(checkInListTickets);
      setFilteredCheckScans(checkInListTickets.filter((ticket) => ticket.isCheckedIn));
      setFilteredNonCheckScans(checkInListTickets.filter((ticket) => !ticket.isCheckedIn));
    }

    setFilteredScans(
      checkInListTickets?.filter((ticket) => {
        return (
          ticket.company?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.email?.toLowerCase().includes(lowerCaseFilter) ||
          ticket.firstName?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.lastName?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.ticketId?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.ticketRef?.toLowerCase()?.includes(lowerCaseFilter)
        );
      })
    );
    setFilteredCheckScans(
      checkInListTickets?.filter((ticket) => {
        return (
          ticket.isCheckedIn && (
          ticket.company?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.email?.toLowerCase().includes(lowerCaseFilter) ||
          ticket.firstName?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.lastName?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.ticketId?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.ticketRef?.toLowerCase()?.includes(lowerCaseFilter) 
          )
        );
      })
    );
    setFilteredNonCheckScans(
      checkInListTickets?.filter((ticket) => {
        return (
          !ticket.isCheckedIn && (
          ticket.company?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.email?.toLowerCase().includes(lowerCaseFilter) ||
          ticket.firstName?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.lastName?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.ticketId?.toLowerCase()?.includes(lowerCaseFilter) ||
          ticket.ticketRef?.toLowerCase()?.includes(lowerCaseFilter)
          )
        );
      })
    );
  };
  const getTicketsForCheckInList = async (list) => {
    const results = []
    setLoading(true);
    const ticketsQuery = await firestore()
      .collection("tickets")
      .where("ticketType", "in", list[list.listId].includeConditions)
      .where("productId", "==", list[list.listId].conferenceId)
      .get();
    const tickets = [];

    ticketsQuery.forEach((doc) => {
      tickets.push(doc.data());
    });
    const userIds = [];
    for (const ticket of tickets) {
      if (ticket.uid && userIds.indexOf(ticket.uid) === -1) {
        userIds.push(ticket.uid);
      }
    }

    const users = await Promise.all(
      userIds.map(async (uid) => {
        let user = null;
        const userProfile = await database()
          .ref(`/users/${uid}`)
          .once("value")
          .then((snapshot) => {
            user = snapshot.val();
          });

        return user;
      })
    );
    for (const ticket of tickets) {
      let user;
      if (ticket.uid) {
        user = users.map((user) => {
          user.uid === ticket.uid;
        })[0];
      }
      const ticketInfo = {
        userId: ticket.uid,
        ticketId: ticket.ticketId,
        ticketType: ticket.ticketType,
        ticketRef: ticket.ticketRef,
        firstName: user?.firstName
          ? user?.firstName
          : ticket?.firstName
          ? ticket?.firstName
          : "Not Available",
        lastName: user?.lastName
          ? user?.lastName
          : ticket?.lastName
          ? ticket?.lastName
          : "Not Available",
        jobTitle: user?.jobTitle
          ? user?.jobTitle
          : ticket?.jobTitle
          ? ticket?.jobTitle
          : "Not Available",
        company: user?.company
          ? user?.company
          : ticket?.company
          ? ticket?.company
          : "Not Available",

        email: ticket.email,
        qrcode: ticket.qrcode,
      };
      results.push(ticketInfo);
    }
    setCheckInListTickets(results)

    observeCheckInList(
      props.route.params.allData.conferenceId,
      props.route.params.allData.listId
    );
    return results;
  };
  const observeCheckInList = (productId, listId) => {
    firestore()
      .collection(
        "checkInLists/conferences/" +
          productId +
          "/" +
          listId +
          "/ticketCheckIns"
      )
      .onSnapshot((querySnapshot) => {
        const tickets = querySnapshot.docs.map((doc) => {
          // console.log('called', doc.data())
          // acc[doc.id] = {...doc.data()};
          // docData.push(doc.data());

          return doc.data();
        });
        setCheckedInListTickets(tickets);
        setLoading(false);
      });
    // console.log('results adsadafasdfs', results[0]);
  };
  const handleCheckInTicket = async (ticketRef, userId, checkIn) => {
    setLoading(true);
    if (!props.route.params.allData.listId) {
      return;
    }
    const ticketCheckInRecord = checkedInListTickets[ticketRef];
    const history = ticketCheckInRecord?.history || [];

    if (ticketCheckInRecord) {
      history.push({
        timestamp: ticketCheckInRecord.timestamp,
        adminUid: ticketCheckInRecord.adminUid,
        isCheckedIn: ticketCheckInRecord.isCheckedIn,
      });
    }
    let updatedTicket = {};
    checkInListTickets.map((item) => {
      if (item.ticketRef == ticketRef) {
        item.isCheckedIn = checkIn
        updatedTicket = {
          history,
          ticketRef: ticketRef,
          adminUid: userId,
          isCheckedIn: checkIn,
          timestamp: Date.now(),
          first_name: item.firstName,
          last_name: item.lastName || "",
          job_title: item.jobTitle || "",
          company_name: item.company || "",
          status: "not printed",
          qrcode: item.qrcode,
        };
      }
    });
    setCheckInListTickets(checkInListTickets)

    firestore()
      .collection(
        "checkInLists/conferences/" +
          props.route.params.allData.conferenceId +
          "/" +
          props.route.params.allData.listId +
          "/ticketCheckIns"
      )
      .doc(ticketRef)
      .set(updatedTicket)
      // .then(() => getTicketsForCheckInList(props.route.params?.allData));
  };
  const playSound = (messageType, data) => {
    var whoosh = new Sound(`${messageType}.mp3`, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("sound is playe loading", error);
        return;
      }
      whoosh.play((success) => {
        if (success) {
        } else {
          console.log("error");
        }
      });
    });
  };
  const OnScan = (event) => {
    // console.log('event', event);
    if (!isScanned) {
      setIsScanned(true);
      try {
        const ticketRef = JSON.parse(
          event.nativeEvent.codeStringValue
        ).ticketRef;
        const userId = JSON.parse(event.nativeEvent.codeStringValue).userId;

        if (ticketRef) {
          playSound("success");
          setOpenQRScanner(false);
          setIsScanned(false);
          handleScannedData(ticketRef, userId);
        }
      } catch (error) {
        playSound("negative");
        setFailure(true);
        setError("Invalid QR Code.");
      }
    }
  };
  const handleScannedData = async (ticketRef, uid) => {
    let userTicket = null;
    if (!ticketRef || !uid) {
      alert("This Ticket Is not valid");
    }
    if (ticketRef) {
      checkInListTickets.map((item) => {
        if (item.ticketRef === ticketRef) {
          userTicket = item;
        }
      });
      if (!userTicket) {
        alert("This ticket is not on this list!");
      } else {
        checkedInListTickets.map((item) => {
          if (item.ticketRef == userTicket.ticketRef) {
            if (item.isCheckedIn) {
              alert("Ticket is already scanned!");
            }
          }
        });
        handleCheckInTicket(userTicket.ticketRef, userTicket, true);
      }
    }
  };
  const cross = () => {
    setFailure(false);
    setIsScanned(false);
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      {openQRScanner ? (
        <View style={{ flex: 1 }}>
          <CameraScreen
            // Barcode props
            onBottomButtonPressed={() => {
              setIsScanned(false);
              setOpenQRScanner(false);
            }}
            actions={{
              leftButtonText: "Close",
            }}
            flashMode="on"
            torchMode="on"
            hideControls={false}
            torchOnImage={require("../assets/images/flash.png")}
            torchOffImage={require("../assets/images/no-flash.png")}
            torchImageStyle={styles.torchImage}
            scanBarcode={true}
            onReadCode={(event) => {
              OnScan(event);
            }}
            showFrame={true}
            laserColor="red"
            frameColor="green"
          />
          <Loading
            isVisible={modalVisible}
            loading={loading}
            success={success}
          />
          <ErrorLoading
            error={error}
            isVisible={failure}
            onPress={() => cross()}
          />
        </View>
      ) : (
        <>
          <CheckInHeader
            text={props.route.params.allData?.conferenceId}
            onPressB={() => props.navigation.goBack()}
            onPress={() => setVisible(true)}
          />
          {visible ? (
            <View className="h-[40] w-[300] bg-slate-300 mt-3 rounded-lg justify-center self-center">
              <TextInput
                placeholder="Search here"
                // className="h-9 w-fill text-lg p-2, mb-1"
                style={styles.input}
                onChangeText={(val) => {
                  setFilterValue(val);
                }}
              />
            </View>
          ) : null}
          <CheckInSelection
            allPress={() => setSelected("all")}
            notCheckPress={() => setSelected("notCheck")}
            checkPress={() => setSelected("checked")}
            allBG={selected == "all" ? Theme.borderColor : "transparent"}
            notBG={selected == "notCheck" ? Theme.borderColor : "transparent"}
            checkBG={selected == "checked" ? Theme.borderColor : "transparent"}
            colorAll={selected == "all" ? "white" : Theme.greyColor}
            colorCheck={selected == "checked" ? "white" : Theme.greyColor}
            colorNot={selected == "notCheck" ? "white" : Theme.greyColor}
          />
          <Loading isVisible={loading} loading={loading} />
          {selected == "all" ? (
            <FlatList
              data={filteredScans}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <CheckInList
                  key={item.ticketRef}
                  name={item.firstName}
                  email={item.email}
                  attendee={"Attendee: " + item.ticketType}
                  id={item.ticketRef}
                  isCheckIn={item.isCheckedIn}
                  checkInPress={() => {
                    handleCheckInTicket(item.ticketRef, item.userId, !item.isCheckedIn)
                  }
                  }
                />
              )}
            />
          ) : null}
          {selected == "checked" ? (
            <FlatList
              data={filteredCheckScans}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <CheckInList
                  key={item.ticketRef}
                  name={item.firstName}
                  email={item.email}
                  attendee={"Attendee: " + item.ticketType}
                  id={item.ticketRef}
                  isCheckIn={item.isCheckedIn}
                  checkInPress={() =>
                    handleCheckInTicket(item.ticketRef, item.userId, !item.isCheckedIn)
                  }
                />
              )}
            />
          ) : null}
          {selected == "notCheck" ? (
            <FlatList
              data={filteredNonCheckScans}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <CheckInList
                  key={item.ticketRef}
                  name={item.firstName}
                  email={item.email}
                  attendee={"Attendee: " + item.ticketType}
                  id={item.ticketRef}
                  isCheckIn={item.isCheckedIn}
                  checkInPress={() =>
                    handleCheckInTicket(item.ticketRef, item.userId, !item.isCheckedIn)
                  }
                />
              )}
            />
          ) : null}
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => setOpenQRScanner(true)}
          >
            <Text style={styles.qrButton}>Scan QR</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

export default MainScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomButton: {
    height: 58,
    backgroundColor: Theme.primaryColor,
    width: Theme.dw,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  qrButton: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  input: {
    fontSize: 14,
    height: 40,
    width: "100%",
    padding: 5,
    marginLeft: Theme.hp(1),
  },
});

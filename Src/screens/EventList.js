import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import ConnectionHeader from "../components/ConnectionHeader";
import NoScan from "../components/NoScan";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Loading from "../components/Loading";
import Theme from "../utils/Theme";
import Modal from "react-native-modal";
import LogoutModal from "../components/LogoutModal";

function EventList({ navigation }) {
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState({});
  let pstpost = [];
  const toggle = () => {
    setSearch(!search);
  };
  const currentUser = auth().currentUser;

  useEffect(() => {
    getCheckInLists(currentUser.uid);
  }, []);
  useEffect(() => {
    filterData();
  }, [filterValue]);
  const getCheckInLists = async (uid) => {
    let acc = [];
    try {
      const checkInListsQuery = await firestore()
        .collection("checkInLists/admins/" + uid)
        .get();
      // console.log("checkInListsQuery.docs", checkInListsQuery.docs);
      const checkInLists = checkInListsQuery.docs.map((doc) => {
        const data = doc.data();
        // console.log("list id", data.listId);
        // listId = data.listId;
        // setData(data)
        acc.push(data);
        return acc;
      });

    } catch (error) {
      console.log("error", error);
    }
    const hydratedCheckInLists = await Promise.all(
      acc.map(async (checkInList) => {
        // console.log("checkInList.conferenceId", checkInList.conferenceId);
        let listDetailsData = {}
        try {
          const listDetails = await firestore()
            .collection("checkInLists/conferences/" + checkInList.conferenceId)
            .doc(checkInList.listId)
            .get();
          listDetailsData = listDetails.data();
        } catch (error) {
          console.log("error", error);
        }
        // console.log("listDetailsData", listDetailsData);
        // console.log(
        //   'listDatezzz',
        //   listDetailsData.checkInList.listId.startDate,
        // );
        // console.log(
        //   "listDetailsData[checkInList.listId].startDate",
        //   listDetailsData[checkInList.listId].startDate
        // );
        // listId = checkInList.listId;

        return {
          ...listDetailsData,
          startDate: listDetailsData[checkInList.listId].startDate,
          listId: checkInList.listId,
          //startDate: new Date(), For testing Future
        };
      })
    );
    setAllData(hydratedCheckInLists);
    // console.log("allData", allData);

    // console.log("hydratedCheckInLists", hydratedCheckInLists);
    let upCommingEvents = [];
    let pastEvents = [];
    let pastConferenceIds = [];
    let upCommingConferenceIds = [];
    let myDate = new Date();
    let todayDate = new Date(
      Date.UTC(myDate.getFullYear(), myDate.getMonth(), myDate.getDate())
    );
    // console.log("todayDate zzzzzzzzzzzzzzzz", todayDate);
    hydratedCheckInLists.forEach((element) => {
      // console.log("elements ", element);
      element.conferenceId = element[element.listId].conferenceId;
      if (element.startDate >= todayDate) {
        upCommingEvents.push(element);
        let index = upCommingConferenceIds.findIndex(
          (x) => x.conferenceId == element[element.listId].conferenceId
        );
        // console.log("getting the index", index);
        if (index < 0) {
          upCommingConferenceIds.push({
            conferenceId: element[element.listId].conferenceId,
            name: element[element.listId].name,
            data: [],
          });
        }
      } else {
        ///
        let index = pastConferenceIds.findIndex(
          (x) => x.conferenceId == element[element.listId].conferenceId
        );
        // console.log("getting the index", index);
        if (index < 0) {
          pastConferenceIds.push({
            conferenceId: element[element.listId].conferenceId,
            name: element[element.listId].name,
            data: [],
          });
        }

        pastEvents.push(element);
      }
    });
    pastConferenceIds.forEach((element, index) => {
      pastEvents.forEach((item) => {
        if (element.conferenceId == item.conferenceId) {
          // console.log("zzzzz!!!!!!!!!!!!!!!", item[item.listId].name);
          let obj = {
            listId: item.listId,
            name: item[item.listId].name,
          };
          let str = item.listId + "%%" + item[item.listId].name;
          pastConferenceIds[index].data.push(str);
        }
      });
    });
    upCommingConferenceIds.forEach((element, index) => {
      upCommingEvents.forEach((item) => {
        if (element.conferenceId == item.conferenceId) {
          // console.log("fasfsdafsdafi", element);
          let obj = {
            listId: item.listId,
            name: item[item.listId].name,
          };
          let str = item.listId + "%%" + item[item.listId].name;
          pastConferenceIds[index].data.push(str);
        }
      });
    });

    setData({
      pastEventsData: pastConferenceIds,
      upCommingEventsData: upCommingConferenceIds,
    });
    setFilteredData({
      pastEventsData: pastConferenceIds,
      upCommingEventsData: upCommingConferenceIds,
    });

    // set all data
  };
  const filterData = () => {
    if (filterValue.length > 1) {
      var tempPastEvents = filter(data.pastEventsData);
      var tempComingEvents = filter(data.upCommingEventsData);
      // put the code for futer
      console.log("tempPastEvents", tempPastEvents);
      setFilteredData({
        pastEventsData: tempPastEvents,
        upCommingEventsData: tempComingEvents,
      });
    } else {
      clearFilter();
    }
  };
  const filter = (arry) => {
    const lowerCaseFilter = filterValue.toLowerCase();
    let tempPastEvents = [];
    arry.forEach((element) => {
      let tempPastEventsdata = [];
      console.log("element", element);
      element.data.forEach((item) => {
        console.log("item", item);
        var val = item.split("%%")[1].toString().toLowerCase();
        if (val.includes(lowerCaseFilter)) {
          console.log("result", item);
          tempPastEventsdata.push(item);
        }
      });
      if (tempPastEventsdata.length > 0) {
        let obj = Object.assign({}, element);
        obj.data = tempPastEventsdata;
        tempPastEvents.push(obj);
        console.log("tempPastEventsdata", tempPastEventsdata);
      }
    });
    return tempPastEvents;
  };
  const clearFilter = () => {
    console.log("data orginal", data.pastEventsData);
    setFilteredData({
      pastEventsData: data.pastEventsData,
      upCommingEventsData: data.upCommingEventsData,
    });
  };
  const onPress = (params) => {
    let index = allData.findIndex((x) => x.listId == params);
    if (index >= 0) {
      navigation.navigate("CheckInListScreen", {
        allData: allData[index],
        listId: params,
      });
    }
  };
  return (
    <View className="flex-1">
      <ConnectionHeader
        onPress={() => toggle()}
        onPressD={() => setVisible(true)}
      />
      {search ? (
        <View className="h-[40] w-[300] bg-slate-300 mt-3 rounded-lg items-center self-center flex-row">
          <TextInput
            placeholder="Search here"
            value={filterValue}
            style={styles.input}
            onChangeText={(val) => {
              setFilterValue(val);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setFilterValue("");
              2;
              clearFilter();
            }}
          >
            <Image
              source={require("../assets/images/cross.png")}
              style={{ height: 10, width: 10, tintColor: "black" }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      <Loading isVisible={loading} loading={loading} />
      {filteredData?.pastEventsData?.length > 0
        ? filteredData.pastEventsData.map((item) => (
            <View style={styles.cont} key={item.conferenceId.toString()}>
              <View style={styles.innerCont}>
                <Text className="text-lg mt-4 mb-2 font-medium text-secondary">
                  {item.conferenceId}
                </Text>
              </View>

              {item.data.map((item, index) => (
                <TouchableOpacity
                  key={item.split("%%")[0].toString()}
                  onPress={() => onPress(item.split("%%")[0])}
                  style={styles.click}
                  className="flex-row items-center mt-3 justify-between"
                >
                  <Text
                    //  key={index}
                    className="text-base ml-1 font-base text-secondary"
                  >
                    {item.split("%%")[1]}
                  </Text>
                  <Image
                    className="h-[18] w-[11] "
                    source={require("../assets/images/next.png")}
                  />
                </TouchableOpacity>
              ))}
              <LogoutModal
                isVisible={visible}
                pressOk={() => auth().signOut()}
                pressNo={() => setVisible(false)}
              />
            </View>
          ))
        : null}
      {filteredData?.upCommingEventsData?.length > 0
        ? filteredData.upCommingEventsData.map((item) => (
            <View style={styles.cont} key={item.conferenceId.toString()}>
              <View style={styles.innerCont}>
                <Text className="text-lg mt-4 mb-2 font-medium text-secondary">
                  {item.conferenceId}
                </Text>
              </View>

              {item.data.map((item, index) => (
                <TouchableOpacity
                  key={item.split("%%")[0].toString()}
                  onPress={() => onPress(item.split("%%")[0])}
                  style={styles.click}
                  className="flex-row items-center mt-3 justify-between"
                >
                  <Text
                    //  key={index}
                    className="text-base ml-1 font-base text-secondary"
                  >
                    {item.split("%%")[1]}
                  </Text>
                  <Image
                    className="h-[18] w-[11] "
                    source={require("../assets/images/next.png")}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))
        : null}
    </View>
  );
}

<NoScan
  onPress={() =>
    navigation.navigate("QRScanner", {
      form: "CustomerHistory",
    })
  }
/>;
export default EventList;
const styles = StyleSheet.create({
  imageBg: {
    height: Platform.OS === "ios" ? 252 : 257,
    width: Theme.dw,
    position: "absolute",
    zIndex: -1,
    bottom: 0,
  },
  btnCont: {
    bottom: Theme.dh * 0.12,
    position: "absolute",
    alignSelf: "center",
  },
  input: {
    fontSize: 17,
    height: 40,
    width: "100%",
    padding: 10,
  },
  icon: {
    width: "40%",
    alignItems: "center",
  },
  text: {
    width: "60%",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    color: "red",
  },
  innerCont: {
    width: "100%",
    alignSelf: "center",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    marginTop: Theme.dh * 0.01,
  },
  cont: {
    width: "80%",
    alignSelf: "center",
    borderBottomColor: "#2D9CDB",
    borderBottomWidth: 1,
    //marginTop: Theme.dh * 0.03,
  },
  click: {
    width: "97%",
    marginBottom: 15,
  },
  input: {
    fontSize: 14,
    height: 40,
    width: "90%",
    padding: 5,
    marginLeft: Theme.hp(1),
  },
});

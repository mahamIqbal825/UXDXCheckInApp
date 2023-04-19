import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Platform,
  StyleSheet,
  Dimensions,
  FlatList,
  PermissionsAndroid,
  TouchableOpacity,
  TextInput,
  Image,
  SectionList,
  VirtualizedList,
} from "react-native";
import ConnectionHeader from "../components/ConnectionHeader";
import Heading from "../components/Heading";
import List from "../components/List";
import NoScan from "../components/NoScan";
import firestore from "@react-native-firebase/firestore";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";
import Theme from "../utils/Theme";
import { date } from "yup";

function EventList({ navigation }) {
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);
  const toggle = () => {
    setVisible(!visible);
  };
  const currentUser = auth().currentUser;

  useEffect(() => {
    console.log("id", currentUser.uid);
    getCheckInLists(currentUser.uid);
  }, []);
  let listId = "";

  const getCheckInLists = async (uid) => {
    const checkInListsQuery = await firestore()
      .collection("checkInLists/admins/" + uid)
      .get();
    console.log("checkInListsQuery.docs", checkInListsQuery.docs);
    let acc = [];
    const checkInLists = checkInListsQuery.docs.map((doc) => {
      const data = doc.data();
      console.log("list id", data.listId);
      // listId = data.listId;
      // setData(data)
      acc.push(data);
      return acc;
    });
    const hydratedCheckInLists = await Promise.all(
      acc.map(async (checkInList) => {
        console.log("checkInList.conferenceId", checkInList.conferenceId);
        const listDetails = await firestore()
          .collection("checkInLists/conferences/" + checkInList.conferenceId)
          .doc(checkInList.listId)
          .get();
        const listDetailsData = listDetails.data();
        console.log("listDetailsData", listDetailsData);
        // console.log(
        //   'listDatezzz',
        //   listDetailsData.checkInList.listId.startDate,
        // );
        console.log(
          "listDetailsData[checkInList.listId].startDate",
          listDetailsData[checkInList.listId].startDate
        );
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
    console.log("allData", allData);

    console.log("hydratedCheckInLists", hydratedCheckInLists);
    let upCommingEvents = [];
    let pastEvents = [];
    let pastConferenceIds = [];
    let upCommingConferenceIds = [];
    let myDate = new Date();
    let todayDate = new Date(
      Date.UTC(myDate.getFullYear(), myDate.getMonth(), myDate.getDate())
    );
    console.log("todayDate zzzzzzzzzzzzzzzz", todayDate);
    hydratedCheckInLists.forEach((element) => {
      console.log("elements ", element);
      element.conferenceId = element[element.listId].conferenceId;
      if (element.startDate >= todayDate) {
        upCommingEvents.push(element);
        let index = upCommingConferenceIds.findIndex(
          (x) => x.conferenceId == element[element.listId].conferenceId
        );
        console.log("getting the index", index);
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
        console.log("getting the index", index);
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
          console.log("zzzzz!!!!!!!!!!!!!!!", item[item.listId].name);
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
          console.log("fasfsdafsdafi", element);
          let obj = {
            listId: item.listId,
            name: item[item.listId].name,
          };
          let str = item.listId + "%%" + item[item.listId].name;
          pastConferenceIds[index].data.push(str);
        }
      });
    });

    // data.push({pastEventsData: pastConferenceIds});
    // data.push({upCommingEventsData: upCommingConferenceIds});
    console.log("zzzzzzzzzzzzzzzzzzzzzzz", pastConferenceIds);
    setData({
      pastEventsData: pastConferenceIds,
      upCommingEventsData: upCommingConferenceIds,
    });
    //console.log('pastEvents', pastEvents);
    // data?.map(
    //   item => {
    //     data = item.pastEventsData;
    //     console.log('data = item.pastEventsData', data);
    //   },
    //   // console.log('itemPastData', item.pastEventsData)
    // );
    // let listIds;
    //pastEvents.map(item => ({listIds = item.listId}));

    //console.log('pastEvents', pastEvents[0].conferenceId);
    // let pastEventList = [];
    // pastEvents.forEach(element => {
    //   console.log('conferenceId', element);
    // });
    // const groupedCheckInLists = hydratedCheckInLists.reduce(
    //   (acc, checkInList) => {
    //     console.log('checkInList', checkInList);
    //     console.log('acc', acc);
    //     console.log('checkInListname', checkInList[checkInList.listId].name);
    //     if (!acc[checkInList[checkInList.listId].name]) {
    //       acc[checkInList[checkInList.listId].name] = [];
    //     }
    //     // getTicketsForCheckInList(checkInList);
    //     acc[checkInList[checkInList.listId].name].push(checkInList);
    //     return acc;
    //   },
    //   {},
    // );
    // console.log(
    //   'groupedCheckInLists',
    //   groupedCheckInLists['EMEA 2022'][0][listId],
    // );
    //   let lsit = groupedCheckInLists['EMEA 2022'][0][listId];
    //   getTicketsForCheckInList(lsit);
    //   return groupedCheckInLists;
    // };
  };

  const onPress = (params) => {
    console.log("claiing", allData);
    let index = allData.findIndex((x) => x.listId == params);
    if (index >= 0) {
      console.log("allData", allData[index]);
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
        onPressD={() => {
          //navigation.navigate('QRScanner');
          auth().signOut();
        }}
      />
      <Loading isVisible={loading} loading={loading} />
      {data?.pastEventsData?.length > 0
        ? data.pastEventsData.map((item) => (
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
      {/* {data && loading == false ? (
        <View className="flex-1">
          {visible ? (
            <View className="h-[40] w-[300] bg-slate-300 mt-3 rounded-lg justify-center self-center">
              <TextInput
                placeholder="Search here"
                // className="h-9 w-fill text-lg p-2, mb-1"
                style={styles.input}
                onChangeText={val => {
                  filterData(val);
                }}
              />
            </View>
          ) : null}
          {/* <FlatList
            data={filteredScans}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <List
                key={item.scanId}
                name={item.displayName}
                time={moment(item.created).format('hh:mmA')}
                intro={item.jobTitle}
                company={item.company}
                onPress={() =>
                  navigation.navigate('ScanItem', {
                    data: item,
                  })
                }
              />
            )}
          /> 

          <List
            categorey={'Upcomming'}
            heading={'EMEA 2022'}
            onPress={() =>
              // navigation.navigate('ScanItem', {
              //   data: item,
              // })
              null
            }
          />
          <List
            //categorey={'Upcomming'}
            heading={'EMEA 2022'}
            onPress={() =>
              // navigation.navigate('ScanItem', {
              //   data: item,
              // })
              null
            }
          />
          <List
            categorey={'Past Events'}
            heading={'EMEA 2022'}
            onPress={() =>
              // navigation.navigate('ScanItem', {
              //   data: item,
              // })
              null
            }
          />
        </View>
      ) : null}
      {data == null && loading == false ? (
        <NoScan
          onPress={() =>
            navigation.navigate('QRScanner', {
              form: 'CustomerHistory',
            })
          }
        />
      ) : null}
      {data ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('QRScanner', {
              form: 'CustomerHistory',
            })
          }
          className="flex-row h-[56] bg-secondary b-0 items-center justify-center">
          <View style={styles.icon}>
            <Image
              source={require('../assets/images/qr.png')}
              style={{height: 30, width: 30}}
            />
          </View>
          <Text style={styles.text} className="text-white text-xl font-bold ">
            Scan QR
          </Text>
        </TouchableOpacity>
      ) : null} */}

      <View></View>
      {/* {data.map(item => (
        <View>
          <Text className="text-xl  font-bold text-secondary">Past Events</Text>
          <Text style={styles.title}>{item}</Text>
        </View>
      ))}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <Text className="text-xl  font-bold text-secondary">
              Past Events
            </Text>
            <Text style={styles.title}>{item.conferenceId}</Text>
          </View>
        )}
      /> */}
      {/* <View>
        <List
          categorey={'Upcomming'}
          heading={'EMEA 2022'}
          onPress={() =>
            // navigation.navigate('ScanItem', {
            //   data: item,
            // })
            null
          }
        />
        <List
          //categorey={'Upcomming'}
          heading={'EMEA 2022'}
          onPress={() =>
            // navigation.navigate('ScanItem', {
            //   data: item,
            // })
            null
          }
        />
        <List
          categorey={'Past Events'}
          heading={'EMEA 2022'}
          onPress={() =>
            // navigation.navigate('ScanItem', {
            //   data: item,
            // })
            null
          }
        />
      </View> */}
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
});

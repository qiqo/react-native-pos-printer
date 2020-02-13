import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import RNPosPrinter from "react-native-pos-printer";
import { Button } from "react-native";

const App = () => {
  const [devices, setDevices] = useState([]);

  const getDevices = () => {
    console.log("getDevices");

    RNPosPrinter.getDevices()
      .then(devices => setDevices(devices))
      .catch(err => console.log(err));
  };

  const connectDevice = device => {
    console.log("connectDevice");

    RNPosPrinter.connectDevice(device.identifier)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const printTestReceipt = () => {
    console.log("printTestReceipt");

    RNPosPrinter.printTestReceipt()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    console.log(RNPosPrinter);
  });

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Devices:</Text>
        <FlatList
          data={devices}
          keyExtractor={device => device.identifier}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => connectDevice(item)}>
                <View>
                  <Text>Identifier: {item.identifier}</Text>
                  <Text>Name: {item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Button title="Get Devices" onPress={() => getDevices()} />
      </View>
      <View style={styles.box}>
        <Button title="Print Test Receipt" onPress={() => printTestReceipt()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    margin: 10
  }
});

export default App;

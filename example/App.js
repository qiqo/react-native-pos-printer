import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  RNPosPrinter,
  PrinterConstants,
  printerCommand,
  printerTools
} from "react-native-pos-printer";

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

  const printTestReceipt = async () => {
    console.log("printTestReceipt");

    const cmd = [
      printerCommand.setPrinter(
        PrinterConstants.Command.CODE_PAGE,
        PrinterConstants.Command.CODE_PAGE_CP874
      ),
      printerCommand.setPrinter(
        PrinterConstants.Command.ALIGN,
        PrinterConstants.Command.ALIGN_CENTER
      ),
      printerCommand.setFont(0, 0, 0, 0)
    ];

    cmd.push(printerCommand.printLine("ไทย"));
    cmd.push(printerCommand.printSeparator30("-----"));
    cmd.push(printerCommand.printLine(""));

    try {
      await RNPosPrinter.printerModule.addCommands(cmd);
      if (this.deviceEventEmitter) this.deviceEventEmitter.remove();
      console.log("Done");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(RNPosPrinter);

    RNPosPrinter.init()
      .then(res => console.log(res))
      .catch(err => console.log(err));
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

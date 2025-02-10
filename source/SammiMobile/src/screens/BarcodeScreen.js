import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import QRCode from "../components/qrCode/QRCode";
import { Button } from "@ui-kitten/components";

const BarcodeScreen = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.barcodeContainer}>
        <QRCode scanned={scanned} setScanned={setScanned} />
      </View>
      <View style={styles.btns}>
        <Button
          style={styles.btnStop}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Dừng Scan
        </Button>
        {scanned && (
          <Button
            style={styles.btnRepeat}
            onPress={() => {
              setScanned(false);
            }}
          >
            Scan lại
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barcodeContainer: {
    flex: 1,
  },
  btns: {
    flexDirection: "row",
    marginTop: 12,
  },
  btnStop: {
    flex: 1,
    margin: 8,
    backgroundColor: "red",
    borderColor: "red",
  },
  btnRepeat: {
    flex: 1,
    margin: 8,
  },
});

export default BarcodeScreen;

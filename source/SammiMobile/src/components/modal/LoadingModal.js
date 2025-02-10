import React from "react";
import { View, StyleSheet, ActivityIndicator, Modal, Text } from "react-native";
import { useGlobalContext } from "../../store/contexts/GlobalContext";
import LoadingDots from "@apolloeagle/loading-dots";

const LoadingModal = ({ visible, text }) => {
  const { loadingModalState } = useGlobalContext();
  return (
    <Modal visible={loadingModalState.visible} transparent={true}>
      <View style={styles.container}>
        <LoadingDots animation="pulse" dots={4} color="white" size={12} />
        <Text style={styles.text}>
          {loadingModalState.label ? loadingModalState.label : "Đang tải..."}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  text: {
    fontSize: 15,
    paddingTop: 12,
    color: "white",
  },
});

export default LoadingModal;

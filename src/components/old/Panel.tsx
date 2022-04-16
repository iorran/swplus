import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FinishButton from "./buttons/FinishButton";
import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { CURRENT_TOOL_ATOM } from "../../contexts/Tool";

const label = {
  line: "Linha",
  dot: "Ponto",
  circle: "Círculo",
  hand: "Explorar",
};

export default function Panel() {
  const [currentTool] = useAtom(CURRENT_TOOL_ATOM);
  return (
    <View style={styles.container}>
      <Text style={styles.toolText}>{label[currentTool]}</Text>
      {/* <FinishButton /> */}
      <Ionicons name="arrow-undo-circle-outline" size={32} color="#C50000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "70%",
    height: 85,
    borderRadius: 16,
    margin: 25,
    backgroundColor: "rgba(255,255,255,1)",
    //rgba(33,58,119,1)
    borderBottomWidth: 8,
    borderColor: "#213A77",
    padding: 12,
  },
  toolText: {
    fontSize: 18,
  },
});

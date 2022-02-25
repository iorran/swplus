import React from "react";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, View } from "react-native";
import { Callout } from "react-native-maps";

type RemovableCalloutProps = {
  children: React.ReactNode;
  action: () => void;
};

export default function RemovableCallout({
  children,
  action,
}: RemovableCalloutProps) {
  return (
    <Callout>
      <View style={styles.container}>
        <View style={styles.header}>
          <EvilIcons name="trash" size={48} color="red" onPress={action} />
        </View>
        <View style={styles.body}>{children}</View>
      </View>
    </Callout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").height * 0.6,
  },
  header: {
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    height: 30,
  },
  body: {
    display: "flex",
    padding: 8,
    flexGrow: 1,
  },
});

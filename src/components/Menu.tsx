import { useAtom } from "jotai";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
/* @ts-ignore */
import { FloatingMenu } from "react-native-floating-action-menu";
import { CURRENT_TOOL_ATOM } from "../contexts/Tool";

const items = [
  { label: "Pontos" },
  { label: "Linhas" },
  { label: "Círculos" },
  { label: "Exportar" },
];

export default function Menu() {
  const [, setCurrentTool] = useAtom(CURRENT_TOOL_ATOM);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (isMenuOpen: boolean) => setIsMenuOpen(isMenuOpen);

  const handleItemPress = (item: any, index: number) => {
    switch (item.label) {
      case "Pontos":
        setCurrentTool("dot");
        break;
      case "Linhas":
        setCurrentTool("line");
        break;
      case "Círculos":
        setCurrentTool("circle");
        break;
      case "Exportar":
        alert("export");
        break;
    }
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <FloatingMenu
        isOpen={isMenuOpen}
        items={items}
        onMenuToggle={handleMenuToggle}
        onItemPress={handleItemPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
});

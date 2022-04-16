import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Actionsheet,
  Box,
  Text,
  Center,
  Fab,
  Icon,
  useDisclose,
} from "native-base";
import { CURRENT_TOOL_ATOM, ICurrentToolAtom } from "../contexts/Tool";
import { useAtom } from "jotai";

const items: { label: string; value: ICurrentToolAtom }[] = [
  { label: "Pontos", value: "dot" },
  { label: "Linhas", value: "line" },
  { label: "Círculos", value: "circle" },
  { label: "Exportar", value: "export" },
];

const Menu = () => {
  const [, setCurrentTool] = useAtom(CURRENT_TOOL_ATOM);
  const { isOpen, onOpen, onClose } = useDisclose();
  const selectItem = (value: ICurrentToolAtom) => {
    setCurrentTool(value);
    onClose();
  };
  return (
    <Center>
      <Fab
        onPress={onOpen}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {items.map((item) => (
            <Actionsheet.Item
              key={item.label}
              onPress={() => selectItem(item.value)}
            >
              {item.label}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default Menu;

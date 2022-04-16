import React from "react";
import * as Sharing from "expo-sharing";
import { AntDesign } from "@expo/vector-icons";
import {
  Actionsheet,
  Center,
  Fab,
  Icon,
  useDisclose,
  useToast,
} from "native-base";
import { CURRENT_TOOL_ATOM, ICurrentToolAtom } from "../contexts/Tool";
import { useAtom } from "jotai";
import { generateShareableExcel } from "../utils/export-houses";
import { useHouseStore } from "../contexts/House";

const Menu = () => {
  const toast = useToast();
  const { houses } = useHouseStore();
  const [, setCurrentTool] = useAtom(CURRENT_TOOL_ATOM);
  const { isOpen, onOpen, onClose } = useDisclose();

  const items: { label: string; onClick: () => void }[] = [
    { label: "Pontos", onClick: () => selectItem("dot") },
    { label: "Linhas", onClick: () => selectItem("line") },
    { label: "Círculos", onClick: () => selectItem("circle") },
    { label: "Exportar", onClick: () => shareExcel() },
  ];

  const selectItem = (value: ICurrentToolAtom) => {
    setCurrentTool(value);
    onClose();
  };

  const shareExcel = async () => {
    const shareableExcelUri: string = await generateShareableExcel(houses);
    Sharing.shareAsync(shareableExcelUri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
      dialogTitle: "Exportar Casas", // Android and Web
      UTI: "com.microsoft.excel.xlsx", // iOS
    })
      .catch((error) => {
        toast.show({
          description: "Desculpe, não posso efetuar a operação.",
          placement: "top",
        });
      })
      .then(() => {
        toast.show({
          description: "Arquivo gerado com sucesso.",
          placement: "top",
        });
      });
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
            <Actionsheet.Item key={item.label} onPress={() => item.onClick()}>
              {item.label}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default Menu;

import { ErrorMessage } from "@hookform/error-message";
import { VStack, FormControl, Input, Button, Text } from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHouseStore } from "../../contexts/House";
import { useToast } from "native-base";

type HouseFormProps = {
  latitude: number;
  longitude: number;
};

export default function HouseForm({ latitude, longitude }: HouseFormProps) {
  const { save } = useHouseStore();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    save({ ...data, latitude, longitude });
    toast.show({ description: "Registro salvo com sucesso", placement: "top" });
  };

  return (
    <VStack space={2}>
      <FormControl isRequired isInvalid={"imovel" in errors}>
        <FormControl.Label>Imóvel</FormControl.Label>
        <Controller
          name="imovel"
          rules={{ required: "Obrigatório" }}
          control={control}
          render={({ field }) => <Input onChangeText={field.onChange} />}
        />
        <ErrorMessage
          errors={errors}
          name="imovel"
          render={({ message }: any) => (
            <FormControl.ErrorMessage>{message}</FormControl.ErrorMessage>
          )}
        />
      </FormControl>
      <Button onPress={handleSubmit(onSubmit)}>Salvar</Button>
    </VStack>
  );
}

import { ErrorMessage } from "@hookform/error-message";
import { VStack, FormControl, Input, Button, Text } from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function HouseForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

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

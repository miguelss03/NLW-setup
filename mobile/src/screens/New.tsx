import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from '@expo/vector-icons'
import { BackButton } from '../components/BackButton';
import { CheckBox } from "../components/CheckBox";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

export function New() {

    const [weekDays, setWeekDays] = useState<number[]>([]);
    const [title, setTitle] = useState('')

    function handleToggleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    async function handleCreateNewHabit() {
        try {
            if (!title.trim() || weekDays.length === 0) {
                Alert.alert('Novo Hábito', 'Informe o nome do hábito e a periodicidade');
            }

            await api.post('/habits', { title, weekDays });

            setTitle('');
            setWeekDays([]);

            Alert.alert('Novo Hábito', 'Hábito criado com sucesso');
        } catch (error) {
            console.log(error);
            Alert.alert('Ops', 'Não foi possível criar o novo hábito');
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}>
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar habito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Criar habito
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3  bg-zinc-900 text-white focus:border-2 focus:border-green-600"
                    placeholder="ex.: Exercicios, Dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="mt-4 mb-3 text-white font-semibold text-base">
                    Qual a recorrência?
                </Text>

                {availableWeekDays.map((weekDay, index) => (
                    <CheckBox
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(index)}
                        onPress={() => handleToggleWeekDay(index)}
                    />
                ))
                }

                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    onPress={handleCreateNewHabit}
                    activeOpacity={0.7}
                >
                    <Feather
                        name="check"
                        size={22}
                        color={colors.white}
                    />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}
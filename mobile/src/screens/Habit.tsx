import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { ScrollView, View, Text } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { ProgressBar } from "../components/ProgressBar";

interface Params {
    date: string;
}

export function Habit() {
    const route = useRoute();

    /// desestruturando a data relativa do objeto e formatando
    /// ou seja, o objeto indica cada data respectiva e retorna formatada
    const { date } = route.params as Params;

    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM')

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <BackButton />


                <Text className="text-zinc-400 mt-6 font-semibold text-base lowercase" >
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>

                <ProgressBar progress={78} />

                <View className="mt-6">
                    <CheckBox 
                    title="Beber 2L de Agua"
                    checked={true}
                    />
                    <CheckBox 
                    title="Beber 2L de Agua"
                    checked={false}
                    />
                    <CheckBox 
                    title="Beber 2L de Agua"
                    checked={true}
                    />
                </View>

            </ScrollView>
        </View>
    )
}
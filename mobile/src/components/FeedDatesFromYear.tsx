import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';

const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSize = 21 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

export function FeedDatesFromYear() {
    const { navigate } = useNavigation();

    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await api.get('/summary');
            setSummary(response.data)
            
            console.log(response.data)
        } catch (error) {
            Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <View className="flex-row flex-wrap">
            {
                datesFromYearStart.map(date => (
                    <HabitDay
                        key={date.toISOString()}
                        onPress={() => navigate('habit', { date: date.toISOString() })}
                    />
                ))
            }

            {
                amountOfDaysToFill > 0 && Array
                    .from({ length: amountOfDaysToFill })
                    .map((_, i) => (
                        <View
                            key={i}
                            className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                            style={{ width: DAY_SIZE, height: DAY_SIZE }}
                        />
                    ))
            }
        </View>
    )
}
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';
import dayjs from "dayjs";

const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSize = 21 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

type SummaryProps = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number;
}>

export function FeedDatesFromYear() {
    const { navigate } = useNavigation();

    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<SummaryProps | null>(null);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await api.get('/summary');

            setSummary(response.data)

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

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            {
                summary &&
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => {
                            const dayWithHabits = summary.find(day => {
                                return dayjs(date).isSame(day.date, 'day');
                            })

                            return (
                                <HabitDay
                                    key={date.toISOString()}
                                    date={date}
                                    amountOfHabits={dayWithHabits?.amount}
                                    amountCompleted={dayWithHabits?.completed}
                                    onPress={() => navigate('habit', { date: date.toISOString() })}

                                />
                            )
                        })
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
            }
        </>
    )
}
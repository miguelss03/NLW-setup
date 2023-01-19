import { View } from "react-native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';

const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSize = 21 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

export function FeedDatesFromYear() {
    return (
        <View className="flex-row flex-wrap">
            {
                datesFromYearStart.map(date => (
                    <HabitDay
                        key={date.toISOString()}
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
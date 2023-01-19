import { ScrollView, View } from "react-native";
import { FeedDatesFromYear } from "../components/FeedDatesFromYear";
import { FeedWeekDay } from "../components/FeedWeekDay";
import { Header } from "../components/Header";

export function Home() {
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            <FeedWeekDay />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}>
                <FeedDatesFromYear />
            </ScrollView>
        </View>
    )
}
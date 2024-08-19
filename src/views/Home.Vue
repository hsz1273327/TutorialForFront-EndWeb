<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="测试是否有权限" @tap="onCheckPermission" />
                <Button text="申请权限" @tap="onQueryermission" />
                <Button text="创建事件" @tap="onCreateEvent" />
                <Button text="列出事件" @tap="onListEvent" />
                <Button text="查看日历" @tap="onListCalendars" />
                <Button text="删除创建的事件" @tap="onDeleteEvent" />
                <Button text="删除创建的日历" @tap="onDeleteCalendars" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue"
import * as Calendar from "nativescript-calendar"
import { Feedback, FeedbackPosition } from "nativescript-feedback"
const feedback = new Feedback();

async function onCheckPermission() {
    let granted = await Calendar.hasPermission()
    await feedback.info({
        message: `Permission granted? ${granted}`,
        position: FeedbackPosition.Top
    })
}
async function onQueryermission() {
    try {
        await Calendar.requestPermission()
        await feedback.info({
            message: "Permission requested",
            position: FeedbackPosition.Top
        })
    } catch (error) {
        console.log(`Permission requested get error: ${error}`)
        await feedback.error({
            message: `Permission requested get error`,
            position: FeedbackPosition.Top
        })
    }
}
const currentEventID = ref("")
async function onCreateEvent() {
    let options: Calendar.CreateEventOptions = {
        //事件标题
        title: 'Get groceries',
        // 这个例子标记了一个当前时间一小时后的事件,同时这个时间会在当前时间两小时后结束
        // 事件开始时间
        startDate: new Date(new Date().getTime() + (60 * 60 * 1000)),
        // 事件结束时间
        endDate: new Date(new Date().getTime() + (2 * 60 * 60 * 1000)),
        // 事件发生地点
        location: 'The shop',
        // 事件的记录信息
        notes: 'This event has reminders',
        // 事件相关url,ios独有
        // url: 'http://my.shoppinglist.com',
        // 事件的提醒设置
        reminders: {
            // 第一次提醒时长,单位s.如果设置为null则不会提醒, 不设置则默认为60
            first: 30,
            // 第二次提醒时长,单位s,默认为null,即不会提醒
            second: 10
        },
        // 设置重复
        // 这个例子设置在10天内每两天重复提醒,
        recurrence: {
            // 设置重复频率,可选的有daily | weekly | monthly | yearly
            frequency: "daily",
            // 设置重复间隔
            interval: 2,
            // 重复结束时间
            endDate: new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)) // 10 days
        },
        // 设置自定义日历
        calendar: {
            // 自定义日历名,一般和应用名相关,不填则会自动生成
            name: "NativeScript Cal",
            // 日历上的颜色
            color: "#FF0000",
            // android独有,用于日历分组,一般是应用名
            accountName: "My App Name"
        }
    }
    try {
        const createdId = await Calendar.createEvent(options)
        currentEventID.value = createdId
        console.log("Created Event with ID: " + createdId)
        await feedback.info({
            message: `CreateEvent ok with id ${createdId}`,
            position: FeedbackPosition.Top
        })
    } catch (error) {
        console.log("Error creating an Event: " + error)
        await feedback.error({
            message: `Created Event get error`,
            position: FeedbackPosition.Top
        })
    }
}
async function onListEvent() {
    let options: Calendar.FindEventsOptions = {

        // 开始和结束时间,必填,框定搜索事件的时间范围
        startDate: new Date(new Date().getTime() - (50 * 24 * 60 * 60 * 1000)),
        endDate: new Date(new Date().getTime() + (50 * 24 * 60 * 60 * 1000))
        // 指定id
        // id?: string,

        // 指定部分title用于搜索匹配
        // title?: string,

        //指定部分地址用于搜索匹配
        // location?: string,

        // 仅ios可用,指定部分notes用于搜索匹配
        // notes?: string,
    }
    try {
        let events = await Calendar.findEvents(options)
        console.log("Found these Events on the device: " + JSON.stringify(events));
        await feedback.info({
            message: "listEvents ok",
            position: FeedbackPosition.Top
        })
    } catch (error) {
        console.log(`listEvents get error: ${error}`)
        await feedback.error({
            message: `listEvents get error`,
            position: FeedbackPosition.Top
        })
    }
}

async function onListCalendars() {
    try {
        const calendars = await Calendar.listCalendars()
        console.log("Found these Calendars on the device: " + JSON.stringify(calendars));
        await feedback.info({
            message: "listCalendars ok",
            position: FeedbackPosition.Top
        })
    } catch (error) {
        console.log(`listCalendars get error: ${error}`)
        await feedback.error({
            message: `listCalendars get error`,
            position: FeedbackPosition.Top
        })
    }
}

async function onDeleteEvent() {
    let options: Calendar.DeleteEventsOptions = {
        // 开始和结束时间,必填,框定搜索事件的时间范围
        startDate: new Date(new Date().getTime() - (50 * 24 * 60 * 60 * 1000)),
        endDate: new Date(new Date().getTime() + (50 * 24 * 60 * 60 * 1000)),
        // 指定id
        id: currentEventID.value

        // 指定部分title用于搜索匹配
        // title?: string,

        //指定部分地址用于搜索匹配
        // location?: string,

        // 仅ios可用,指定部分notes用于搜索匹配
        // notes?: string,
    }
    try {
        let events = await Calendar.deleteEvents(options)
        console.log("Delete these Events on the device: " + JSON.stringify(events));
        await feedback.info({
            message: "Delete Events ok",
            position: FeedbackPosition.Top
        })
    } catch (error) {
        console.log(`Delete Events get error: ${error}`)
        await feedback.error({
            message: `Delete Events get error`,
            position: FeedbackPosition.Top
        })
    }
}
async function onDeleteCalendars() {
    let options: Calendar.DeleteCalendarOptions = {
        name: "NativeScript Cal"
    }
    try {
        let calendars = await Calendar.deleteCalendar(options)
        console.log("Delete these Calendars on the device: " + JSON.stringify(calendars));
        await feedback.info({
            message: "Delete Calendars ok",
            position: FeedbackPosition.Top
        })
    } catch (error) {
        console.log(`Delete Calendars get error: ${error}`)
        await feedback.error({
            message: `Delete Calendars get error`,
            position: FeedbackPosition.Top
        })
    }
}
</script>
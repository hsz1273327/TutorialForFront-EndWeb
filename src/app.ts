import { createApp } from 'nativescript-vue'
import { Application, isAndroid, AndroidApplication, AndroidActivityBundleEventData } from '@nativescript/core'
import Home from './views/Home.vue'

if (isAndroid) {
    const androidApp: AndroidApplication = Application.android
    // receiver = androidApp.registerBroadcastReceiver(intentFilter, onReceiveCallback) //注册监听器
    // androidApp.unregisterBroadcastReceiver(intentFilter) //移除事件上的监听器

    androidApp.on(androidApp.activityCreatedEvent, function (args: AndroidActivityBundleEventData) {
        let activity = args.activity;
        // Get intent, action and MIME type
        let intent = activity.getIntent();
        let action = intent.getAction();
        let type = intent.getType();
        console.log("activityCreated get event");
        if (android.content.Intent.ACTION_SEND === action && type != null) {
            if (type.startsWith("text/")) {
                handleSendText(intent); // custom method to handle text being sent
            } else if (type.startsWith("image/")) {
                handleSendImage(intent); // custom method to handle single image being sent
            }
        } else if (android.content.Intent.ACTION_SEND_MULTIPLE === action && type != null) {
            if (type.startsWith("image/")) {
                handleSendMultipleImages(intent); // custom method to handle multiple images being sent
            }
        } else {
            // Handle other intents, such as being started from the home screen
        }
    });

    function handleSendText(intent: android.content.Intent) {
        if (isAndroid) {
            // 获取分享的text文本
            let sharedText = intent.getStringExtra(android.content.Intent.EXTRA_TEXT);
            if (sharedText != null) {
                console.log("sharedText: ", sharedText);
                console.log("Text received!");
            }
        }
    }

    function handleSendImage(intent: android.content.Intent) {
        if (isAndroid) {
            // 获取分享的图片的URI,有了URI就可以执行读取文件的操作了
            let imageUri = <android.net.Uri>intent.getParcelableExtra(android.content.Intent.EXTRA_STREAM);
            if (imageUri != null) {
                console.log(`sharedImage URI: ${imageUri.toString()}`);
                console.log("Image received!");
            }
        }
    }
    function handleSendMultipleImages(intent: android.content.Intent) {
        if (isAndroid) {
            let imageUris = intent.getParcelableArrayListExtra(android.content.Intent.EXTRA_STREAM);
            if (imageUris != null) {
                // Update UI to reflect multiple images being shared
                console.log("imageUris: ", imageUris);
                console.log("Multiple images received!");
            }
        }
    }
}

createApp(Home).start()

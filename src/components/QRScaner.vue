<template>
    <GridLayout height="300" @shownInBottomSheet="onShownInBottomSheet">
        <BarcodeView ref="cameraView" class="scanner-round" pause beepOnScan="true" reportDuplicates="false" format="QR_CODE"
            @scanResult="onScanResult" />
        <Image src="~/assets/crosshair.png" width="140" height="140" style="margin-top: 14; opacity: 0.3"
            horizontalAlignment="center" verticalAlignment="center" />
        <Button verticalAlignment="bottom" horizontalAlignment="left" text="torch" @tap="toggleTorch" />
    </GridLayout>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";

const { closeBottomSheet } = useBottomSheet()

const cameraView = ref()
function onShownInBottomSheet() {
    console.log('onShownInBottomSheet');
    cameraView.value._nativeView.resumeScanning();
}
function onScanResult(evt) {
    console.log(`onScanResult: ${evt.text} (${evt.format})`);
    closeBottomSheet(evt.text, evt.format);
}
function toggleTorch() {
    cameraView.value._nativeView.torchOn = !cameraView.value._nativeView.torchOn;
    console.log(`toggleTorch: ${cameraView.value._nativeView.torchOn})`);

}

</script>
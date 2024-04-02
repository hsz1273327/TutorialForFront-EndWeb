<template>
    <Frame>
        <Page actionBarHidden="true">
            <gridLayout class="px-5" columns="*" rows="auto, *">
                <PDFView src="https://arxiv.org/pdf/1706.03762.pdf" row="1" ></PDFView>
            </gridLayout>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
console.log("show pdf")
</script>
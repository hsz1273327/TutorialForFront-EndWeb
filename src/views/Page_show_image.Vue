<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout padding="12">
                    <NSImg src="~/assets/bookofmormon.png" stretch="fitCenter" height="270"
                            roundAsCircle="true" />
                    <GridLayout height="280" borderRadius="10" class="bg-secondary"
                            margin="5 10" padding="0">
                        <image src="~/assets/bookofmormon.png" stretch="aspectFit" height="280"/>
                        <BlurView blurRadius="10" height="280"></BlurView>
                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
console.log("show image")
</script>
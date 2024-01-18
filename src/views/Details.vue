<template>
  <Page>
    <ActionBar v-if="flick" :title="flick.title" />
    <ScrollView height="100%">
      <StackLayout>
        <Image margin="0" stretch="aspectFill" :src="flick.image" />
        <StackLayout padding="10 20">
          <StackLayout v-for="detail in flick.details" :key="detail.title">
            <Label marginTop="15" fontSize="16" fontWeight="700" class="text-primary ios:ios-info android:android-info" textWrap="true"
              :text="detail.title" />
            <Label fontSize="14" class="text-secondary" textWrap="true" :text="detail.body" />
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'nativescript-vue';


import { FlickService } from "../models/Flick";
const flickService = new FlickService();
const props = defineProps(['id'])

const flick = ref(flickService.getFlickById(props.id));
</script>

<style scoped>
/* .info {
  font-family: SmileySans-Oblique;
  color: #FFB6C1;
} */

.ios-info {
  font-family: SmileySans-Oblique;
  color: #007aff;
}

.android-info {
  font-family: SmileySans-Oblique;
  color: #4caf50;
}

</style>
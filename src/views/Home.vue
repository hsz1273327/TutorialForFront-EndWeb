<template>
  <Frame>
    <Page>
      <ActionBar title="NativeFlix" />
      <ListView height="100%" separatorColor="transparent" :items="flicks">
        <template #default="{ item }">
          <GridLayout height="280" borderRadius="10" class="bg-secondary" rows="*, auto, auto" columns="*" margin="5 10"
            padding="0" rippleColor="#FFB6C1" @tap="onFlickTap(item)">
            
            <image row="0" margin="15 15 15 15" stretch="aspectFill" :src="item.image" />
            <BlurView blurRadius="10" width="100%" height="200"></BlurView>
            <label row="1" margin="15 15 0 15" fontWeight="700" class="text-primary" fontSize="18" :text="item.title" />
            <label row="2" margin="0 15 15 15" class="text-secondary" fontSize="14" textWrap="true"
              :text="item.description" />
          </GridLayout>
        </template>
      </ListView>
      
    </Page>
  </Frame>
</template>

<script lang="ts" setup>
import {
  ref,
  $navigateTo,
} from 'nativescript-vue';
import Details from './Details.vue';
import { FlickService, FlickModel } from "../models/Flick";
const flickService = new FlickService();
const flicks = ref(flickService.getFlicks());

function onFlickTap(item: FlickModel) {
  const id = item.id;
  $navigateTo(Details, {
    props: { id },
  });
}
</script>

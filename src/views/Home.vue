

<template>
  <Frame>
    <Page>
      <ActionBar title="NativeFlix" />
      <ListView height="100%" separatorColor="transparent" :items="flicks">
        <template #default="{ item }">
          <GridLayout height="280" borderRadius="10" class="bg-secondary" rows="*, auto, auto" columns="*" margin="5 10"
            padding="0" @tap="onFlickTap(item)">
            <image row="0" margin="0" stretch="aspectFill" :src="item.image" />
            <label row="1" margin="10 10 0 10" fontWeight="700" class="text-primary" fontSize="18" :text="item.title" />
            <label row="2" margin="0 10 10 10" class="text-secondary" fontSize="14" textWrap="true"
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
  onBeforeMount,
  onUnmounted
} from 'nativescript-vue';
import Details from './Details.vue';
// import { Init, GetFlicks, FlickModel } from "../models/Flick_json";
// import { Init, GetFlicks, FlickModel } from "../models/Flick_ApplicationSettings";
// import { Init, Close,  GetFlicks, FlickModel } from "../models/Flick_CouchDB";
import { Init, Close, GetFlicks, FlickModel } from "../models/Flick_sqlite";

const flicks = ref<FlickModel[]>([]);

function onFlickTap(item: FlickModel) {
  const id = item.id;
  $navigateTo(Details, {
    props: { id },
  });
}

// onBeforeMount(() => {
//   try {
//     Init()
//     let res = GetFlicks()
//     flicks.value = res
//   } catch (e) {
//     console.log(`get error ${e}`)
//   }
// })


onBeforeMount(() => {
  Init().then(() => {
    return GetFlicks()
  }).then((res) => {
    flicks.value = res
  }).catch(
    (e) => {
      console.log(`get error ${e}`)
    }

  )
})

onUnmounted(() => Close())
</script>


<style>
/* .info {
    font-size: 20;
  } */
</style>

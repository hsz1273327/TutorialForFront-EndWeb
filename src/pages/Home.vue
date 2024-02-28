<template>
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
</template>

<script lang="ts" setup>
import {
  ref,
  $navigateTo,
  onBeforeMount,
  onUnmounted
} from 'nativescript-vue';
import { useRouter } from "router-vue-native";
import { GetFlicks, FlickModel } from "../models/Flick_orm";
const router = useRouter();
const flicks = ref<FlickModel[]>([]);

function onFlickTap(item: FlickModel) {
  const id = item.id;
  router.push("/detail", { props: { id } })
}

onBeforeMount(async () => {
  try {
    const res = await GetFlicks()
    flicks.value = res
  } catch (error) {
    console.log(`get error ${e}`)
  }
})

</script>


<style>
/* .info {
    font-size: 20;
  } */
</style>

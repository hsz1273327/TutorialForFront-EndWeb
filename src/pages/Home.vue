<template>
  <Page>
    <ActionBar title="NativeFlix" />
    <PullToRefresh ref="" @refresh="refresh">
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
    </PullToRefresh>

  </Page>
</template>

<script lang="ts" setup>
import {
  ref,
  onBeforeMount,
} from 'nativescript-vue';
import { EventData } from "@nativescript/core"
import { useRouter } from "router-vue-native";
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh'
import { GetFlicks, FlickModel } from "../models/Flick_orm";
import { FeedbackPosition } from "nativescript-feedback"
import { feedback } from "../utils"


const router = useRouter();
const flicks = ref<FlickModel[]>([]);

function onFlickTap(item: FlickModel) {
  const id = item.id;
  router.push("/details", { props: { id } })
}

async function _refresh() {
  const res = await GetFlicks()
  flicks.value = res
  console.log(`get all flicks`)

}

function refresh(evt: EventData) {
  let pullRefresh = evt.object as PullToRefresh
  _refresh().then((_) => pullRefresh.refreshing = false).catch(error => console.log(`get error ${error}`))
}

onBeforeMount(async () => {
  try {
    await _refresh()
  } catch (error) {
    feedback.error({
      message: "数据加载异常,请过会儿刷新重试",
      position: FeedbackPosition.Top
    });
    console.log(`get error ${error}`)
  }
})
</script>


<style>
/* .info {
    font-size: 20;
  } */
</style>

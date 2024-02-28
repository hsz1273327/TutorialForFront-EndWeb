<template>
  <Page>
    <ActionBar v-if="flick" :title="flick.title" />
    <ScrollView height="100%">
      <StackLayout>
        <Image margin="0" stretch="aspectFill" :src="flick.image" />
        <StackLayout padding="10 20">
          <StackLayout v-for="detail in flick.details" :key="detail.title">
            <Label marginTop="15" fontSize="16" fontWeight="700" class="text-primary" textWrap="true"
              :text="detail.title" />
            <Label fontSize="14" class="text-secondary" textWrap="true" :text="detail.body" />
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>


<script lang="ts" setup>
import { ref, defineProps, onMounted, computed } from 'nativescript-vue';
import { GetFlickById, FlickDetail } from "../models/Flick_orm";

const props = defineProps(['id'])

const flick = ref<FlickDetail>({
  id: 0,
  genre: "",
  title: "",
  image: "",
  url: "",
  description: "",
  details: [],
})

const hasContent = computed(() => flick ? true : false)

onMounted(async () => {
  try {
    const res = await GetFlickById(props.id)
    flick.value = res
  } catch (e) {
    console.log(`GetFlickById get error ${e}`)
  }
})
</script>

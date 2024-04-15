
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
            <Label class="mdi icon-sp" :text="delete_icon"></Label> 
            <Label class="fontello" :text="manage_icon"></Label> 
            <Label class="fontello" :text="alipay_icon"></Label> 
            <Label class="fontello" :text="applepay_icon"></Label> 
            <Label class="fontello" :text="googlepay_icon"></Label> 
            <Label class="fontello" :text="wechatpay_icon"></Label> 
            <Label class="fontello" :text="btc_icon"></Label> 
            <Label class="fontello" :text="eth_icon"></Label> 
            <!-- <Label fontSize="14" class="text-secondary" textWrap="true" :text="detail.body" /> -->
            <Label fontSize="14" class="info" textWrap="true" :text="detail.body" />
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>


<script lang="ts" setup>
import { ref, defineProps, onMounted, computed } from 'nativescript-vue';

import { FlickService } from "../models/Flick";
const flickService = new FlickService();
const props = defineProps(['id'])

const flick = ref(flickService.getFlickById(props.id));

const delete_icon = ref("\uf154")
const manage_icon = ref("\ue80c")
const alipay_icon = ref("\ue805")
const applepay_icon = ref("\ue803")
const googlepay_icon = ref("\ue802")
const wechatpay_icon = ref("\ue801")
const btc_icon = ref("\ue804")
const eth_icon = ref("\ue806")

</script>

<style scoped>
.info {
  font-family: SmileySans-Oblique;
  font-size: 20;
}
.icon-sp {
  color:rgb(255, 145, 0);
  font-size: 24;
}
</style>
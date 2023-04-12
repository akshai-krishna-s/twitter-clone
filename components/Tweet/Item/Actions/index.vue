<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue">
      <template v-slot:icon="{ classes }">
        <ChatBubbleOvalLeftIcon :class="classes" />
      </template>
      <template v-slot:default> {{ props.tweet.repliesCount }}</template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="green">
      <template v-slot:icon="{ classes }">
        <ArrowPathRoundedSquareIcon :class="classes" />
      </template>
      <template v-slot:default> 7 </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="red">
      <template v-slot:icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>
      <template v-slot:default> 7 </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="blue">
      <template v-slot:icon="{ classes }">
        <ArrowUpTrayIcon :class="classes" />
      </template>
      <template v-slot:default> 7 </template>
    </TweetItemActionsIcon>
  </div>
</template>

<script setup>
import { ChatBubbleOvalLeftIcon, ArrowPathRoundedSquareIcon, HeartIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
})
</script>

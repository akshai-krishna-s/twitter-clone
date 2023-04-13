<template>
  <div class="h-screen flex flex-col">
    <div class="p-2 my-2 rounded-full hover:bg-blue-50 dark:hover:bg-white/20" :class="defaultTransition">
      <NuxtLink to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </NuxtLink>
    </div>
    <div class="mt-2 space-y-3">
      <SidebarLeftTab active>
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name> Home </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <HashtagIcon />
        </template>
        <template v-slot:name> Explore </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <BellIcon />
        </template>
        <template v-slot:name> Notifications </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <InboxIcon />
        </template>
        <template v-slot:name> Messages </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <BookmarkIcon />
        </template>
        <template v-slot:name> Bookmarks </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name> Lists </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template v-slot:icon>
          <EllipsisHorizontalCircleIcon />
        </template>
        <template v-slot:name> More </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UIButton liquid size="lg" @on-click="emits('onTweet')">
          <span class="font-bold">Tweet</span>
        </UIButton>
      </div>

      <div class="block xl:hidden">
        <UIButton>
          <div class="w-6 h-6 font-bold" @on-click="emits('onTweet')"><PencilIcon /></div>
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon } from '@heroicons/vue/20/solid'

import { HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, DocumentTextIcon, UserIcon, EllipsisHorizontalCircleIcon, PencilIcon } from '@heroicons/vue/24/outline'

const { defaultTransition } = useTailwindConfig()

const emits = defineEmits(['onTweet'])
</script>

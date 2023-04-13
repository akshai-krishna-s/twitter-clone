<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />

      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <!-- left -->
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft @on-tweet="handleOpenTweetModal" />
            </div>
          </div>

          <!-- main -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <RouterView />
          </main>

          <!-- right -->
          <div class="hidden md:block md:col-span-3 xl:col-span-4">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>

      <AuthPage v-else />
      <UIModal :isOpen="postTweetModal" @on-close="handleModalClose">
        <TweetForm :replyTo="replyTweet" showReply :user="user" @onSuccess="handleFormSuccess" />
      </UIModal>
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(true)
const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const isAuthLoading = useAuthLoading()
const { openPostTweetModal, closePostTweetModal, usePostTweetModal, useReplyTweet } = useTweets()
const user = useAuthUser()

const postTweetModal = usePostTweetModal()
const emitter = useEmitter()
const replyTweet = useReplyTweet()

emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet)
})

onBeforeMount(() => {
  initAuth()
})

function handleFormSuccess(tweet) {
  closePostTweetModal()
}

function handleModalClose() {
  closePostTweetModal()
}

function handleOpenTweetModal() {
  openPostTweetModal(null)
}
</script>

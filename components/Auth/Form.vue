<template>
  <div class="w-full">
    <div class="pt-5 space-y-6">
      <UIInput label="Username" placeholder="@username" v-model="data.username" />
      <UIInput v-model="data.password" label="Password" placeholder="********" type="password" />

      <UIButton @click="handleLogin" :disabled="isButtonDisabled" liquid>Login</UIButton>
    </div>
  </div>
</template>

<script setup>
const data = reactive({
  username: '',
  password: '',
  loading: false,
})

async function handleLogin() {
  const { login } = useAuth()

  data.loading = true
  try {
    await login({ username: data.username, password: data.password })
  } catch (error) {
    console.log(error)
  } finally {
    data.login = false
  }
}

const isButtonDisabled = computed(() => {
  return !data.username || !data.password || data.loading
})
</script>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { langs } from '@/locales'
import { useLocaleStore } from '@/stores/locale.js'
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const value = ref(new Date())
const locales = {
  zh: zh,
  en: en
}
const useLocale = useLocaleStore()
console.log(useLocale)
const curLocale = useLocale.locale
console.log(curLocale)
const currentLan = ref(langs.find((cur) => cur.key === curLocale)?.title || '')

function handleCommand(command) {
  currentLan.value = command.title
  // curLocale = command.key
  // useLocale.locale = command.key
  useLocale.setLocale(command.key)
  console.log(useLocale.locale)
}
</script>

<template>
  <el-config-provider :locale="locales[useLocale.locale]">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
        <nav>
          <RouterLink to="/">{{$t('common.home')}}</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
      <el-calendar v-model="value" />

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ currentLan }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(lang,index) in langs" :command="lang" :key="index">{{ lang.title }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>

    <RouterView />
  </el-config-provider>
</template>

<style  lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

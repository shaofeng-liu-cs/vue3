<script setup>
import { ref } from 'vue'
import { langs } from '@/locales'
import { useLocaleStore } from '@/stores/locale.js'
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useDark, useToggle } from '@vueuse/core'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

const locales = {
  zh: zh,
  en: en
}
const useLocale = useLocaleStore()
const curLocale = useLocale.locale
const currentLan = ref(langs.find((cur) => cur.key === curLocale)?.title || '')

function handleCommand(command) {
  currentLan.value = command.title
  // curLocale = command.key
  // useLocale.locale = command.key
  useLocale.setLocale(command.key)
  console.log(useLocale.locale)
}
//
const isDark = useDark({
  // selector: 'body',
  // attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light'
})
// let lsisDark = localStorage.getItem('useDark') || ''
const toggleDark = useToggle(isDark)

// 菜单栏
const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-config-provider :locale="locales[useLocale.locale]">
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
    <el-button type="primary" class="btn" @click="toggleDark()">Primary</el-button>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">expand</el-radio-button>
      <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon>
          <document />
        </el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <setting />
        </el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </el-config-provider>
</template>

<style lang="scss" scoped>
.btn {
  // color: $color-primary;
}
</style>
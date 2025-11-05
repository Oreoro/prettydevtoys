<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { NMessageProvider, NNotificationProvider } from 'naive-ui';
import { createLightThemeOverrides } from './themes';
import { layouts } from './layouts';
import { useStyleStore } from './stores/style.store';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);
const styleStore = useStyleStore();

// Use default (light) theme and compute overrides from CSS variables
const theme = computed(() => undefined);
const themeOverrides = computed(() => createLightThemeOverrides());

const { locale } = useI18n();

syncRef(
  locale,
  useStorage('locale', locale),
);
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <NMessageProvider placement="bottom">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style>
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>

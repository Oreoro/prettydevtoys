<script setup lang="ts">
import { IconBrandGithub, IconMoon, IconSun } from '@tabler/icons-vue';
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isDarkTheme } = toRefs(styleStore);
</script>

<template>
  <div class="navbar-buttons">
    <c-tooltip :tooltip="$t('home.nav.github')" position="bottom">
      <c-button
        class="navbar-buttons__item"
        circle
        variant="text"
        href="https://github.com/CorentinTh/it-tools"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="$t('home.nav.githubRepository')"
      >
        <n-icon size="20" :component="IconBrandGithub" />
      </c-button>
    </c-tooltip>

    <!-- Theme toggle removed: dark mode only -->
  </div>
</template>

<style lang="less" scoped>
.navbar-buttons {
  display: flex;
  align-items: center;
  gap: 6px;
  color: inherit;
}

.navbar-buttons__item {
  color: inherit;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.navbar-buttons__item:hover {
  opacity: 1;
}
</style>

<script setup lang="ts">
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isMenuCollapsed, isSmallScreen } = toRefs(styleStore);
</script>

<template>
  <div class="app-layout">
    <main class="app-layout__content">
      <slot name="content" />
    </main>
  </div>
</template>

<style lang="less" scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: var(--surface-page);
}

.app-layout__content {
  flex: 1;
  min-width: 0;
  padding: 24px clamp(28px, 6vw, 72px) 72px; /* normal bottom spacing */
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-12px);
  opacity: 0;
}

@media (max-width: 900px) {
  .app-layout {
    position: relative;
  }

  .app-layout__content {
    padding: 24px clamp(16px, 5vw, 40px) 64px;
  }
}

@media (max-width: 600px) {
  .app-layout__content {
    padding: 20px 16px 56px;
  }
}
</style>

<script setup lang="ts">
// Simplified layout: single centered content column, no sidebar.
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
  min-height: 100vh;
  background: var(--color-background);
  background-image: var(--gradient-surface);
  padding: 24px clamp(24px, 6vw, 64px) 72px;
  display: flex;
  justify-content: center;
}

.app-layout__content {
  width: 100%;
  max-width: 1100px;
  min-width: 0;
}

@media (max-width: 900px) {
  .app-layout {
    padding: 20px 18px 64px;
  }
}

@media (max-width: 640px) {
  .app-layout {
    padding: 16px 12px 56px;
  }
}
</style>

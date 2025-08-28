<script setup lang="ts"></script>

<template>
  <div class="pt-5">
    <div class="grid gap-8 lg:[grid-template-columns:265px_1fr]">
      <aside
        class="grid grid-rows-[auto_minmax(0,1fr)] rounded-3xl bg-white shadow-base"
      >
        <div class="border-b border-gray-muted p-6 pb-8">
          <slot name="sidebar-header" />
        </div>
        <div class="px-6 pb-10 pt-7">
          <slot name="sidebar-content" />
        </div>
      </aside>

      <main class="flex-1">

        <div>
          <slot name="content" />
        </div>
      </main>
    </div>
  </div>
</template>

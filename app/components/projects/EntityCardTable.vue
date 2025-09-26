<template>
  <div class="max-2xl:overflow-x-auto max-md:overflow-x-visible">
    <table
      class="w-full table-auto border-separate border-spacing-y-4 max-2xl:min-w-max max-md:min-w-0"
    >
      <tbody class="max-md:flex max-md:flex-col max-md:gap-5">
        <tr
          v-for="(card, index) in cardsData"
          :key="index"
          class="rounded-3xl bg-white shadow-sm max-md:relative max-md:flex max-md:flex-wrap max-md:gap-6 max-md:p-5 md:table-row"
        >
          <td
            v-for="(element, ind) in card"
            :key="ind"
            class="bg-white first:rounded-l-3xl last:rounded-r-3xl max-md:w-auto max-md:flex-[0_1_auto] max-md:first:w-full max-md:first:basis-full md:table-cell md:px-7 md:py-5"
            :style="{ '--firstElementWidth': firstElementWidth + 'px' }"
          >
            <div
              :class="[
                ind === 0
                  ? 'max-md:w-full max-md:border-b max-md:border-b-gray-accent max-md:pb-6 md:min-w-[var(--firstElementWidth)]'
                  : '',
                isButton ? 'max-md:pr-16' : '',
              ]"
            >
              <component :is="element.componentName" v-bind="element.data" />
            </div>
          </td>
          <td v-if="isButton" class="rounded-r-3xl md:px-7 md:py-5">
            <div class="right-6 top-6 flex justify-end max-md:absolute">
              <Button color="neutral" size="md" icon-before="more" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { IEntityCardTable } from '~/types/components/entity-card-table';
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

withDefaults(defineProps<IEntityCardTable>(), {
  firstElementWidth: 100,
  isButton: false,
});
</script>

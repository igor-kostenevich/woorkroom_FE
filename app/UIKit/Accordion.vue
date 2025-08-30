<template>
  <div class="w-full rounded-3xl bg-white py-2">
    <div
      class="flex w-full"
      :class="props.isColumns ? 'flex-row gap-6' : 'flex-col'"
    >
      <div
        v-for="(column, indexColumn) in sliceList"
        :key="indexColumn"
        class="w-full"
      >
        <div
          v-for="(item, index) in column"
          :ref="'item' + index"
          :key="index"
          class="cursor-pointer px-5 py-4 font-bold transition-colors"
          :class="[
            activeAccordion === `${index}${indexColumn}`
              ? 'text-primary'
              : 'text-gray hover:text-gray-pressed',
          ]"
          :aria-expanded="activeAccordion === `${index}${indexColumn}`"
          role="button"
          @click="setActiveAccordion(`${index}${indexColumn}`)"
        >
          <div class="relative flex items-center gap-3.5">
            <Icon
              v-if="item.icon"
              class="text-gray"
              :class="{
                'text-primary': activeAccordion === `${index}${indexColumn}`,
              }"
              :name="item.icon"
            />
            <h3 class="m-0 truncate pr-8 text-base font-semibold">
              {{ item.title }}
            </h3>

            <div class="absolute right-0 top-1/2 -translate-y-1/2">
              <Icon
                class="text-gray transition-transform"
                :class="{
                  'rotate-180': activeAccordion === `${index}${indexColumn}`,
                }"
                name="chevron-down"
                :size="24"
              />
            </div>
          </div>

          <div v-if="activeAccordion === `${index}${indexColumn}`" @click.stop>
            <p
              v-if="typeof item.info === 'string'"
              class="mt-4 pr-12 text-sm font-normal text-gray"
            >
              {{ item.info }}
            </p>

            <component
              :is="(item.info as any).is || item.info"
              v-else
              v-bind="(item.info as any).props"
              class="mt-4 pr-12"
            >
              {{ (item.info as any).children }}
            </component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

type InfoConfig = {
  is: Component;
  props?: Record<string, any>;
  children?: any;
};

interface AccordionItem {
  title: string;
  icon?: string;
  info: InfoConfig | string;
}

interface IAccordionProps {
  items?: AccordionItem[];
  isColumns?: boolean;
}

const props = withDefaults(defineProps<IAccordionProps>(), {
  items: () => [],
  isColumns: false,
  headTitle: '',
});

const activeAccordion = ref<string | null>(null);

const setActiveAccordion = (index: string): void => {
  activeAccordion.value = activeAccordion.value === index ? null : index;
};

const sliceList = computed(() => {
  const half = Math.round(props.items.length / 2);
  return props.isColumns
    ? [props.items.slice(0, half), props.items.slice(half)]
    : [props.items];
});
</script>

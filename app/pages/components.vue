<script setup lang="ts">
import { colors } from '../../config/colors';
import iconList from '../../config/icon-list.json';
import UserAvatar from '~/components/common/UserAvatar.vue';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));
const Segment = defineAsyncComponent(() => import('@/UIKit/Segment.vue'));
const Textarea = defineAsyncComponent(() => import('@/UIKit/Textarea.vue'));
const Radio = defineAsyncComponent(() => import('@/UIKit/Radio.vue'));
const TaskStatus = defineAsyncComponent(
  () => import('~/components/pages/projects/TaskStatus.vue')
);
const VacationStatus = defineAsyncComponent(
  () => import('~/components/pages/vacations/VacationStatus.vue')
);
const Switch = defineAsyncComponent(() => import('@/UIKit/Switch.vue'));
const Checkbox = defineAsyncComponent(() => import('@/UIKit/CheckBox.vue'));
const isChecked1 = ref(false);
const isChecked2 = ref(true);
const isChecked3 = ref(true);
const LinkButton = defineAsyncComponent(() => import('@/UIKit/LinkButton.vue'));

const VacationIndicator = defineAsyncComponent(
  () => import('~/components/pages/vacations/VacationIndicator.vue')
);
const EmployeeLvl = defineAsyncComponent(
  () => import('~/components/pages/employees/EmployeeLvl.vue')
);
definePageMeta({
  layout: 'components',
});

const colorList = flattenColors(colors);
const buttonSizes = ['md', 'lg'] as const;
const buttonColorVariants = ['primary', 'neutral'] as const;
const selected = ref('item1');
const inputVariants = reactive([
  {
    id: '1',
    value: 'item1',
  },
  {
    id: '2',
    value: 'item2',
  },
  {
    id: '3',
    value: 'item3',
  },
]);

const isEnabledSwitch = ref(true);
const isDisabledSwitch = ref(false);
const inputDefault = ref('');
const inputIcon = ref('');
const inputClear = ref('');
const inputPassword = ref('');
const inputDisabled = ref('Disabled text');
const inputReadonly = ref('Readonly value');
const inputTopLabel = ref('');
const inputWithButton = ref('');

const form = reactive({
  test: 0,
});

const taDefault = ref('');
const taWithLabels = ref('');
const taWithMax = ref('');
const taDisabled = ref('Disabled value');
const taReadonly = ref('Readonly value');
const taWithError = ref('');
const taNoClear = ref('This one has no clear button');
const taPrefilled = ref('Prefilled value\nSecond line…');
const taLong = ref(`Line 1
Line 2
Line 3
Line 4
Line 5`);

const taErrors = reactive<{ message: string }>({ message: '' });
watch(taWithError, (v) => {
  taErrors.message = v.trim().length < 10 ? 'Мінімум 10 символів' : '';
});

const rules = computed(() => ({
  test: {
    required: helpers.withMessage(
      'This field is required!',
      validators.required
    ),
    minLength: helpers.withMessage(
      'Minimum length is 5 characters',
      validators.minLength(5)
    ),
    maxLength: helpers.withMessage(
      'Maximum length is 50 characters',
      validators.maxLength(50)
    ),
    allowedChars: helpers.withMessage(
      'Only letters, numbers, spaces, underscores and dashes are allowed',
      helpers.regex(/^[a-zA-Z0-9 _-]+$/)
    ),
  },
}));

const { validationErrors, validateForm } = useValidation(form, rules.value);

const handleSubmit = async () => {
  try {
    const isValid = await validateForm();
    if (!isValid) return;

    // await someStore.someHandler(form); // Example of form submission
  } catch (error: any) {
    //
    console.error(error);
  }
};

handleSubmit();

function flattenColors(
  obj: Record<string, any>,
  prefix = ''
): { name: string; value: any }[] {
  return Object.entries(obj).flatMap(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      return flattenColors(val, prefix ? `${prefix}.${key}` : key);
    }
    if (key === 'DEFAULT' && prefix) {
      return [{ name: prefix, value: val }];
    }
    return [{ name: prefix ? `${prefix}.${key}` : key, value: val }];
  });
}
const selectedSegment = ref(0);

const segmentsOptions = reactive([
  {
    id: 0,
    label: 'List',
  },
  {
    id: 1,
    label: 'Board',
  },
  {
    id: 2,
    label: 'Timeline',
  },
]);
</script>

<template>
  <div class="">
    <h3 class="text-dark-default mb-10 text-4xl font-bold">
      {{ String('COLORS') }}
    </h3>
    <div class="grid grid-cols-8 gap-6">
      <div
        v-for="c in colorList"
        :key="c.name"
        class="flex flex-col items-center space-y-2"
      >
        <div
          class="h-16 w-16 rounded border shadow"
          :style="{ background: c.value }"
        />
        <span class="font-mono text-xs text-gray-500">{{ c.name }}</span>
        <span class="font-mono text-xs">{{ c.value }}</span>
      </div>
    </div>
  </div>
  <h3 class="mb-10 mt-32 text-4xl font-bold text-dark">
    {{ String('Icons') }}
  </h3>
  <div class="grid grid-cols-12 gap-6">
    <div
      v-for="(i, index) in iconList"
      :key="index"
      class="flex flex-col items-center space-y-2"
    >
      <Suspense>
        <Icon :size="48" :name="i.name" />
      </Suspense>

      <p class="text-xs text-gray-500">{{ i.name }}</p>
      <p class="font-mono text-xs" :class="{ old: i.viewbox !== '0 0 24 24' }">
        {{ i.viewbox }}
      </p>
    </div>
  </div>
  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark">{{ String('BUTTONS') }}</h3>

    <div
      v-for="color in buttonColorVariants"
      :key="color"
      class="mb-8 space-y-4 border-b pb-6"
    >
      <h4 class="text-2xl font-semibold capitalize">
        {{ String('Color:') }} {{ color }}
      </h4>

      <div
        v-for="size in buttonSizes"
        :key="size"
        class="flex flex-wrap items-center gap-4"
      >
        <Button :color="color" :size="size"
          >{{ String('Default') }} {{ size }}</Button
        >

        <Button :color="color" :size="size" icon-before="plus">
          {{ String('Icon before') }}
        </Button>

        <Button :color="color" :size="size" icon-after="plus">
          {{ String('Icon after') }}
        </Button>

        <Button :color="color" :size="size" :loading="true">
          {{ String('Loading') }}
        </Button>

        <Button :color="color" :size="size" :disabled="true">
          {{ String('Disabled') }}
        </Button>

        <Button :color="color" :size="size" :fullwidth="true">
          {{ String('Fullwidth') }}
        </Button>

        <Button :color="color" :size="size" icon-before="plus" />
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <h3 class="mb-10 mt-20 text-4xl font-bold text-dark">
        {{ String('Radio') }}
      </h3>
      <Radio
        v-for="input in inputVariants"
        :id="input.id"
        :key="input.id"
        v-model="selected"
        name="radio-example"
        :value="input.value"
        >{{ input.value }}</Radio
      >
    </div>
  </div>
  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark">
      {{ String('LINKS') }}
    </h3>
    <LinkButton icon-after="chevron-right" class="mb-5" to="/">{{
      String('View all')
    }}</LinkButton>
    <br />
    <LinkButton
      icon-before="chevron-right"
      external
      color="secondary"
      to="https://google.com"
      >{{ String('Logout') }}</LinkButton
    >
  </div>

  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark">{{ String('Checkbox') }}</h3>
    <div class="flex flex-col gap-5">
      <Checkbox id="hjde" v-model="isChecked1" />
      <Checkbox id="aajkd" v-model="isChecked2" />
      <Checkbox id="sdadadd" v-model="isChecked3">{{
        String('Violet Robbins')
      }}</Checkbox>
    </div>
  </div>

  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark">{{ String('Switches') }}</h3>
    <div class="flex flex-col gap-3">
      <Switch v-model="isEnabledSwitch" disabled>
        <span class="text-gray"> {{ String('Switched on') }} </span>
      </Switch>
      <Switch v-model="isDisabledSwitch">
        <span class="text-gray"> {{ String('Switched off') }} </span>
      </Switch>
    </div>
  </div>
  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark">
      {{ String('Segmented Controls') }}
    </h3>
    <Segment
      v-model="selectedSegment"
      class="max-w-md"
      :options="segmentsOptions"
    />
  </div>

  <div class="mb-20 mt-20">
    <h3 class="text-dark-default mb-10 text-4xl font-bold">
      {{ String('Task statuses') }}
    </h3>

    <div class="flex gap-5">
      <TaskStatus status="to-do" />
      <TaskStatus status="in-progress" />
      <TaskStatus status="in-review" />
      <TaskStatus status="done" />
    </div>
  </div>
  <div class="mb-20 mt-20">
    <h3 class="text-dark-default mb-10 text-4xl font-bold">
      {{ String('Vacation statuses') }}
    </h3>

    <div class="flex gap-5">
      <VacationStatus status="approved" />
      <VacationStatus status="pending" />
    </div>
  </div>

  <div class="mb-20 mt-20">
    <h3 class="text-dark-default mb-10 text-4xl font-bold">
      {{ String('Employees’ level') }}
    </h3>

    <div class="flex gap-5">
      <EmployeeLvl :lvl="1" />
      <EmployeeLvl :lvl="2" />
      <EmployeeLvl :lvl="3" />
    </div>
  </div>

  <div class="mb-20 mt-20">
    <h3 class="text-dark-default mb-10 text-4xl font-bold">
      {{ String('Vacation Indicators') }}
    </h3>

    <div class="flex gap-16">
      <div class="flex flex-col gap-y-5">
        <h4 class="text-lg font-medium text-gray">
          {{ String('Sick Leave') }}
        </h4>
        <VacationIndicator status="approved" indicator="sick" />
        <VacationIndicator status="pending" indicator="sick" />
      </div>

      <div class="flex flex-col gap-y-5">
        <h4 class="text-lg font-medium text-gray">{{ String('Vacation') }}</h4>
        <VacationIndicator status="approved" indicator="vacation" />
        <VacationIndicator status="pending" indicator="vacation" />
      </div>

      <div class="flex flex-col gap-y-5">
        <h4 class="text-lg font-medium text-gray">
          {{ String('Work Remotely') }}
        </h4>
        <VacationIndicator status="approved" indicator="remote" />
        <VacationIndicator status="pending" indicator="remote" />
      </div>
    </div>
  </div>

  <div class="mb-20 mt-20">
    <h3 class="text-dark-default mb-10 text-4xl font-bold">
      {{ String('Inputs') }}
    </h3>

    <div class="grid grid-cols-3 gap-8">
      <!-- Default input -->
      <Input v-model="inputDefault" placeholder="Default input" />

      <!-- Input with icon -->
      <Input v-model="inputIcon" placeholder="With icon" icon="search" />

      <!-- Input with clear button -->
      <Input v-model="inputClear" placeholder="Clearable input" />

      <!-- Password input -->
      <Input v-model="inputPassword" type="password" placeholder="Password">
        <template #topTextLeft>{{ String('Label left') }}</template>
      </Input>

      <!-- Disabled input -->
      <Input v-model="inputDisabled" placeholder="Disabled" disabled>
        <template #topTextLeft>{{ String('Label left') }}</template>
      </Input>

      <!-- Readonly input -->
      <Input v-model="inputReadonly" placeholder="Readonly" readonly
        ><template #topTextLeft>{{ String('Label left') }}</template></Input
      >

      <!-- Input with error -->
      <Input v-model="form.test" placeholder="Error input">
        <template #topTextLeft>{{ String('Label left') }}</template>
        <template v-if="validationErrors.test.message" #errorMessage>
          {{ validationErrors.test.message }}
        </template>
      </Input>

      <!-- Input with top labels -->
      <Input v-model="inputTopLabel">
        <template #topTextLeft>{{ String('Label left') }}</template>
        <template #topTextRight>{{ String('Right info') }}</template>
      </Input>

      <!-- Input with slot button (e.g. submit) -->
      <Input v-model="inputWithButton">
        <template #topTextLeft>{{ String('Label left') }}</template>
        <template #default>
          <Button icon-before="plus">{{ String('Add') }}</Button>
        </template>
      </Input>
    </div>
  </div>

  <div class="mb-20 mt-20">
    <h3 class="text-dark-default mb-10 text-4xl font-bold">
      {{ String('Textarea') }}
    </h3>

    <div class="grid grid-cols-3 gap-8">
      <!-- 1. Default -->
      <Textarea v-model="taDefault" placeholder="Default textarea" />

      <!-- 2. With top labels (left/right) -->
      <Textarea v-model="taWithLabels" placeholder="With top labels">
        <template #topTextLeft>{{ String('Label left') }}</template>
        <template #topTextRight>{{ String('Helper info') }}</template>
      </Textarea>

      <!-- 3. Maxlength + counter -->
      <Textarea
        id="ta-max"
        v-model="taWithMax"
        placeholder="With maxlength + counter"
        :maxlength="120"
        :show-counter="true"
        name="description"
        title="Max 120 chars"
      >
        <template #topTextLeft>{{ String('Description') }}</template>
        <template #topTextRight>{{ String('Max 120') }}</template>
      </Textarea>

      <!-- 4. Disabled -->
      <Textarea v-model="taDisabled" placeholder="Disabled" disabled>
        <template #topTextLeft>{{ String('Disabled field') }}</template>
      </Textarea>

      <!-- 5. Readonly -->
      <Textarea v-model="taReadonly" placeholder="Readonly" readonly>
        <template #topTextLeft>{{ String('Readonly field') }}</template>
      </Textarea>

      <!-- 6. With error -->
      <Textarea id="ta-error" v-model="taWithError" placeholder="With error">
        <template #topTextLeft>{{ String('Validation example') }}</template>
        <template v-if="taErrors.message" #errorMessage>
          {{ taErrors.message }}
        </template>
      </Textarea>

      <!-- 7. Without clear button -->
      <Textarea
        v-model="taNoClear"
        placeholder="No clear button"
        :hide-clear-btn="true"
      >
        <template #topTextLeft>{{ String('No clear') }}</template>
      </Textarea>

      <!-- 8. Prefilled -->
      <Textarea v-model="taPrefilled" placeholder="Prefilled" name="notes">
        <template #topTextLeft>{{ String('Prefilled') }}</template>
      </Textarea>

      <!-- 9. Long text demo -->
      <Textarea v-model="taLong" placeholder="Long content demo">
        <template #topTextLeft>{{ String('Long text') }}</template>
        <template #topTextRight>{{ String('Scrolable') }}</template>
      </Textarea>
    </div>
  </div>

  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark">
      {{ String('User avatar') }}
    </h3>
    <div class="flex gap-24">
      <div class="flex flex-col gap-5">
        <div class="flex items-center gap-5">
          <UserAvatar
            class="bg-primary stroke-primary"
            :occupancy-rate="50"
            size="xl"
            full-name="Петро Петрович"
            image="/images/common/test-image2.png"
          />
          <UserAvatar
            class="bg-primary stroke-primary"
            :occupancy-rate="20"
            size="lg"
            full-name="Кетро Детрович"
            image="/images/common/test-image1.png"
          />
          <UserAvatar
            class="bg-primary stroke-primary"
            :occupancy-rate="70"
            size="md"
            full-name="Еетро Сетрович"
            image="/images/common/test-image1.png"
          />
          <UserAvatar
            class="bg-primary stroke-primary"
            :occupancy-rate="70"
            size="sm"
          />
        </div>
        <div class="flex items-center gap-5">
          <UserAvatar
            class="bg-primary stroke-primary"
            :occupancy-rate="50"
            size="xl"
            full-name="Кетро Петрович"
          />
          <UserAvatar
            class="bg-primary stroke-primary"
            :occupancy-rate="20"
            size="lg"
            full-name="Четро Йетрович"
          />
          <UserAvatar
            class="bg-primary stroke-primary"
            :occupancy-rate="70"
            size="md"
            full-name="Еетро Оетрович"
          />
          <UserAvatar
            class="bg-primary stroke-primary"
            :occupancy-rate="70"
            size="sm"
          />
        </div>
        <div class="flex items-center gap-5">
          <UserAvatar
            class="bg-orange stroke-orange"
            :occupancy-rate="50"
            size="xl"
            full-name="Петро Петрович"
            image="/images/common/test-image2.png"
          />
          <UserAvatar
            class="bg-orange stroke-orange"
            :occupancy-rate="20"
            size="lg"
            full-name="Кетро Детрович"
            image="/images/common/test-image1.png"
          />
          <UserAvatar
            class="bg-orange stroke-orange"
            :occupancy-rate="70"
            size="md"
            full-name="Еетро Сетрович"
            image="/images/common/test-image1.png"
          />
          <UserAvatar
            class="bg-orange stroke-orange"
            :occupancy-rate="70"
            size="sm"
          />
        </div>
        <div class="flex items-center gap-5">
          <UserAvatar
            class="bg-orange stroke-orange"
            :occupancy-rate="50"
            size="xl"
            full-name="Кетро Петрович"
          />
          <UserAvatar
            class="bg-orange stroke-orange"
            :occupancy-rate="20"
            size="lg"
            full-name="Четро Йетрович"
          />
          <UserAvatar
            class="bg-orange stroke-orange"
            :occupancy-rate="70"
            size="md"
            full-name="Еетро Оетрович"
          />
          <UserAvatar
            class="bg-orange stroke-orange"
            :occupancy-rate="70"
            size="sm"
          />
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <div class="flex items-center gap-5">
          <UserAvatar
            class="bg-primary stroke-primary"
            size="xl"
            full-name="Кетро Петрович"
            image="/images/common/test-image2.png"
          />
          <UserAvatar
            class="bg-primary stroke-primary"
            size="lg"
            full-name="Четро Йетрович"
            image="/images/common/test-image1.png"
          />
          <UserAvatar
            class="bg-primary stroke-primary"
            size="md"
            full-name="Еетро Оетрович"
            image="/images/common/test-image1.png"
          />
        </div>
        <div class="flex items-center gap-5">
          <UserAvatar
            class="bg-primary stroke-primary"
            size="xl"
            full-name="Кетро Петрович"
          />
          <UserAvatar
            class="bg-primary stroke-primary"
            size="lg"
            full-name="Четро Йетрович"
          />
          <UserAvatar
            class="bg-primary stroke-primary"
            size="md"
            full-name="Еетро Оетрович"
          />
        </div>
      </div>
    </div>
  </div>
</template>

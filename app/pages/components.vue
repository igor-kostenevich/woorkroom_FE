<script setup lang="ts">
import { colors } from '../../config/colors';
import iconList from '../../config/icon-list.json';
import RequestType from '~/components/common/additional/RequestType.vue';

const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);
const Progress = defineAsyncComponent(() => import('~/UIKit/Progress.vue'));
const Text = defineAsyncComponent(
  () => import('~/components/common/additional/Text.vue')
);
const Position = defineAsyncComponent(
  () => import('~/components/common/additional/Position.vue')
);
const UserInfo = defineAsyncComponent(
  () => import('~/components/common/additional/UserInfo.vue')
);
const Priority = defineAsyncComponent(
  () => import('~/components/common/additional/Priority.vue')
);
const Assignee = defineAsyncComponent(
  () => import('~/components/common/additional/Assignee.vue')
);
const UserCard = defineAsyncComponent(
  () => import('~/components/projects/UserCard.vue')
);
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));
const Segment = defineAsyncComponent(() => import('@/UIKit/Segment.vue'));
const Textarea = defineAsyncComponent(() => import('@/UIKit/Textarea.vue'));
const Radio = defineAsyncComponent(() => import('@/UIKit/Radio.vue'));
const Dropdown = defineAsyncComponent(() => import('@/UIKit/Dropdown.vue'));
const Accordion = defineAsyncComponent(() => import('@/UIKit/Accordion.vue'));
const Autocomplete = defineAsyncComponent(
  () => import('@/UIKit/Autocomplete.vue')
);
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
const selectedSegment1 = ref(0);
const selectedSegment2 = ref(0);
const selectedSegment3 = ref(0);

const segmentsOptions1 = ref([
  {
    id: 1234,
    label: 'List',
  },
  {
    id: 116414,
    label: 'Activity',
  },
]);
const segmentsOptions2 = ref([
  {
    id: 1346141,
    label: 'Employees’ vacations',
  },
  {
    id: 134,
    label: 'Calendar',
  },
]);
const segmentsOptions3 = ref([
  {
    id: 1346,
    label: 'Projects',
  },
  {
    id: 456,
    label: 'Team',
  },
  {
    id: 548,
    label: 'My vacations',
  },
]);

interface User {
  id: number;
  name: string;
  email: string;
}
const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@acme.io' },
  { id: 2, name: 'Bob Martin', email: 'bob@acme.io' },
  { id: 3, name: 'Carlos Hernández', email: 'carlos@acme.io' },
  { id: 4, name: 'Diana Kim', email: 'diana@acme.io' },
  { id: 5, name: 'Ethan Brown', email: 'ethan@acme.io' },
  { id: 6, name: 'Fatima Noor', email: 'fatima@acme.io' },
  { id: 7, name: 'George Liu', email: 'george@acme.io' },
  { id: 8, name: 'Hanna Petrenko', email: 'h.petrenko@acme.io' },
  { id: 9, name: 'Igor Kostenevych', email: 'igor@acme.io' },
  { id: 10, name: 'Jae Park', email: 'jae@acme.io' },
  { id: 11, name: 'Katarina Novak', email: 'katarina@acme.io' },
  { id: 12, name: 'Luca Bianchi', email: 'luca@acme.io' },
];

const acSelected = ref<number | null>(null);
const acSelectedAsync = ref<number | null>(null);
const acLocal = mockUsers;

const searchUsers = async (q: string) => {
  const ql = q.trim().toLowerCase();
  // emulate network latency
  await new Promise((r) => setTimeout(r, 300));
  return mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(ql) || u.email.toLowerCase().includes(ql)
  );
};

const ddIndexDefault = ref<number | null>(null);
const ddIndexSearch = ref<number | null>(null);
const ddIndexDisabled = ref<number | null>(0);
const ddIndexMd = ref<number | null>(null);
const ddIndexFull = ref<number | null>(null);

type DDOption = {
  label: string;
  icon?: string;
  disabled?: boolean;
  code?: string;
  image?: string;
};
const ddOptions: DDOption[] = [
  { label: 'United States', code: 'US', image: '/images/common/woman.png' },
  { label: 'Germany', icon: 'checked', code: 'DE' },
  { label: 'Ukraine', icon: 'checked', code: 'UA' },
  { label: 'Japan', icon: 'checked', code: 'JP', disabled: true },
  { label: 'Spain', icon: 'checked', code: 'ES' },
];

type InfoConfig = {
  is: Component;
  props?: Record<string, any>;
  children?: any;
};
type AccordionItem = {
  title: string;
  icon?: string;
  info: string | InfoConfig;
};
const accordionItems: AccordionItem[] = [
  {
    title: 'What is your refund policy?',
    info: 'Refunds are processed within 5–7 business days after approval.',
  },
  {
    title: 'Try free',
    info: {
      is: Button,
      props: { color: 'primary', size: 'md', iconBefore: 'plus' },
      children: 'Start',
    },
  },
  {
    title: 'Do you offer support?',
    info: 'We provide email and chat support on business days, 9:00–18:00.',
    icon: 'notifications',
  },
  {
    title: 'Is there a trial period?',
    info: 'There is a 14-day free trial with full functionality.',
    icon: 'support',
  },
  {
    title: 'How do I cancel?',
    info: 'Go to Billing → Manage → Cancel subscription. Your access remains until the end of the billing period.',
    icon: 'support',
  },
  {
    title: 'Is my data secure?',
    info: 'We use HTTPS, daily backups, and role-based access controls.',
    icon: 'support',
  },
];

const { showModal } = useModal();

const userAvatarData = [
  {
    id: '1',
    userImage: '/images/common/woman.png',
    fullName: 'Oscar Holloway',
  },
  {
    id: '2',
    fullName: 'Shawn Stone',
  },
  {
    id: '3',
    userImage: '/images/common/woman.png',
    fullName: 'Oscar Holloway',
  },
  {
    id: '4',
    userImage: '/images/common/woman.png',
    fullName: 'Oscar Holloway',
  },
  {
    id: '5',
    userImage: '/images/common/woman.png',
    fullName: 'Oscar Holloway',
  },
  {
    id: '6',
    userImage: '/images/common/woman.png',
    fullName: 'Oscar Holloway',
  },
  {
    id: '7',
    userImage: '/images/common/woman.png',
    fullName: 'Oscar Holloway',
  },
  {
    id: '8',
    userImage: '/images/common/woman.png',
    fullName: 'Oscar Holloway',
  },
  {
    id: '9',
    userImage: '/images/common/woman.png',
    fullName: 'Oscar Holloway',
  },
  {
    id: '10',
    userImage: '/images/common/woman.png',
    fullName: 'Oscar Holloway',
  },
];

const testCardData = [
  {
    componentName: UserInfo,
    data: {
      userImage: '/images/common/woman.png',
      fullName: 'Oscar Holloway',
      userEmail: 'evanyates@gmail.com',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.gender',
      text: 'Male',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.birthday',
      text: 'Apr 12, 1995',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.age',
      text: '25',
    },
  },
  {
    componentName: Position,
    data: {
      positionName: 'UI/UX Designer',
      positionLevel: 2,
    },
  },
];
const testCardData1 = [
  {
    componentName: UserInfo,
    data: {
      userImage: '/images/common/woman.png',
      fullName: 'Oscar ',
      userEmail: 'evanyates@gmailqfqrqferferfq.com',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.gender',
      text: 'Female',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.birthday',
      text: 'Apr 12, 2001 23423',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.age',
      text: '93 234',
    },
  },
  {
    componentName: Position,
    data: {
      positionName: 'UI/UX Designera wg wvf erhah caah',
      positionLevel: 1,
    },
  },
];
const testCardData2 = [
  {
    componentName: UserInfo,
    data: {
      userImage: '/images/common/woman.png',
      fullName: 'Evanwerwrwgwwg Yatesqergregwer',
      userEmail: 'evanyates@gmailqfqrqferferfq.com',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.vacations',
      text: '15',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.sickLeave',
      text: '3',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.remotely',
      text: '25',
    },
  },
];
const testCardData3 = [
  {
    componentName: Text,
    data: {
      label: 'additional.taskName',
      text: 'Research',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.estimate',
      text: '2d 4h',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.spentTime',
      text: '1d 2h',
    },
  },
  {
    componentName: Assignee,
    data: {
      userAvatarData: [
        {
          id: '3',
          userImage: '/images/common/woman.png',
          fullName: 'Oscar Holloway',
        },
        {
          id: '4',
          userImage: '/images/common/woman.png',
          fullName: 'Oscar Holloway',
        },
        {
          id: '5',
          userImage: '/images/common/woman.png',
          fullName: 'Oscar Holloway',
        },
      ],
      max: 4,
    },
  },
  {
    componentName: Priority,
    data: {
      priority: 'medium',
    },
  },
  {
    componentName: TaskStatus,
    data: {
      status: 'in-review',
    },
  },
];
const testCardData4 = [
  {
    componentName: Text,
    data: {
      label: 'additional.taskName',
      text: 'Animation for buttons',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.estimate',
      text: '7d 2h',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.spentTime',
      text: '124514 2h',
    },
  },
  {
    componentName: Assignee,
    data: {
      userAvatarData: [
        {
          id: '3',
          userImage: '/images/common/woman.png',
          fullName: 'Oscar Holloway',
        },
        {
          id: '4',
          userImage: '/images/common/woman.png',
          fullName: 'Oscar Holloway',
        },
        {
          id: '5',
          userImage: '/images/common/woman.png',
          fullName: 'Oscar Holloway',
        },
      ],
      max: 4,
    },
  },
  {
    componentName: Priority,
    data: {
      priority: 'medium',
    },
  },
];
const testCardData5 = [
  {
    componentName: Text,
    data: {
      status: 'pending',
      indicator: 'sick',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.duration',
      text: '3 days',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.startDay',
      text: 'Sep 13, 2020',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.endDay',
      text: 'Sep 16, 2020',
    },
  },
  {
    componentName: VacationStatus,
    data: {
      status: 'pending',
    },
  },
];

const testCardData6 = [
  {
    componentName: UserInfo,
    data: {
      userImage: '/images/common/woman.png',
      fullName: 'Oscar H',
      userEmail: 'evanyates.com',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.gender',
      text: 'female',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.birthday',
      text: 'Apr 12, 1995 iuhib ihbhb ',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.age',
      text: '25 bj vcytybb ',
    },
  },
  {
    componentName: Position,
    data: {
      positionName: 'UI/UX Desiknjn kjnk gner',
      positionLevel: 2,
    },
  },
];

const testCardData7 = [
  {
    componentName: Text,
    data: {
      label: 'additional.taskName',
      text: 'Researc erfe rf ererf ref h',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.estimate',
      text: '2d 4hq  qfrfqe rfqe rf q',
    },
  },
  {
    componentName: Text,
    data: {
      label: 'additional.spentTime',
      text: '1d 2h qer fqef qerfq qerf eqrf ',
    },
  },
  {
    componentName: Assignee,
    data: {
      userAvatarData: [
        {
          id: '3',
          userImage: '/images/common/woman.png',
          fullName: 'Oscar Holloway',
        },
        {
          id: '4',
          userImage: '/images/common/woman.png',
          fullName: 'Oscar Holloway',
        },
        {
          id: '5',
          fullName: 'Oscar Holloway',
          userImage: '/images/common/woman.png',
        },
        {
          id: '6',
          fullName: 'Oscar Holloway',
          userImage: '/images/common/woman.png',
        },
        {
          id: '7',
          fullName: 'Oscar Holloway',
        },
        {
          id: '8',
          fullName: 'Oscar Holloway',
        },
        {
          id: '9',
          fullName: 'Oscar Holloway',
          userImage: '/images/common/woman.png',
        },
        {
          id: '10',
          fullName: 'Oscar Holloway',
        },
      ],
      max: 9,
    },
  },
  {
    componentName: Priority,
    data: {
      priority: 'high',
    },
  },
  {
    componentName: TaskStatus,
    data: {
      status: 'to-do',
    },
  },
];
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
    <div class="flex flex-col gap-8">
      <Segment
        v-model="selectedSegment1"
        class="max-w-80"
        :options="segmentsOptions1"
        query-key="tabList"
      />
      <Segment
        v-model="selectedSegment2"
        class="max-w-sm"
        :options="segmentsOptions2"
        query-key="tabVacations"
      />
      <Segment
        v-model="selectedSegment3"
        class="max-w-md"
        :options="segmentsOptions3"
        query-key="tabProjects"
      />
    </div>
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
            :progress="50"
            size="xl"
            full-name="Петро Петрович"
            image="/images/common/woman.png"
          />
          <UserAvatar
            :progress="20"
            size="lg"
            full-name="Кетро Детрович"
            image="/images/common/woman.png"
          />
          <UserAvatar
            :progress="70"
            size="md"
            full-name="Еетро Сетрович"
            image="/images/common/woman.png"
          />
          <Progress size="sm" :progress="90" />
        </div>
        <div class="flex items-center gap-5">
          <UserAvatar :progress="50" size="xl" full-name="Кетро Петрович" />
          <UserAvatar :progress="20" size="lg" full-name="Четро Йетрович" />
          <UserAvatar :progress="70" size="md" full-name="Еетро Оетрович" />
          <Progress size="sm" :progress="90" />
        </div>
        <div class="flex items-center gap-5">
          <UserAvatar
            :progress="50"
            size="xl"
            full-name="Петро Петрович"
            image="/images/common/woman.png"
            color="yellow"
          />
          <UserAvatar
            :progress="20"
            size="lg"
            full-name="Кетро Детрович"
            image="/images/common/woman.png"
            color="yellow"
          />
          <UserAvatar
            :progress="70"
            size="md"
            full-name="Еетро Сетрович"
            image="/images/common/woman.png"
            color="yellow"
          />
          <Progress size="sm" :progress="90" />
        </div>
        <div class="flex items-center gap-5">
          <UserAvatar
            :progress="50"
            size="xl"
            full-name="Кетро Петрович"
            color="yellow"
          />
          <UserAvatar
            :progress="20"
            size="lg"
            full-name="Четро Йетрович"
            color="yellow"
          />
          <UserAvatar
            :progress="70"
            size="md"
            full-name="Еетро Оетрович"
            color="yellow"
          />
          <Progress size="sm" :progress="90" />
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <div class="flex items-center gap-5">
          <UserAvatar
            size="xl"
            full-name="Кетро Петрович"
            image="/images/common/woman.png"
          />
          <UserAvatar
            size="lg"
            full-name="Четро Йетрович"
            image="/images/common/woman.png"
          />
          <UserAvatar
            size="md"
            full-name="Еетро Оетрович"
            image="/images/common/woman.png"
          />
          <UserAvatar
            size="sm"
            full-name="Еетро Оетрович"
            image="/images/common/woman.png"
          />
        </div>
        <div class="flex items-center gap-5">
          <UserAvatar size="xl" full-name="Кетро Петрович" />
          <UserAvatar size="lg" full-name="Четро Йетрович" />
          <UserAvatar size="md" full-name="Еетро Оетрович" />
          <UserAvatar size="sm" full-name="Еетро Оетрович" />
        </div>
        <div class="flex items-center gap-5">
          <Progress size="xl" :progress="30" color="blue">12</Progress>
          <Progress size="xl" :progress="60" color="red">6</Progress>
          <Progress size="xl" :progress="90" color="violet">58</Progress>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-20 mt-20">
    <h3 class="text-dark-default mb-10 text-4xl font-bold">
      {{ String('Autocomplete') }}
    </h3>
    <div class="grid grid-cols-3 gap-8">
      <!-- 1) Local options -->
      <Autocomplete
        v-model="acSelected"
        :options="acLocal"
        :get-label="(u: any) => u.name"
        :get-value="(u: any) => u.id"
        icon="search"
        placeholder="Local options"
      />

      <!-- 2) Async search with @vueuse/core debounce inside component -->
      <Autocomplete
        v-model="acSelectedAsync"
        :search="searchUsers"
        :get-label="(u: any) => u.name"
        :get-value="(u: any) => u.id"
        :min-chars="1"
        :debounce="250"
        icon="search"
        placeholder="Async search (type to search)"
      />

      <!-- Selected values preview -->
      <div
        class="rounded-[14px] border bg-gray-50 p-4 text-sm leading-6 text-gray"
      >
        <div>
          {{ String('Selected (local):') }}
          <span class="font-mono text-dark">{{
            String(acSelected ?? 'null')
          }}</span>
        </div>
        <div>
          {{ String('Selected (async):') }}
          <span class="font-mono text-dark">{{
            String(acSelectedAsync ?? 'null')
          }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- DROPDOWNS -->
  <div class="mb-24 mt-32">
    <h3 class="text-dark-default mb-10 text-4xl font-bold">
      {{ String('Dropdowns') }}
    </h3>

    <div class="grid grid-cols-3 gap-8">
      <!-- 1) Базовий -->
      <Dropdown
        v-model="ddIndexDefault"
        :options="ddOptions"
        label-field="label"
        placeholder="Select country"
      />

      <!-- 2) З пошуком по label (desktop — інпут в триггері; mobile — в панелі) -->
      <Dropdown
        v-model="ddIndexSearch"
        :options="ddOptions"
        label-field="label"
        search-field="label"
        placeholder="Search country"
      />

      <Dropdown
        v-model="ddIndexDisabled"
        :options="ddOptions"
        label-field="label"
        placeholder="Disabled"
        disabled
      />

      <Dropdown
        v-model="ddIndexMd"
        :options="ddOptions"
        label-field="label"
        placeholder="Size: md"
        size="md"
      >
        <template #label>
          {{ String('Select country') }}
        </template>
      </Dropdown>

      <div>
        <Dropdown
          v-model="ddIndexFull"
          :options="ddOptions"
          label-field="label"
          placeholder="Choose..."
          :fullwidth="true"
        >
          <template #label>
            {{ String('Select country') }}
          </template>
        </Dropdown>
      </div>

      <Dropdown
        v-model="ddIndexDefault"
        :options="ddOptions"
        label-field="label"
        placeholder="Custom option template"
      >
        <template #label>
          {{ String('Select country') }}
        </template>
        <template #option="{ option, index }">
          <Icon v-if="option.icon" :type="option.icon" :size="20" />
          <span
            class="flex-1 truncate"
            :class="
              ddIndexDefault === ddOptions.indexOf(option)
                ? 'text-black'
                : 'text-gray-600'
            "
          >
            {{ index + 1 }}. {{ option.label }}
          </span>
          <Icon
            v-if="ddIndexDefault === ddOptions.indexOf(option)"
            type="checked"
          />
        </template>
      </Dropdown>
    </div>

    <div
      class="mt-6 rounded-[14px] border bg-gray-50 p-4 text-sm leading-6 text-gray"
    >
      <div>
        {{ String('Selected (basic):') }}
        <span class="font-mono text-dark">{{
          String(ddIndexDefault ?? 'null')
        }}</span>
      </div>
      <div>
        {{ String('Selected (search):') }}
        <span class="font-mono text-dark">{{
          String(ddIndexSearch ?? 'null')
        }}</span>
      </div>
      <div>
        {{ String('Selected (md):') }}
        <span class="font-mono text-dark">{{
          String(ddIndexMd ?? 'null')
        }}</span>
      </div>
      <div>
        {{ String('Selected (fullwidth):') }}
        <span class="font-mono text-dark">{{
          String(ddIndexFull ?? 'null')
        }}</span>
      </div>
    </div>
  </div>

  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark">
      {{ String('Accordion') }}
    </h3>

    <div class="grid gap-8 md:grid-cols-2">
      <Accordion :items="accordionItems" />
    </div>
  </div>

  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark">
      {{ String('Modal') }}
    </h3>

    <div class="">
      <Button
        color="primary"
        fullwidth
        @click="
          showModal({
            name: 'Example',
            data: { tab: 0, testData: 'Hello from components page!' },
          })
        "
        >{{ String('Open modal') }}</Button
      >
    </div>
  </div>
  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark">
      {{ String('Additional components for cards') }}
    </h3>
    <div class="flex gap-12">
      <Text :label="$t('additional.text.gender')" :text="String('Male')" />
      <Position position-name="UI/UX Designer" :position-level="2" />
      <UserInfo
        user-image="/images/common/woman.png"
        full-name="Петро Петрович"
        user-email="evanyates@gmail.com"
        :progress="32"
      />
      <Priority priority="high" />
      <Assignee :user-avatar-data="userAvatarData" :max="4" />
      <RequestType show-label />
    </div>
  </div>

  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark">
      {{ String('Cards') }}
    </h3>
    <div class="flex flex-col gap-9 md:overflow-x-scroll md:pb-5">
      <UserCard :gap="131" :card-data="testCardData" is-button />
      <UserCard :gap="131" :card-data="testCardData1" is-button />

      <UserCard :gap="131" :card-data="testCardData6" is-button />

      <UserCard :gap="400" :card-data="testCardData2" :is-button="false" />
      <UserCard :gap="131" :card-data="testCardData3" :is-button="false" />
      <UserCard :gap="131" :card-data="testCardData7" :is-button="false" />
      <UserCard :gap="131" :card-data="testCardData4" :is-button="false" />
      <UserCard :gap="131" :card-data="testCardData5" :is-button="false" />
    </div>
  </div>
</template>

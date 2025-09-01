import { MODALS_WITH_QUERY, MODLALS_AFTER_LOGIN } from '@/config/modal';
import type { IModalOptions, IModal } from '@/types/composables';
import { useAppCookie } from '@/composables/useAppCookie';

const openedModals = ref<Required<IModal>[]>([]);
const queuedModals = shallowRef<Required<IModal>[]>([]);

const defaultModalOptions = {
  closable: true,
  closePrevModals: false,
  addToQueue: false,
  closeWhenRouteChanges: true,
  showSteps: false,
};

export default function useModal() {
  const router = useRouter();
  const route = useRoute();
  const { removeQueryParam } = useQueryParam();
  const { getToken } = useAppCookie();

  async function showModal(modal: IModal) {
    const options: Required<IModalOptions> = {
      ...defaultModalOptions,
      ...modal.options,
    };

    if (MODLALS_AFTER_LOGIN.includes(modal.name) && !getToken()) {
      localStorage.setItem(
        'modalInQueue',
        JSON.stringify({
          name: modal.name,
          data: modal.data || {},
          options: { ...options, closePrevModals: true },
        })
      );

      // await showModal({ name: 'Auth', data: { tab: 'signup' } }); // if login in modal
      return;
    }

    // Avoid reopening the same modal if it's already open.
    if (openedModals.value.some((m) => m.name === modal.name)) {
      return;
    }

    // Close all previously opened modals
    if (options.closePrevModals) {
      openedModals.value.length = 0;
    }

    // Add a module to the queue instead of opening it
    if (options.addToQueue && openedModals.value.length) {
      queuedModals.value.push({
        name: modal.name,
        data: modal.data || {},
        options,
      });

      return;
    }

    openedModals.value.push({
      name: modal.name,
      data: modal.data || {},
      options,
    });

    // Add the "modal" query parameter only for the first opened window
    const addQuery = MODALS_WITH_QUERY.includes(modal.name);

    if (addQuery && openedModals.value.length === 1) {
      const newQuery: Record<string, string> = {
        ...route.query,
        modal: modal.name,
      };

      if (modal.data && Object.values(modal.data)?.length) {
        newQuery.data = Object.entries(modal.data)
          .map(([key, value]) => `${key}-${String(value)}`)
          .join('+');
      } else {
        delete newQuery.data;
      }

      await router.replace({ query: newQuery });
    }
  }

  async function hideModal(all: boolean = false) {
    if (all) {
      openedModals.value = [];
    } else {
      openedModals.value.pop();
    }

    const newQuery = route.query;

    if (newQuery.modal && !openedModals.value.length) {
      await removeQueryParam('modal');
      await removeQueryParam('data');
    }

    if (queuedModals.value.length && !openedModals.value.length) {
      const modalFromQueue = queuedModals.value.shift()!;

      delete modalFromQueue.options.addToQueue;
      delete modalFromQueue.options.closePrevModals;

      await showModal(modalFromQueue);
    }
  }

  /**
   * Opens a modal if a query parameter "modal" exists
   */
  function openModalByQuery() {
    const { modal: modalName } = route.query;
    const isString = typeof modalName === 'string';

    if (isString && MODALS_WITH_QUERY.includes(modalName)) {
      const data: Record<string, string> = {};

      // ❗️Don't open modal Auth by query if token exist
      if (modalName === 'Auth' && getToken()) {
        const query = { ...route.query };

        delete query.modal;
        delete query.data;

        void router.replace({ query });

        return;
      }

      if (route.query.data && typeof route.query.data === 'string') {
        const dataString = decodeURIComponent(route.query.data);
        const dataProperties = dataString.split('+');

        for (const property of dataProperties) {
          const [name, value] = property.split('-');
          if (name && value) {
            data[name] = value;
          }
        }
      }

      void showModal({ name: modalName, data });
    }
  }

  async function openModalAfterAuth() {
    const modalInQueue = localStorage.getItem('modalInQueue');
    if (!modalInQueue) return;

    localStorage.removeItem('modalInQueue');

    try {
      const modalObject = JSON.parse(modalInQueue);
      if (modalObject?.name) {
        const { name, data, options } = modalObject;
        await hideModal(true);
        await nextTick(() => {
          showModal({ name, data, options });
        });
      }
    } catch (e) {
      console.error('Failed to parse or open modal from queue', e);
    }
  }

  return {
    showModal,
    hideModal,

    openedModals,
    openModalByQuery,
    openModalAfterAuth,
  };
}

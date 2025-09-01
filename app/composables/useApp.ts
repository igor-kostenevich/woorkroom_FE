import { useDebounceFn } from '@vueuse/core';
import type { IBrowser, IOS, IDevice } from 'ua-parser-js';

const appInitialized = shallowRef(false);

const isAppFullyLoaded = ref<boolean>(false); // Tracks whether the application is fully loaded
const isAppInFocus = ref<boolean>(true); // Tracks whether the page is currently active/visible
const windowWidth = ref<number>(360); // Stores the current window width

// These breakpoints
const MOBILE_MENU_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

let resizeObserver: ResizeObserver;
const containerWidth = ref<number>(360);

const DEBOUNCE_DELAY_MS = 250;

interface IDeviceInfo {
  os: IOS; // iOS | Android
  browser: IBrowser;
  device: IDevice;
}
const device = ref<IDeviceInfo>();

export default function useApp() {
  function initApp() {
    if (!appInitialized.value) {
      /** Listen for changes in the document's ready state */
      document.addEventListener('readystatechange', () => {
        isAppFullyLoaded.value = document.readyState === 'complete';
      });
      isAppFullyLoaded.value = document.readyState === 'complete';

      /** Listen for visibility changes (e.g., when the user switches tabs) */
      document.addEventListener('visibilitychange', () => {
        isAppInFocus.value = !document.hidden;
      });
      isAppInFocus.value = !document.hidden;

      /** Listen for window resize events and update windowWidth */
      window.addEventListener(
        'resize',
        useDebounceFn(() => {
          windowWidth.value = window.innerWidth;
        }, DEBOUNCE_DELAY_MS)
      );
      windowWidth.value = window.innerWidth;

      // Track changes .container size
      const contentEl = document?.getElementById('js-content');

      if (contentEl) {
        containerWidth.value = contentEl.getBoundingClientRect().width;

        const updateSize = useDebounceFn((entry: ResizeObserverEntry) => {
          containerWidth.value = entry.contentRect.width;
        }, DEBOUNCE_DELAY_MS);

        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            void updateSize(entry);
          }
        });

        resizeObserver.observe(contentEl);
      }

      appInitialized.value = true;
    }
  }

  async function parseUserAgent() {
    const { data } = await useFetch<IDeviceInfo>('/parse-user-agent');

    device.value = data.value;
  }

  const isMobileContainer = computed(() => {
    return containerWidth.value < TABLET_BREAKPOINT;
  });
  const isTabletContainer = computed(() => {
    return (
      containerWidth.value >= TABLET_BREAKPOINT &&
      containerWidth.value < DESKTOP_BREAKPOINT
    );
  });
  const isDesktopContainer = computed(() => {
    return containerWidth.value >= DESKTOP_BREAKPOINT;
  });

  const isTouchDevice = computed(() => {
    const deviceType = device.value?.device?.type;

    return deviceType === 'mobile' || deviceType === 'tablet' || false;
  });

  const isMobile = computed(() => {
    return windowWidth.value < TABLET_BREAKPOINT;
  });
  const isTablet = computed(() => {
    return (
      windowWidth.value >= TABLET_BREAKPOINT &&
      windowWidth.value < DESKTOP_BREAKPOINT
    );
  });
  const isDesktop = computed(() => {
    return windowWidth.value >= DESKTOP_BREAKPOINT;
  });

  const hasMobileMenu = computed(() => {
    return windowWidth.value < MOBILE_MENU_BREAKPOINT;
  });

  return {
    initApp,

    isAppFullyLoaded,
    windowWidth,
    containerWidth,
    isAppInFocus,

    isMobileContainer,
    isTabletContainer,
    isDesktopContainer,

    isMobile,
    isTablet,
    isDesktop,
    hasMobileMenu,

    // UserAgent
    parseUserAgent,
    device,
    isTouchDevice,
  };
}

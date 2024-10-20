import {onBeforeUnmount, onMounted, type Ref, ref} from "vue";

export function useIsMobile(): { isMobile: Ref<boolean> } {
  const isMobile = ref(false);

  const checkScreenSize = () => {
    isMobile.value = window.matchMedia("(max-width: 1024px)").matches;
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", checkScreenSize);
  });
  return { isMobile }
}

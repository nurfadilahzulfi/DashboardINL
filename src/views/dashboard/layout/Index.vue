<script setup>
// import AppTopbar from '@/layout/AppTopbar.vue';
// import AppFooter from '@/views/dashboard/layout/components/AppFooter.vue';
// import AppTopbar from '@/views/dashboard/layout/components/AppTopbar.vue';
import TopBar from '@/views/dashboard/layout/components/TopBar.vue';
import { useLayout } from '@/views/dashboard/layout/components/layout';
// import TopBar from '@/views/dashboard/layout/components/TopBar.vue';
import { computed, onMounted, ref, watch } from 'vue';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    };
});

function bindOutsideClickListener() {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive = false;
                layoutState.staticMenuMobileActive = false;
                layoutState.menuHoverActive = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

function unbindOutsideClickListener() {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
}

onMounted(() => {});

const updateDates = (dates) => {
    console.log('Updated Dates:', dates);
};
</script>

<template>
    <div class="flex flex-col gap-2 layout-scroller bg-neutral-950 min-h-screen text-white app-dark" :class="containerClass">
        <top-bar :onDateChange="updateDates"></top-bar>
        <div class="px-4 pt-2">
            <!-- <div class="layout-main-container"> -->
            <div class="layout-main">
                <router-view></router-view>
            </div>
            <!-- <app-footer /> -->
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
</template>

<style>
.layout-scroller {
    max-height: 100vh; /* Batasi tinggi maksimal */
    overflow-y: scroll; /* Scroll tetap aktif */
    scrollbar-width: none; /* Sembunyikan scrollbar di Firefox */
}

.layout-scroller::-webkit-scrollbar {
    display: none; /* Sembunyikan scrollbar di Chrome, Safari, dan Edge */
}
</style>

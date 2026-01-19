<script setup>
import { computed, defineProps } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    datas: {
        type: Object,
        default: () => ({ categories: [], actual: [], prediction: [] })
    },
    loading: {
        type: String,
        default: ''
    }
});

// Konfigurasi Grafik
const chartOptions = computed(() => ({
    chart: {
        id: 'cpo-prediction-chart',
        type: 'line',
        toolbar: { show: false },
        animations: { enabled: true },
        background: 'transparent',
    },
    theme: {
        mode: 'dark'
    },
    colors: ['#3B82F6', '#EF4444'], // Biru untuk Aktual, Merah untuk Prediksi
    stroke: {
        width: [3, 3],
        curve: 'smooth',
        dashArray: [0, 8] // Garis kedua (prediksi) dibuat putus-putus
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: { colors: '#fff' }
    },
    xaxis: {
        categories: props.datas.categories || [],
        labels: {
            style: { colors: '#9ca3af', fontSize: '10px' },
            rotate: -45,
            trim: true
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
    },
    yaxis: {
        labels: {
            style: { colors: '#9ca3af' },
            formatter: (val) => val ? `Rp ${val.toLocaleString('id-ID')}` : ''
        }
    },
    tooltip: {
        theme: 'dark',
        x: { show: true },
        y: {
            formatter: (val) => `Rp ${val?.toLocaleString('id-ID')}`
        }
    },
    grid: {
        borderColor: '#334155',
        strokeDashArray: 4,
    },
    markers: {
        size: [0, 4], // Titik kecil hanya muncul di garis prediksi
        hover: { size: 6 }
    }
}));

// Data Seri untuk Grafik
const series = computed(() => [
    {
        name: 'Harga Aktual (Market)',
        data: props.datas.actual || []
    },
    {
        name: 'Prediksi AI (Future)',
        data: props.datas.prediction || []
    }
]);
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div v-if="loading === 'loading'" class="flex flex-col items-center gap-3">
            <i class="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
            <p class="text-xs text-neutral-400 font-mono animate-pulse">AI sedang menganalisis pasar...</p>
        </div>

        <div v-else-if="loading === 'error' || !props.datas.categories?.length" class="flex flex-col items-center gap-2">
            <i class="pi pi-exclamation-triangle text-3xl text-amber-500"></i>
            <p class="text-xs text-neutral-400">Data prediksi tidak tersedia</p>
        </div>

        <div v-else class="w-full h-full">
            <VueApexCharts
                width="100%"
                height="100%"
                :options="chartOptions"
                :series="series"
            />
        </div>
    </div>
</template>

<style scoped>
/* Pastikan container chart memenuhi area */
:deep(.apexcharts-canvas) {
    margin: 0 auto;
}
</style>
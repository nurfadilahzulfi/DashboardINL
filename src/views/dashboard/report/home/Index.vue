<script setup>
import TopBar from '@/views/dashboard/layout/components/TopBar.vue';
import { marked } from 'marked'; // Pastikan sudah: npm install marked
import moment from 'moment';
import { nextTick, onMounted, ref } from 'vue';

// --- 1. IMPORT KOMPONEN GRAFIK PREDIKSI ---
import PredictionCpoChart from '@/views/dashboard/report/harga/components/PredictionCpoChart.vue';

// Controller
import { chatStreamAI } from '@/controller/getApiFromAI/chatbotController';
import financeHomeController from '@/controller/home/controllerHomePage/financeHomeController';
import operationHomeController from '@/controller/home/controllerHomePage/operationHomeController';
import salesHomeController from '@/controller/home/controllerHomePage/salesHomeController';
import sdmHomeController from '@/controller/home/controllerHomePage/sdmHomeController';
import supplyChainHomeController from '@/controller/home/controllerHomePage/supplyChainHomeController';

// Components UI (Pastikan Path ini benar di folder kamu)
import CashBalanceFinance from '@/views/dashboard/report/finance/components/CashBalanceFinance.vue';
import CashFlowMovementFinance from '@/views/dashboard/report/finance/components/CashFlowMovementFinance.vue';
import EbitdaMarginFinance from '@/views/dashboard/report/finance/components/EbitdaMarginFinance.vue';
import GrossProfitMarginFinance from '@/views/dashboard/report/finance/components/GrossProfitMarginFinance.vue';
import KursFinance from '@/views/dashboard/report/finance/components/KursFinance.vue';
import RevenueFinance from '@/views/dashboard/report/finance/components/RevenueFinance.vue';
import ImagesHome from '@/views/dashboard/report/home/components/ImagesHome.vue';
import CpoOlahOperation from '@/views/dashboard/report/operation/components/CpoOlahOperation.vue';
import LaporanProduksiOperation from '@/views/dashboard/report/operation/components/LaporanProduksiOperation.vue';
import SdmView from '@/views/dashboard/report/others/SdmView.vue';
import LaporanPackaging from '@/views/dashboard/report/packaging/components/LaporanPackaging.vue';
import QtyPenjualanBulkSales from '@/views/dashboard/report/sales/components/QtyPenjualanBulkSales.vue';
import QtyPenjualanRitelSales from '@/views/dashboard/report/sales/components/QtyPenjualanRitelSales.vue';
import StokBulkSupplyChain from '@/views/dashboard/report/scm/components/StokBulkSupplyChain.vue';
import StokCpoSupplyChain from '@/views/dashboard/report/scm/components/StokCpoSupplyChain.vue';
import StokRitelSupplyChain from '@/views/dashboard/report/scm/components/StokRitelSupplyChain.vue';

// --- STATE MANAGEMENT ---
const activePage = ref(0);
const formData = ref({
    idPmg: 1, idMataUang: 1, idPackaging: 1,
    tanggalAwal: moment().format('YYYY-MM-01'),
    tanggalAkhir: moment().format('YYYY-MM-DD')
});

// Data State Dashboard
const dataRevenue = ref({});
const dataCbDanCfm = ref({});
const dataPaySchedule = ref({});
const dataCpoKpbn = ref({});
const dataKurs = ref({});
const dataHargaSpotInvBulk = ref([]);
const dataHargaSpotInvRitel = ref([]);
const dataCpoOlah = ref({});
const dataLaporanProduksi = ref([]);
const dataLaporanMaterial = ref([]);
const dataLaporanPackaging = ref([]);
const dataPenjualanBulk = ref({});
const dataPenjualanRitel = ref({});
const dataSDM = ref({});
const dataSaldoPe = ref({});
const dataStockBulk = ref([]);
const dataStockRetail = ref([]);
const dataActualIncoming = ref({});
const dataOutstanding = ref({});
const dataStockCpo = ref({});
const dataMarketReuters = ref({});

// --- STATE DATA PREDIKSI AI ---
const dataPredictionAI = ref({ categories: [], actual: [], prediction: [] });
const loadingPredictionAI = ref('');

// --- CHATBOT LOGIC ---
const isChatOpen = ref(false);
const isChatLoading = ref(false);
const chatInput = ref('');
const chatScrollRef = ref(null);
const chatMessages = ref([
    { id: 1, text: 'Halo! Saya **Sobat INL AI**. Siap membantu analisis data operasional dan prediksi harga CPO.', isUser: false }
]);

const formatMessage = (text) => {
    if (!text) return "";
    try { return marked.parse(text); } catch { return text; }
};

const scrollToBottom = () => {
    nextTick(() => {
        if (chatScrollRef.value) chatScrollRef.value.scrollTop = chatScrollRef.value.scrollHeight;
    });
};

const toggleChat = () => {
    isChatOpen.value = !isChatOpen.value;
    if (isChatOpen.value) scrollToBottom();
};

const sendChatMessage = async () => {
    if (!chatInput.value.trim() || isChatLoading.value) return;
    const userText = chatInput.value;
    chatMessages.value.push({ id: Date.now(), text: userText, isUser: true });
    chatInput.value = '';
    isChatLoading.value = true;
    scrollToBottom();

    const botMsgIndex = chatMessages.value.push({ id: Date.now() + 1, text: '', isUser: false }) - 1;

    try {
        await chatStreamAI({
            question: userText,
            onChunk: (chunk) => {
                chatMessages.value[botMsgIndex].text += chunk;
                scrollToBottom();
            },
            onDone: () => { isChatLoading.value = false; scrollToBottom(); }
        });
    } catch (error) {
        chatMessages.value[botMsgIndex].text = "⚠️ Maaf, gagal menghubungi server AI.";
        isChatLoading.value = false;
    }
};

// --- FUNGSI LOAD DATA PREDIKSI (Endpoint: forecast-data) ---
const loadPredictionData = async () => {
    loadingPredictionAI.value = 'loading';
    try {
        const response = await fetch('http://192.168.110.49:3000/forecast-data'); 
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        dataPredictionAI.value = result;
        loadingPredictionAI.value = 'done';
    } catch (error) {
        console.error("Gagal load data prediksi:", error);
        loadingPredictionAI.value = 'error';
    }
};

// --- LOAD SEMUA DATA ---
const loadAllData = async () => {
    const dataLocal = localStorage.getItem('formData');
    if (dataLocal) {
        const parsed = JSON.parse(dataLocal);
        formData.value = {
            idPmg: parsed.pmg, idMataUang: parsed.mataUang, idPackaging: parsed.packaging,
            tanggalAwal: parsed.beforeDate, tanggalAkhir: parsed.now
        };
    }

    // Eksekusi semua secara paralel
    await Promise.allSettled([
        loadFinance(),
        loadOperation(),
        loadSales(),
        loadSCM(),
        loadPredictionData()
    ]);
};

// Loaders dengan Proteksi Try-Catch agar tidak blank putih jika satu API mati
const loadFinance = async () => {
    try { dataRevenue.value = await financeHomeController.revenue(formData.value); } catch (e) {}
    try { dataCbDanCfm.value = await financeHomeController.cashBalance(formData.value); } catch (e) {}
    try { dataPaySchedule.value = await financeHomeController.paySchedule(formData.value); } catch (e) {}
    try { dataCpoKpbn.value = await financeHomeController.cpoKpbn(formData.value); } catch (e) {}
    try { dataKurs.value = await financeHomeController.kursMataUang(formData.value); } catch (e) {}
    try { dataHargaSpotInvBulk.value = await financeHomeController.hargaSpotInvBulk(formData.value); } catch (e) {}
    try { dataHargaSpotInvRitel.value = await financeHomeController.hargaSpotInvRitel(formData.value); } catch (e) {}
};

const loadOperation = async () => {
    try { dataCpoOlah.value = await operationHomeController.cpoOlah(formData.value); } catch (e) {}
    try { dataLaporanProduksi.value = await operationHomeController.laporanProduksi(formData.value); } catch (e) {}
    try { dataLaporanPackaging.value = await operationHomeController.laporanPackaging(formData.value); } catch (e) {}
};

const loadSales = async () => {
    try { dataPenjualanBulk.value = await salesHomeController.laporanPenjualanBulk(formData.value); } catch (e) {}
    try { dataPenjualanRitel.value = await salesHomeController.laporanPenjualanRitel(formData.value); } catch (e) {}
    try { dataSDM.value = await sdmHomeController.sdm(formData.value); } catch (e) {}
};

const loadSCM = async () => {
    try { dataSaldoPe.value = await supplyChainHomeController.saldoPe(formData.value); } catch (e) {}
    try { dataStockBulk.value = await supplyChainHomeController.stokBulky(formData.value); } catch (e) {}
    try { dataStockRetail.value = await supplyChainHomeController.stokRitel(formData.value); } catch (e) {}
    try { dataOutstanding.value = await supplyChainHomeController.outstandingCpo(); } catch (e) {}
    try { dataActualIncoming.value = await supplyChainHomeController.actualIncomingCpo(formData.value); } catch (e) {}
    try { dataStockCpo.value = await supplyChainHomeController.stokCpo(formData.value); } catch (e) {}
};

const updateDates = (dates) => {
    formData.value = {
        idPmg: dates.pmg, idMataUang: dates.mataUang, idPackaging: dates.packaging,
        tanggalAwal: dates.beforeDate, tanggalAkhir: dates.now
    };
    loadAllData();
};

onMounted(() => { loadAllData(); });
</script>

<template>
    <div class="flex flex-col gap-2 bg-neutral-950 min-h-screen text-white app-dark">
        <top-bar :onDateChange="updateDates"></top-bar>

        <div class="px-4 pt-2 relative">
            <div class="flex flex-col gap-3 p-6 rounded-2xl w-full bg-black border border-neutral-800 font-mono min-h-[85vh]">
                
                <div v-if="activePage == 0" class="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <div class="col-span-1 flex flex-col gap-3">
                        <images-home />
                        <span class="font-bold text-blue-400 text-xs uppercase tracking-widest">Sales & Marketing</span>
                        <qty-penjualan-bulk-sales :datas="dataPenjualanBulk" />
                        <qty-penjualan-ritel-sales :datas="dataPenjualanRitel" />
                        <laporan-packaging :datas="dataLaporanPackaging" />
                    </div>

                    <div class="col-span-2 flex flex-col gap-3">
                        <div class="flex justify-between items-center border-b border-neutral-800 pb-2 mb-2">
                            <span class="font-bold text-xs uppercase text-emerald-500">Financial Insight</span>
                            <span class="text-[10px] text-neutral-500">PERIODE: {{ moment(formData.tanggalAwal).format('DD MMM') }} - {{ moment(formData.tanggalAkhir).format('DD MMM YYYY') }}</span>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <revenue-finance :datas="dataRevenue" />
                            <gross-profit-margin-finance :datas="dataRevenue" />
                            <ebitda-margin-finance :datas="dataRevenue" />
                            <cash-flow-movement-finance :datas="dataCbDanCfm.cashFlowMovement" />
                            <cash-balance-finance :datas="dataCbDanCfm.cashBalance" />
                            <kurs-finance :datas="dataKurs" />
                        </div>

                        <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-800 mt-2">
                            <div class="flex items-center gap-2 mb-4">
                                <i class="pi pi-chart-line text-blue-500"></i>
                                <span class="text-xs font-bold text-white uppercase tracking-tighter">AI CPO Price Forecasting (Real-time Analysis)</span>
                            </div>
                            <div class="h-[380px] w-full">
                                <prediction-cpo-chart :datas="dataPredictionAI" :loading="loadingPredictionAI" />
                            </div>
                        </div>

                        <span class="font-bold text-xs uppercase text-amber-500 mt-4">Production Analytics</span>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <cpo-olah-operation :datas="dataCpoOlah" />
                            <laporan-produksi-operation :datas="dataLaporanProduksi" />
                        </div>
                    </div>
                </div>

                <div v-else class="grid grid-cols-1 xl:grid-cols-3 gap-3">
                     <div class="col-span-1"><images-home /></div>
                     <div class="col-span-2 flex flex-col gap-3">
                        <span class="font-bold text-xs uppercase text-cyan-500 tracking-widest">Supply Chain & Logistic</span>
                        <div class="grid grid-cols-3 gap-2">
                            <stok-cpo-supply-chain :datas="dataStockCpo" />
                            <stok-bulk-supply-chain :datas="dataStockBulk" />
                            <stok-ritel-supply-chain :datas="dataStockRetail" />
                        </div>
                        <sdm-view :datas="dataSDM" />
                     </div>
                </div>

                <div class="flex justify-center gap-4 mt-10">
                    <button @click="activePage = 0" class="px-8 py-2 rounded-full border transition-all text-[10px] font-bold"
                        :class="activePage === 0 ? 'bg-white text-black' : 'border-neutral-700 text-neutral-500'">PAGE 1</button>
                    <button @click="activePage = 1" class="px-8 py-2 rounded-full border transition-all text-[10px] font-bold"
                        :class="activePage === 1 ? 'bg-white text-black' : 'border-neutral-700 text-neutral-500'">PAGE 2</button>
                </div>
            </div>

            <div class="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
                <transition name="chat">
                    <div v-if="isChatOpen" class="w-[380px] h-[550px] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
                        <div class="p-4 bg-neutral-800 border-b border-neutral-700 flex justify-between items-center">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"><i class="pi pi-android"></i></div>
                                <span class="text-sm font-bold">Sobat INL AI</span>
                            </div>
                            <button @click="toggleChat"><i class="pi pi-times"></i></button>
                        </div>
                        <div ref="chatScrollRef" class="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                            <div v-for="msg in chatMessages" :key="msg.id" 
                                class="max-w-[85%] p-3 rounded-2xl text-sm"
                                :class="msg.isUser ? 'bg-blue-600 self-end rounded-tr-none' : 'bg-neutral-800 self-start rounded-tl-none'">
                                <div class="chat-content" v-html="formatMessage(msg.text)"></div>
                            </div>
                        </div>
                        <div class="p-4 border-t border-neutral-800">
                            <form @submit.prevent="sendChatMessage" class="flex gap-2">
                                <input v-model="chatInput" type="text" placeholder="Tanyakan data..." class="flex-1 bg-neutral-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500">
                                <button type="submit" class="bg-blue-600 px-4 rounded-xl"><i class="pi pi-send"></i></button>
                            </form>
                        </div>
                    </div>
                </transition>
                <button @click="toggleChat" class="w-16 h-16 rounded-full bg-blue-600 shadow-xl flex items-center justify-center hover:scale-105 transition-all">
                    <i class="pi" :class="isChatOpen ? 'pi-times' : 'pi-comments'" style="font-size: 1.5rem"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 4. CSS MARKDOWN CHATBOT (DARK MODE SUPPORT) */
.msg-content {
    font-size: 0.9rem;
    line-height: 1.6;
}

/* Header ### */
.msg-content h3 {
    font-weight: 800;
    font-size: 1rem;
    margin-top: 10px;
    margin-bottom: 5px;
    color: #ffffff;
    border-bottom: 1px solid #4b5563;
    padding-bottom: 4px;
}

/* Bold **teks** */
.msg-content strong {
    font-weight: 800;
    color: #fbbf24; /* Kuning Emas */
}

/* List */
.msg-content ul {
    list-style-type: disc;
    padding-left: 20px;
    margin: 5px 0;
}
.msg-content ol {
    list-style-type: decimal;
    padding-left: 20px;
    margin: 5px 0;
}
.msg-content li {
    margin-bottom: 2px;
}

/* Garis --- */
.msg-content hr {
    border: 0;
    border-top: 1px solid #525252;
    margin: 12px 0;
}

/* Override warna untuk chat User (Biru) */
.bg-blue-600 .msg-content strong {
    color: white; 
}
.bg-blue-600 .msg-content h3 {
    color: white;
    border-color: rgba(255,255,255,0.3);
}
</style>
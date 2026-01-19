// import AppLayout from '@/layout/AppLayout.vue';
import DashManagement from '@/views/dashboardManagement/layout/Index.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/dashboard/report/home/Index.vue')
        },
        {
            path: '/test-page',
            name: 'test-page',
            component: () => import('@/views/dashboard/report/testPage/Index.vue')
        },
        // {
        //     path: '/',
        //     component: AppLayouts,
        //     children: [
        //     ]
        // },
        {
            path: '/detail-dashboard',
            name: 'detail',
            component: () => import('@/views/dashboard/report/detailPage/Index.vue')
            // meta: {
            //     guestOnly: true
            // }
        },
        {
            path: '/simulation-calc',
            name: 'simulation-calc',
            component: () => import('@/views/dashboard/report/detailPage/components/direksi/Index.vue')
            // meta: {
            //     guestOnly: true
            // }
        },
        {
            path: '/',
            component: DashManagement,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/dashboardManagement/home/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true,
                        operation: true,
                        sales: true,
                        scm: true,
                        sdm: true,
                        sourcing: true
                    }
                },
                // Direksi
                {
                    path: '/director/simulation-calculator',
                    name: 'simulation-calculator',
                    component: () => import('@/views/dashboardManagement/direksi/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                    }
                },
                {
                    path: '/director/master/cost',
                    name: 'director-master-cost',
                    component: () => import('@/views/dashboardManagement/direksi/master/cost/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                    }
                },
                {
                    path: '/director/master/pengali',
                    name: 'director-master-pengali',
                    component: () => import('@/views/dashboardManagement/direksi/master/pengali/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                    }
                },
                {
                    path: '/director/master/utilisasi',
                    name: 'director-master-utilisasi',
                    component: () => import('@/views/dashboardManagement/direksi/master/utilisasi/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                    }
                },
                {
                    path: '/director/master/dmo',
                    name: 'director-master-dmo',
                    component: () => import('@/views/dashboardManagement/direksi/master/dmo/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true
                    }
                },
                // Finance
                {
                    path: '/finance/kurs',
                    name: 'kurs',
                    component: () => import('@/views/dashboardManagement/finance/kurs/kurs/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                    }
                },
                {
                    path: '/finance/kurs/mata-uang',
                    name: 'kurs-mata-uang',
                    component: () => import('@/views/dashboardManagement/finance/kurs/mataUangKurs/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                    }
                },
                {
                    path: '/finance/harga/spot',
                    name: 'harga-spot',
                    component: () => import('@/views/dashboardManagement/finance/harga/spot/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        sales: true
                    }
                },
                {
                    path: '/finance/harga/inventory',
                    name: 'harga-inventory',
                    component: () => import('@/views/dashboardManagement/finance/harga/inventory/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                    }
                },
                {
                    path: '/finance/cash-flow-movement',
                    name: 'cost-flow-movement',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowMovement/cashFlowMovement/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cash-flow-movement/create',
                    name: 'cost-flow-movement-create',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowMovement/cashFlowMovement/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cash-flow-movement/kategori',
                    name: 'cost-flow-movement-kategori',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowMovement/kategori/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cash-flow-schedule',
                    name: 'cost-flow-schedule',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowSchedule/cashFlow/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cash-flow-schedule/kategori',
                    name: 'cost-flow-schedule-kategori',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowSchedule/kategori/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cash-flow-schedule/pay-status',
                    name: 'cost-flow-schedule-pay-status',
                    component: () => import('@/views/dashboardManagement/finance/cashFlowSchedule/payStatus/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/profitability',
                    name: 'profitability',
                    component: () => import('@/views/dashboardManagement/finance/profitability/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/profitability/create',
                    name: 'profitability-create',
                    component: () => import('@/views/dashboardManagement/finance/profitability/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/finance/cpo-kpbn',
                    name: 'cpo-kpbn',
                    component: () => import('@/views/dashboardManagement/finance/cpoKpbn/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                // Operation
                {
                    path: '/cost-prod/beban-prod',
                    name: 'cost-beban-prod',
                    component: () => import('@/views/dashboardManagement/costProduction/bebanProd/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true
                        // operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/cost-prod/target-prod',
                    name: 'cost-target-prod',
                    component: () => import('@/views/dashboardManagement/costProduction/targetProd/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/laporan-produksi',
                    name: 'laporan-produksi',
                    component: () => import('@/views/dashboardManagement/operation/laporanProduksi/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/laporan-produksi/create',
                    name: 'laporan-produksi-create',
                    component: () => import('@/views/dashboardManagement/operation/laporanProduksi/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/sdm/uraian',
                    name: 'uraian-sdm',
                    component: () => import('@/views/dashboardManagement/sdm/uraianSdm/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        // scm: true,
                        sdm: true
                    }
                },
                {
                    path: '/sdm/data-sdm',
                    name: 'data-sdm',
                    component: () => import('@/views/dashboardManagement/sdm/dataSdm/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        // scm: true,
                        sdm: true
                    }
                },
                {
                    path: '/master/jenis-produksi',
                    name: 'jenis-produksi',
                    component: () => import('@/views/dashboardManagement/operation/jenisLaporanProduksi/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/master/jenis-material',
                    name: 'jenis-material',
                    component: () => import('@/views/dashboardManagement/operation/pemakaianMaterial/jenisMaterial/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/norma-material',
                    name: 'norma-material',
                    component: () => import('@/views/dashboardManagement/operation/pemakaianMaterial/normaMaterial/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/norma-material/create',
                    name: 'norma-material-create',
                    component: () => import('@/views/dashboardManagement/operation/pemakaianMaterial/normaMaterial/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/laporan-material',
                    name: 'laporan-material',
                    component: () => import('@/views/dashboardManagement/operation/pemakaianMaterial/laporanMaterial/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/laporan-material/create',
                    name: 'laporan-material-create',
                    component: () => import('@/views/dashboardManagement/operation/pemakaianMaterial/laporanMaterial/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/packaging',
                    name: 'packaging',
                    component: () => import('@/views/dashboardManagement/operation/packaging/packaging/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/packaging/uraian-target',
                    name: 'packaging-uraian-target',
                    component: () => import('@/views/dashboardManagement/operation/packaging/uraianTargetPackaging/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/packaging/jenis-laporan',
                    name: 'packaging-jenis-laporan',
                    component: () => import('@/views/dashboardManagement/operation/packaging/jenisLaporanPackaging/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/packaging/target',
                    name: 'packaging-target',
                    component: () => import('@/views/dashboardManagement/operation/packaging/targetPackaging/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/packaging/target/create',
                    name: 'packaging-target-create',
                    component: () => import('@/views/dashboardManagement/operation/packaging/targetPackaging/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/packaging/laporan-packaging',
                    name: 'packaging-laporan-packaging',
                    component: () => import('@/views/dashboardManagement/operation/packaging/laporanPackaging/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },
                {
                    path: '/operation/packaging/laporan-packaging/create',
                    name: 'packaging-laporan-packaging-create',
                    component: () => import('@/views/dashboardManagement/operation/packaging/laporanPackaging/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        operation: true
                        // sales: true,
                        // scm: true,
                        // sdm: true
                    }
                },

                // Sales / Penjualan
                {
                    path: '/sales/uraian-target-penjualan',
                    name: 'sales-uraian-target-penjualan',
                    component: () => import('@/views/dashboardManagement/sales/uraianTargetPenjualan/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        sales: true
                        // scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/sales/target-penjualan',
                    name: 'sales-target-penjualan',
                    component: () => import('@/views/dashboardManagement/sales/targetPenjualan/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        sales: true
                        // scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/sales/laporan-penjualan',
                    name: 'sales-laporan-penjualan',
                    component: () => import('@/views/dashboardManagement/sales/laporanPenjualan/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        sales: true
                        // scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/sales/levy-duty-proportion-cost',
                    name: 'sales-levy-duty-proportion-cost',
                    component: () => import('@/views/dashboardManagement/sales/levyDutyPenjualan/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        sales: true
                        // scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/sales/levy-duty-proportion-cost/create',
                    name: 'sales-levy-duty-proportion-cost-create',
                    component: () => import('@/views/dashboardManagement/sales/levyDutyPenjualan/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        sales: true
                        // scm: true
                        // sdm: true
                    }
                },

                // Supply Chain
                {
                    path: '/scm/source-cpo',
                    name: 'source-cpo',
                    component: () => import('@/views/dashboardManagement/supplyChain/sourceCpo/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        sourcing: true
                        // scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/target-incoming',
                    name: 'target-incoming',
                    component: () => import('@/views/dashboardManagement/supplyChain/targetIncoming/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        sourcing: true
                        // scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/incoming-cpo',
                    name: 'incoming-cpo',
                    component: () => import('@/views/dashboardManagement/supplyChain/incomingCpo/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        sourcing: true
                        // scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/outstanding-cpo',
                    name: 'outstanding-cpo',
                    component: () => import('@/views/dashboardManagement/supplyChain/outstandingCpo/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        // scm: true
                        sourcing: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/saldo-pe',
                    name: 'saldo-pe',
                    component: () => import('@/views/dashboardManagement/supplyChain/saldoPe/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/stock/cpo',
                    name: 'stock-cpo',
                    component: () => import('@/views/dashboardManagement/supplyChain/stock/cpo/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/stock/bulk',
                    name: 'stock-bulk',
                    component: () => import('@/views/dashboardManagement/supplyChain/stock/bulk/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/stock/bulk/create',
                    name: 'stock-bulk-create',
                    component: () => import('@/views/dashboardManagement/supplyChain/stock/bulk/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/stock/retail',
                    name: 'stock-retail',
                    component: () => import('@/views/dashboardManagement/supplyChain/stock/retail/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },
                {
                    path: '/scm/stock/retail/create',
                    name: 'stock-retail-create',
                    component: () => import('@/views/dashboardManagement/supplyChain/stock/retail/CreateIndex.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        // finance: true,
                        // operation: true
                        // sales: true,
                        scm: true
                        // sdm: true
                    }
                },

                // Master Data
                {
                    path: '/master/produk',
                    name: 'produk',
                    component: () => import('@/views/dashboardManagement/masterPage/produk/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true,
                        operation: true,
                        sales: true,
                        scm: true,
                        sdm: true,
                        sourcing: true
                    }
                },
                {
                    path: '/master/produk-storage',
                    name: 'produk-storage',
                    component: () => import('@/views/dashboardManagement/masterPage/produkStorage/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true,
                        operation: true,
                        sales: true,
                        scm: true,
                        sdm: true,
                        sourcing: true
                    }
                },
                {
                    path: '/master/lokasi',
                    name: 'lokasi',
                    component: () => import('@/views/dashboardManagement/masterPage/lokasi/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true,
                        operation: true,
                        sales: true,
                        scm: true,
                        sdm: true,
                        sourcing: true
                    }
                },
                {
                    path: '/master/pmg',
                    name: 'pmg',
                    component: () => import('@/views/dashboardManagement/masterPage/pmg/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true,
                        operation: true,
                        sales: true,
                        scm: true,
                        sdm: true,
                        sourcing: true
                    }
                },
                {
                    path: '/master/uraian/beban-produksi',
                    name: 'uraian-beban-produksi',
                    component: () => import('@/views/dashboardManagement/masterPage/uraianBebanProd/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true,
                        operation: true,
                        sales: true,
                        scm: true,
                        sdm: true,
                        sourcing: true
                    }
                },
                {
                    path: '/master/uraian/target-produksi',
                    name: 'uraian-target-produksi',
                    component: () => import('@/views/dashboardManagement/masterPage/uraianTargetProd/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true,
                        operation: true,
                        sales: true,
                        scm: true,
                        sdm: true,
                        sourcing: true
                    }
                },
                {
                    path: '/master/partner/supplier',
                    name: 'partner-supplier',
                    component: () => import('@/views/dashboardManagement/masterPage/partner/supplier/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true,
                        operation: true,
                        sales: true,
                        scm: true,
                        sdm: true,
                        sourcing: true
                    }
                },
                {
                    path: '/master/partner/customer',
                    name: 'partner-customer',
                    component: () => import('@/views/dashboardManagement/masterPage/partner/customer/Index.vue'),
                    meta: {
                        requiresAuth: true,
                        allUser: true,
                        finance: true,
                        operation: true,
                        sales: true,
                        scm: true,
                        sdm: true,
                        sourcing: true
                    }
                }
            ]
        },
        {
            path: '/verify/:id',
            name: 'verify',
            component: () => import('@/views/dashboardManagement/auth/Verify.vue'),
            meta: {
                guestOnly: true
            }
        },
        {
            path: '/tester',
            name: 'tester',
            component: () => import('@/views/dashboard/notfound/TestPage..vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound404',
            component: () => import('@/views/dashboard/notfound/NotFound.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    const tokens = localStorage.getItem('usertoken') != null;
    const roles = localStorage.getItem('roles');
    // console.log(roles);

    if (to.matched.some((route) => route.meta.requiresAuth)) {
        if (tokens) {
            if (roles == 'allUser') {
                if (to.matched.some((route) => route.meta.allUser)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else if (roles == 'finance') {
                if (to.matched.some((route) => route.meta.finance)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else if (roles == 'operation') {
                if (to.matched.some((route) => route.meta.operation)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else if (roles == 'sales') {
                if (to.matched.some((route) => route.meta.sales)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else if (roles == 'scm') {
                if (to.matched.some((route) => route.meta.scm)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else if (roles == 'sourcing') {
                if (to.matched.some((route) => route.meta.sourcing)) {
                    next();
                } else {
                    next('/dashboard');
                }
            } else {
                if (to.matched.some((route) => route.meta.sdm)) {
                    next();
                } else {
                    next('/dashboard');
                }
            }
        } else {
            next('/');
        }
    } else if (to.matched.some((route) => route.meta.guestOnly)) {
        if (tokens) {
            if (roles == 'allUser') {
                next('/dashboard');
            } else if (roles == 'finance') {
                next('/dashboard');
            } else if (roles == 'logistik') {
                next('/dashboard');
            } else if (roles == 'operation') {
                next('/dashboard');
            } else if (roles == 'sales') {
                next('/dashboard');
            } else {
                next('/dashboard');
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;

<template>
  <div class="h-full flex flex-col space-y-4">
    <h2 class="text-2xl font-bold text-gray-900 px-2">{{ t('settings.title') }}</h2>

    <div class="flex-1 bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
      <div class="w-full md:w-64 bg-gray-50 border-l border-gray-200 flex flex-col overflow-y-auto">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap',
            activeTab === tab.id 
              ? 'bg-white text-primary-600 border-r-4 border-primary-600 shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          ]"
        >
          <component :is="tab.icon" class="w-5 h-5" />
          {{ tab.name }}
        </button>
      </div>

      <div class="flex-1 p-6 overflow-y-auto">
        <div v-if="activeTab === 'general'" class="space-y-6 max-w-2xl">
          <h3 class="text-lg font-medium text-gray-900 border-b pb-2 mb-4">{{ t('settings.general_section.title') }}</h3>
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('settings.general_section.shop_name') }}</label>
              <input v-model="settings.shopName" type="text" class="input-field">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('settings.general_section.phone') }}</label>
                <input v-model="settings.phone" type="text" class="input-field">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('settings.general_section.email') }}</label>
                <input v-model="settings.email" type="email" class="input-field">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('settings.general_section.address') }}</label>
              <textarea v-model="settings.address" rows="3" class="input-field"></textarea>
            </div>

            <div class="border-t pt-4 mt-4">
              <h4 class="text-sm font-medium text-gray-900 mb-4">وسائل التواصل الاجتماعي</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">فيسبوك</label>
                  <input v-model="settings.facebookUrl" type="text" class="input-field" placeholder="رابط الصفحة">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">انستغرام</label>
                  <input v-model="settings.instagramUrl" type="text" class="input-field" placeholder="رابط الحساب">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">تيليجرام</label>
                  <input v-model="settings.telegramUrl" type="text" class="input-field" placeholder="معرف القناة/الحساب">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">الموقع الإلكتروني</label>
                  <input v-model="settings.websiteUrl" type="text" class="input-field" placeholder="www.example.com">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'appearance'" class="space-y-6 max-w-2xl">
          <h3 class="text-lg font-medium text-gray-900 border-b pb-2 mb-4">{{ t('settings.appearance_section.title') }}</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('settings.appearance_section.language') }}</label>
              <select v-model="settings.language" class="input-field">
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="ku">Kurdish</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('settings.appearance_section.currency') }}</label>
              <div class="grid grid-cols-2 gap-4">
                <select v-model="settings.currency" class="input-field">
                  <option value="IQD">دينار عراقي (IQD)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                  <option value="EUR">يورو (EUR)</option>
                </select>
                <select v-model="settings.currencyLocale" class="input-field">
                  <option value="ar-IQ">تنسيق عراقي (١,٠٠٠ د.ع)</option>
                  <option value="en-US">تنسيق عالمي ($1,000)</option>
                </select>
              </div>
            </div>

            <div class="pt-4">
              <label class="block text-sm font-medium text-gray-700 mb-3">{{ t('settings.appearance_section.primary_color') }}</label>
              <div class="flex gap-4">
                <button 
                  v-for="color in colors" 
                  :key="color.value"
                  @click="settings.primaryColor = color.value"
                  :class="[
                    'w-10 h-10 rounded-full border-2 transition-transform hover:scale-110',
                    settings.primaryColor === color.value ? 'border-gray-900 scale-110' : 'border-transparent'
                  ]"
                  :style="{ backgroundColor: color.value }"
                  :title="color.name"
                ></button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('settings.appearance_section.theme') }}</label>
              <div class="flex gap-4">
                <button
                  @click="settings.theme = 'light'"
                  :class="[
                    'flex-1 px-4 py-2 rounded-lg border text-sm font-medium',
                    settings.theme === 'light'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  ]"
                >
                  {{ t('settings.appearance_section.light') }}
                </button>
                <button
                  @click="settings.theme = 'dark'"
                  :class="[
                    'flex-1 px-4 py-2 rounded-lg border text-sm font-medium',
                    settings.theme === 'dark'
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  ]"
                >
                  {{ t('settings.appearance_section.dark') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'invoices'" class="space-y-6 max-w-2xl">
          <h3 class="text-lg font-medium text-gray-900 border-b pb-2 mb-4">{{ t('settings.invoices_section.title') }}</h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('settings.invoices_section.header') }}</label>
              <textarea v-model="settings.invoiceHeader" rows="2" class="input-field"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('settings.invoices_section.footer') }}</label>
              <textarea v-model="settings.invoiceFooter" rows="2" class="input-field"></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('settings.invoices_section.paper_size') }}</label>
                <select v-model="settings.invoicePaperSize" class="input-field">
                  <option value="58mm">58mm</option>
                  <option value="80mm">80mm</option>
                  <option value="A4">A4</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('settings.invoices_section.font_size') }}</label>
                <input v-model.number="settings.invoiceFontSize" type="number" min="8" max="24" class="input-field">
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <input v-model="settings.showLogoOnInvoice" type="checkbox" id="showLogo" class="rounded text-primary-600 focus:ring-primary-500">
                <label for="showLogo" class="text-sm text-gray-700">{{ t('settings.invoices_section.show_logo') }}</label>
              </div>
              <div class="flex items-center gap-2">
                <input v-model="settings.showCashierName" type="checkbox" id="showCashier" class="rounded text-primary-600 focus:ring-primary-500">
                <label for="showCashier" class="text-sm text-gray-700">عرض اسم الكاشير</label>
              </div>
              <div class="flex items-center gap-2">
                <input v-model="settings.showCustomerInfo" type="checkbox" id="showCustomer" class="rounded text-primary-600 focus:ring-primary-500">
                <label for="showCustomer" class="text-sm text-gray-700">عرض بيانات العميل</label>
              </div>
              <div class="flex items-center gap-2">
                <input v-model="settings.showSocialMediaOnInvoice" type="checkbox" id="showSocials" class="rounded text-primary-600 focus:ring-primary-500">
                <label for="showSocials" class="text-sm text-gray-700">عرض وسائل التواصل في التذييل</label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'barcode'" class="space-y-6 max-w-2xl">
          <h3 class="text-lg font-medium text-gray-900 border-b pb-2 mb-4">إعدادات الباركود</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">العرض</label>
              <input v-model.number="settings.barcodeWidth" type="number" min="1" max="4" step="0.1" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">الارتفاع</label>
              <input v-model.number="settings.barcodeHeight" type="number" min="50" max="200" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">التنسيق</label>
              <select v-model="settings.barcodeFormat" class="input-field">
                <option value="CODE128">CODE128</option>
                <option value="EAN13">EAN13</option>
                <option value="EAN8">EAN8</option>
                <option value="UPC">UPC</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">حجم الخط</label>
              <input v-model.number="settings.barcodeFontSize" type="number" min="8" max="32" class="input-field">
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <input v-model="settings.barcodeShowText" type="checkbox" id="barcodeShowText" class="rounded text-primary-600 focus:ring-primary-500">
              <label for="barcodeShowText" class="text-sm text-gray-700">عرض النص أسفل الباركود</label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">الهامش</label>
              <input v-model.number="settings.barcodeMargin" type="number" min="0" max="20" class="input-field">
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'reports'" class="space-y-6 max-w-2xl">
          <h3 class="text-lg font-medium text-gray-900 border-b pb-2 mb-4">إعدادات التقارير</h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">عنوان التقرير</label>
              <input v-model="settings.reportHeaderTitle" type="text" class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">نص التذييل</label>
              <textarea v-model="settings.reportFooterText" rows="2" class="input-field"></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">لون أساسي</label>
                <input v-model="settings.reportPrimaryColor" type="color" class="h-10 w-full rounded-md border border-gray-200">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">لون الإطار</label>
                <input v-model="settings.reportBorderColor" type="color" class="h-10 w-full rounded-md border border-gray-200">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">حجم الخط</label>
                <input v-model.number="settings.reportFontSize" type="number" min="10" max="24" class="input-field">
              </div>
              <div class="flex items-center gap-2 mt-6">
                <input v-model="settings.reportShowLogo" type="checkbox" id="reportShowLogo" class="rounded text-primary-600 focus:ring-primary-500">
                <label for="reportShowLogo" class="text-sm text-gray-700">عرض الشعار في التقرير</label>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'system'" class="space-y-6 max-w-2xl">
          <h3 class="text-lg font-medium text-gray-900 border-b pb-2 mb-4">{{ t('settings.system_section.title') }}</h3>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-base font-bold text-gray-900">التنبيهات</h4>
                <p class="text-sm text-gray-500">تفعيل أصوات وإشعارات النظام</p>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.enableNotifications" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary-600 relative">
                  <div class="absolute top-0.5 right-0.5 bg-white w-5 h-5 rounded-full shadow transform transition peer-checked:translate-x-[-20px]"></div>
                </div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-base font-bold text-gray-900">النسخ الاحتياطي التلقائي</h4>
                <p class="text-sm text-gray-500">حفظ نسخة احتياطية من البيانات بشكل دوري</p>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.autoBackup" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary-600 relative">
                  <div class="absolute top-0.5 right-0.5 bg-white w-5 h-5 rounded-full shadow transform transition peer-checked:translate-x-[-20px]"></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-end gap-3">
          <button @click="resetToDefaults" class="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
            استعادة الإعدادات الافتراضية
          </button>
          <button @click="saveSettings" class="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Palette, Printer, ScanBarcode, FileText, Settings as SettingsIcon, Store } from 'lucide-vue-next';
import { useSettingsStore } from '../store/settings';

const { t } = useI18n();
const settingsStore = useSettingsStore();

const settings = reactive({
  shopName: settingsStore.shopName,
  address: settingsStore.address,
  phone: settingsStore.phone,
  email: settingsStore.email,
  facebookUrl: settingsStore.facebookUrl,
  instagramUrl: settingsStore.instagramUrl,
  telegramUrl: settingsStore.telegramUrl,
  websiteUrl: settingsStore.websiteUrl,
  language: settingsStore.language,
  currency: settingsStore.currency,
  currencyLocale: settingsStore.currencyLocale,
  theme: settingsStore.theme,
  primaryColor: settingsStore.primaryColor,
  invoiceHeader: settingsStore.invoiceHeader,
  invoiceFooter: settingsStore.invoiceFooter,
  invoicePaperSize: settingsStore.invoicePaperSize,
  invoiceFontSize: settingsStore.invoiceFontSize,
  showLogoOnInvoice: settingsStore.showLogoOnInvoice,
  showCashierName: settingsStore.showCashierName,
  showCustomerInfo: settingsStore.showCustomerInfo,
  showSocialMediaOnInvoice: settingsStore.showSocialMediaOnInvoice,
  barcodeWidth: settingsStore.barcodeWidth,
  barcodeHeight: settingsStore.barcodeHeight,
  barcodeFormat: settingsStore.barcodeFormat,
  barcodeShowText: settingsStore.barcodeShowText,
  barcodeFontSize: settingsStore.barcodeFontSize,
  barcodeMargin: settingsStore.barcodeMargin,
  reportHeaderTitle: settingsStore.reportHeaderTitle,
  reportFooterText: settingsStore.reportFooterText,
  reportPrimaryColor: settingsStore.reportPrimaryColor,
  reportShowLogo: settingsStore.reportShowLogo,
  reportShowDate: settingsStore.reportShowDate,
  reportFontSize: settingsStore.reportFontSize,
  reportBorderColor: settingsStore.reportBorderColor,
  enableNotifications: settingsStore.enableNotifications,
  autoBackup: settingsStore.autoBackup
});

const colors = [
  { name: 'أزرق', value: '#0ea5e9' },
  { name: 'أخضر', value: '#22c55e' },
  { name: 'بنفسجي', value: '#8b5cf6' },
  { name: 'برتقالي', value: '#f97316' },
  { name: 'أحمر', value: '#ef4444' }
];

const tabs = computed(() => [
  { id: 'general', name: t('settings.general_section.title'), icon: Store },
  { id: 'appearance', name: t('settings.appearance_section.title'), icon: Palette },
  { id: 'invoices', name: t('settings.invoices_section.title'), icon: Printer },
  { id: 'barcode', name: 'الباركود', icon: ScanBarcode },
  { id: 'reports', name: 'التقارير', icon: FileText },
  { id: 'system', name: t('settings.system_section.title'), icon: SettingsIcon }
]);

const activeTab = ref('general');

const saveSettings = async () => {
  const payload = { ...settings };
  settingsStore.updateSettings(payload);
  await settingsStore.saveSettingsToBackend(payload);
};

const resetToDefaults = () => {
  settings.shopName = 'متجر ريحانة';
  settings.address = 'الموصل - حي الزهور';
  settings.phone = '07700000000';
  settings.email = '';
  settings.facebookUrl = '';
  settings.instagramUrl = '';
  settings.telegramUrl = '';
  settings.websiteUrl = '';
  settings.language = 'ar';
  settings.currency = 'IQD';
  settings.currencyLocale = 'ar-IQ';
  settings.theme = 'light';
  settings.primaryColor = '#0ea5e9';
  settings.invoiceHeader = 'أهلاً بكم في متجر ريحانة';
  settings.invoiceFooter = 'شكراً لزيارتكم';
  settings.invoicePaperSize = '80mm';
  settings.invoiceFontSize = 12;
  settings.showLogoOnInvoice = false;
  settings.showCashierName = true;
  settings.showCustomerInfo = true;
  settings.showSocialMediaOnInvoice = true;
  settings.barcodeWidth = 2;
  settings.barcodeHeight = 100;
  settings.barcodeFormat = 'CODE128';
  settings.barcodeShowText = true;
  settings.barcodeFontSize = 20;
  settings.barcodeMargin = 10;
  settings.reportHeaderTitle = 'تقرير المبيعات';
  settings.reportFooterText = 'تم استخراج التقرير من نظام ريحانة';
  settings.reportPrimaryColor = '#0ea5e9';
  settings.reportShowLogo = true;
  settings.reportShowDate = true;
  settings.reportFontSize = 14;
  settings.reportBorderColor = '#e5e7eb';
  settings.enableNotifications = true;
  settings.autoBackup = false;
};

onMounted(async () => {
  try {
    await settingsStore.fetchSettings();
    Object.assign(settings, { ...settingsStore.$state });
  } catch (e) {
    console.error('Failed to fetch settings', e);
  }
});

watch(
  () => settings.primaryColor,
  (newColor) => {
    if (newColor) {
      settingsStore.applyPrimaryColor(newColor);
    }
  }
);
</script>

<style scoped>
.input-field {
  @apply w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm;
}
</style>

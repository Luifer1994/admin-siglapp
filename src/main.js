import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";
import CKEditor from "@ckeditor/ckeditor5-vue";

createApp(App)
  .use(router)
  .use(store)
  .use(Notifications)
  .use(CKEditor)
  .mount("#app");
/* createApp(App).use(store).mount('#app') */

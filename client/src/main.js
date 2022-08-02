import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { store } from "./vuex/todoStore";
import router from "./router";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";

/* import specific icons */
/*fa-down-left-and-up-right-to-center*/
import {
  faPlus,
  faLanguage,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faDownLeftAndUpRightToCenter,
  faHourglass,
  faCircleCheck,
  faCloudArrowUp,
  faTrashCan,
  faSquarePen,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add([
  faPlus,
  faLanguage,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faDownLeftAndUpRightToCenter,
  faHourglass,
  faCircleCheck,
  faCloudArrowUp,
  faTrashCan,
  faSquarePen,
  faRectangleList,
]);

const app = createApp(App);

app.config.globalProperties.$axios = axios; // global axios --> use as this.$axios.get or post
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.mount("#app");

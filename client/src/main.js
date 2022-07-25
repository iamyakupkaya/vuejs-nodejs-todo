import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { store } from "./vuex/todoStore";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
]);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);

app.mount("#app");

import { createRouter, createWebHistory } from "vue-router";
import RegisterTodo from "./pages/RegisterTodo";
import TodoList from "./pages/TodoList";
import NotFound from "./pages/NotFound";
const routes = [
  {
    path: "/",
    name: "RegisterTodo",
    component: RegisterTodo,
  },
  {
    path: "/todo",
    name: "TodoList",
    component: TodoList,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;

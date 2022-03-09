import { createRouter, createWebHashHistory } from "vue-router";
import axios from "axios";
const routes = [
  {
    path: "/",
    name: "Users",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Users.vue"),
  },
  {
    path: "/user-register",
    name: "UserRegister",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterUser.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

async function validateSesion() {
  const urlApi = process.env.VUE_APP_URL_API;
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(urlApi + "validate-sesion", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data) {
      return true;
    }
  } catch (error) {
    if (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("vuex");
      window.location.reload();
    }
  }
}

function existToken() {
  if (localStorage.getItem("token")) {
    return true;
  }
}

router.beforeEach((to, from, next) => {
  var isLogin = existToken();
  if (isLogin && validateSesion()) {
    next();
  } else {
    if (to.name === "Login") {
      next();
    } else {
      next("login");
    }
  }
});

export default router;

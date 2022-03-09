<template>
  <main class="main" id="top">
    <div class="container" data-layout="container">
      <div class="row flex-center min-vh-100 py-6">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <a
            class="d-flex flex-center mb-4"
            style="color: rgb(226, 6, 19)"
            href="#"
            ><img
              class=""
              src="../assets/img/logo_megatiendas.png"
              alt=""
              width="100"
            /><span class="font-sans-serif fw-bolder fs-5 ml-0 d-inline-block"
              >egatiendas</span
            ></a
          >
          <div class="card">
            <div class="card-body p-4 p-sm-5">
              <div class="row flex-between-center mb-2 justify-content-center">
                <div class="col-auto">
                  <h5>Login</h5>
                </div>
              </div>
              <div class="mb-3">
                <input
                  class="form-control"
                  type="email"
                  placeholder="Email address"
                  v-model="userEmail"
                />
              </div>
              <div class="mb-3">
                <input
                  v-model="userPassword"
                  class="form-control"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <!-- <div class="row flex-between-center">
                  <div class="col-auto">
                    <a class="fs--1" href="#">Olvidaste tu contraseña?</a>
                  </div>
                </div> -->
              <div class="mb-3">
                <button
                  class="btn btn-primary d-block w-100 mt-3"
                  @click="login"
                  name="submit"
                >
                  Login
                </button>
              </div>
              <div class="position-relative mt-4">
                <hr class="bg-300" />
                <div class="divider-content-center">Megatiendas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <notifications />
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  mounted() {
    /* this.$notify({
      title: "Important message",
      text: "Hello user!",
    }); */
  },
  data() {
    return {
      userEmail: null,
      userPassword: null,
      urlApi: process.env.VUE_APP_URL_API,
    };
  },
  methods: {
    async login() {
      try {
        let dataUser = new Object();
        dataUser.email = this.userEmail;
        dataUser.password = this.userPassword;
        let res = await axios.post(this.urlApi + "user-login", dataUser);
        if (res.data.user.type_user_id === 1) {
          this.$store.commit("userLogin", res.data.user);
          localStorage.token = res.data.token;

          this.$router.push("/");
        } else {
          this.$notify({
            title: "Error",
            text: "No tienes permiso para entrar",
            type: "error",
          });
        }
      } catch (error) {
        const err = error.response.data;
        if (err.email) {
          this.$notify({
            title: "Error",
            text: "El email es requerido!",
            type: "error",
          });
        }
        if (err.password) {
          this.$notify({
            title: "Error",
            text: "La contraseña es requerida!",
            type: "error",
          });
        }
        if (err.message) {
          this.$notify({
            title: "Error",
            text: err.message,
            type: "error",
          });
        }
      }
    },
  },
};
</script>
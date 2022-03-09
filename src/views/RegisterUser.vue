<template>
  <h3>Registro de usuarios</h3>
  <div class="card shadow-none">
    <div class="card-body p-4 pb-3">
      <form class="row g-3 needs-validation">
        <div class="col-md-4 position-relative">
          <label class="form-label">Tipo de documento</label
          ><select
            class="form-select"
            v-model="typeDocument"
            :class="{ 'is-invalid': this.errors.type_document }"
          >
            <option
              v-for="item in typesDocuments"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
          <small class="text-danger" v-if="this.errors.type_document">
            {{ this.errors.type_document[0] }}
          </small>
        </div>
        <div class="col-md-4 position-relative">
          <label class="form-label">Número de documento</label
          ><input
            class="form-control"
            :class="{ 'is-invalid': this.errors.document }"
            type="number"
            v-model="document"
          />
          <small class="text-danger" v-if="this.errors.document">
            {{ this.errors.document[0] }}
          </small>
        </div>
        <div class="col-md-4 position-relative">
          <label class="form-label">Nombre</label
          ><input
            class="form-control"
            :class="{ 'is-invalid': this.errors.name }"
            type="text"
            v-model="names"
          />
          <small class="text-danger" v-if="this.errors.document">
            {{ this.errors.name[0] }}
          </small>
        </div>
        <div class="col-md-4 position-relative">
          <label class="form-label">Email</label
          ><input
            class="form-control"
            :class="{ 'is-invalid': this.errors.email }"
            type="email"
            v-model="email"
          />
          <small class="text-danger" v-if="this.errors.document">
            {{ this.errors.email[0] }}
          </small>
        </div>

        <div class="col-md-4 position-relative">
          <label class="form-label">Tipo de usuario</label
          ><select
            class="form-select"
            :class="{ 'is-invalid': this.errors.type_user }"
            v-model="typeUser"
          >
            <option v-for="item in typesUsers" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <small class="text-danger" v-if="this.errors.document">
            {{ this.errors.type_user[0] }}
          </small>
        </div>

        <div class="col-md-4 position-relative">
          <label class="form-label">Centro de operación</label
          ><select
            class="form-select"
            :class="{ 'is-invalid': this.errors.center_op }"
            v-model="centerOp"
            :onchange="getCellers"
          >
            <option
              v-for="item in centersOp"
              :key="item.cod_erp"
              :value="item.cod_erp"
            >
              {{ item.descripcion }}
            </option>
          </select>
          <small class="text-danger" v-if="this.errors.document">
            {{ this.errors.center_op[0] }}
          </small>
        </div>

        <div v-if="centerOp" class="col-md-4 position-relative">
          <label class="form-label">Bodega</label
          ><select
            class="form-select"
            :class="{ 'is-invalid': this.errors.seller }"
            v-model="celler"
          >
            <option
              v-for="item in cellers"
              :key="item.cod_erp"
              :value="item.cod_erp"
            >
              {{ item.descripcion }}
            </option>
          </select>
          <small class="text-danger" v-if="this.errors.document">
            {{ this.errors.seller[0] }}
          </small>
        </div>

        <div class="row mt-3 px-2">
          <div class="col">
            <button class="btn btn-primary" type="button" @click="store()">
              Registrar
            </button>
            <router-link to="/" class="btn btn-danger mx-2" type="button"
              >Cancelar</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
  <notifications />
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      urlApi: process.env.VUE_APP_URL_API,
      token: localStorage.getItem("token"),
      typesDocuments: [],
      typesUsers: [],
      centersOp: [],
      cellers: [],
      typeDocument: null,
      typeUser: null,
      centerOp: null,
      celler: null,
      names: null,
      email: null,
      document: null,
      errors: [],
    };
  },
  mounted() {
    /* this.$notify({
      title: "Important message",
      text: "Hello user!",
    }); */
    this.getTypesDocuments();
    this.getTypesUsers();
    this.getCentersOp();
  },
  methods: {
    async getTypesDocuments() {
      const res = await axios.get(this.urlApi + "types-document");
      this.typesDocuments = res.data.data;
    },
    async getTypesUsers() {
      const res = await axios.get(this.urlApi + "types-users");
      this.typesUsers = res.data.data;
    },
    async getCentersOp() {
      const res = await axios.post(
        "https://api-wsdl.acercate.com.co/centrosOpByCompany"
      );
      this.centersOp = res.data.data;
    },
    async getCellers() {
      let data = new Object();
      data.id_centro_op = this.centerOp;
      console.log(data);
      const res = await axios.post(
        "https://api-wsdl.acercate.com.co/bodegas/list",
        data
      );
      this.cellers = res.data.data;
    },

    async store() {
      const data = new Object();
      data.type_document = this.typeDocument;
      data.type_user = this.typeUser;
      data.document = this.document;
      data.center_op = this.centerOp;
      data.seller = this.celler;
      data.name = this.names;
      data.email = this.email;

      try {
        const res = await axios.post(this.urlApi + "user-store", data, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.$notify({
          title: "Exto",
          text: res.data.message,
          type: "success",
        });
        this.$router.push("/");
      } catch (error) {
        this.errors = error.response.data;
        console.log(this.errors);
      }
    },
  },
};
</script>
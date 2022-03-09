<template>
  <div class="search-box" data-list='{"valueNames":["title"]}'>
    <input
      v-model="search"
      @keyup="list()"
      class="form-control search-input fuzzy-search"
      type="search"
      placeholder="Buscar..."
      aria-label="Search"
    />
    <span class="fas fa-search search-box-icon"></span>
  </div>
  <br />
  <div class="card shadow-none">
    <div class="card-body p-0 pb-3">
      <div class="d-flex align-items-center justify-content-end my-2 mx-3">
        <div class="mx-2">
          <router-link
            class="btn btn-falcon-success btn-sm"
            type="button"
            to="/user-register"
          >
            <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span
            ><span class="ms-1">Registrar</span>
          </router-link>
        </div>
        <div class="btn-group my-2">
          <button
            class="btn btn-falcon-primary btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Ver
          </button>
          <div class="dropdown-menu">
            <a
              class="dropdown-item"
              :class="{ active: limit == 5 }"
              style="cursor: pointer"
              @click="views(5)"
              >5</a
            >
            <a
              class="dropdown-item"
              :class="{ active: limit == 10 }"
              style="cursor: pointer"
              @click="views(10)"
              >10</a
            >
            <a
              class="dropdown-item"
              style="cursor: pointer"
              :class="{ active: limit == 15 }"
              @click="views(15)"
              >15</a
            >
            <a
              class="dropdown-item"
              :class="{ active: limit == 20 }"
              style="cursor: pointer"
              @click="views(20)"
              >20</a
            >
          </div>
        </div>
      </div>
      <div class="table-responsive scrollbar">
        <table class="table mb-0">
          <thead class="text-black bg-100">
            <tr>
              <th class="align-middle">DOCUMENTO</th>
              <th class="align-middle">NOMBRE</th>
              <th class="align-middle">EMAIL</th>
              <th class="align-middle">CENTRO_OP</th>
              <th class="align-middle">BODEGA</th>
              <th class="align-middle">TIPO_USUARIO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <th class="align-middle">{{ user.document }}</th>
              <td class="align-middle">
                {{ user.name }}
              </td>
              <td class="align-middle">{{ user.email }}</td>
              <td v-if="user.center_operation_id" class="align-middle">
                {{ user.center_operation_id }}
              </td>
              <td v-else class="align-middle">N/A</td>
              <td v-if="user.sellar_id" class="align-middle">
                {{ user.sellar_id }}
              </td>
              <td v-else class="align-middle">N/A</td>
              <td v-if="user.type_user.id === 1" class="align-middle">
                <span class="badge bg-danger"> {{ user.type_user.name }}</span>
              </td>
              <td v-else class="align-middle">
                <span class="badge bg-success"> {{ user.type_user.name }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="..." class="mx-3 my-2">
        <ul class="pagination">
          <li
            class="page-item"
            v-for="link in links"
            :key="link"
            :class="{ active: link.active == true }"
          >
            <a
              @click="next(link.label)"
              style="cursor: pointer"
              class="page-link"
              >{{ link.label }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <notifications />
</template>
<script>
import axios from "axios";
export default {
  name: "Users",
  data() {
    return {
      urlApi: process.env.VUE_APP_URL_API,
      token: localStorage.getItem("token"),
      users: null,
      links: [],
      page: 1,
      limit: 10,
      search: "",
      option: {},
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    async list(limit = null, page = null) {
      if (limit) {
        this.limit = limit;
      }
      if (page) {
        this.page = page;
      }
      const res = await axios.get(
        this.urlApi +
          "users-list?limit=" +
          this.limit +
          "&page=" +
          this.page +
          "&search=" +
          this.search,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      this.users = res.data.data.data;
      this.links = res.data.data.links.slice(1, res.data.data.links.length - 1);
    },
    next(num) {
      this.list(this.limit, num);
    },
    views(num) {
      this.limit = num;
      this.list(this.limit, this.page);
    },
  },
};
</script>
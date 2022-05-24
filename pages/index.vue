<template>
  <v-row
    class="d-flex align-center justify-center fill-height"
    style="min-height: 100vh"
  >
    <v-col cols="5" class="d-none d-lg-flex d-md-flex">
      <v-img src="login.svg" lazy-src="login.svg" width="100%" />
    </v-col>
    <v-col cols="12" lg="7" class="px-10 d-flex align-center justify-center">
      <v-card
        class="secondary_color py-5"
        width="100%"
        rounded="xl"
        max-width="600px"
      >
        <v-card-title>
          <p
            class="text-h4 text-center primary_font_color--text"
            style="width: 100%"
          >
            Falta pouco...
          </p>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              id="email"
              v-model="user.email"
              label="Email"
              placeholder="Insira seu e-mail"
              outlined
              rounded
              color="secondary_font_color"
              :rules="email_rules"
              ref="input_mail"
            ></v-text-field>
            <v-expand-transition>
              <v-text-field
                id="password"
                transition="scale-transition"
                origin="center center"
                v-show="show_password"
                v-model="user.password"
                label="Senha"
                placeholder="Insira sua senha"
                outlined
                rounded
                color="secondary_font_color"
                :rules="password_rules"
                ref="input_password"
                :append-icon="show_password_ ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_password_ ? 'text' : 'password'"
                @click:append="show_password_ = !show_password_"
              ></v-text-field>
            </v-expand-transition>
            <v-expand-transition>
              <v-btn
                id="btn_login"
                v-show="show_button"
                larger
                block
                rounded
                elevation="0"
                dark
                class="secondary_font_color mt-2"
                @click="submit_login"
              >
                Entrar
              </v-btn>
            </v-expand-transition>
          </v-form>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head() {
    return {
      title: `Login ${this.title}`,
    };
  },
  mounted() {
    this.title = this.$route.query.service_origin
      ? `- ${this.$route.query.service_origin}`
      : "";
  },
  data() {
    return {
      show_password_: false,
      title: "",
      valid: true,
      show_password: false,
      show_button: false,
      show_forgot_password: false,
      user: {
        email: "",
        password: "",
        should_expire: false,
      },
      email_rules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail inválido",
      ],
      password_rules: [
        (v) => !!v || "Senha é obrigatório",
        (v) => v.length >= 6 || "Senha deve ter no mínimo 6 caracteres",
      ],
    };
  },
  methods: {
    submit_login() {
      if (this.$refs.form.validate()) {
        this.$auth
          .loginWith("local", { data: { user: this.user } })
          .then((res) => {
            console.log(res);

            this.$router.push("/user");
          })
          .catch((err) => {
            console.log(err);
            this.$toast.error("Usuário ou senha inválido!");
          });
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  watch: {
    "user.email": function (new_value) {
      this.show_password =
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(new_value) &&
        !!new_value;

      !this.show_password || this.$refs.input_password.focus();
    },
    "user.password": function (new_value) {
      this.show_forgot_password = !!new_value;
      this.show_button = new_value.length >= 6 && !!new_value;
    },
  },
};
</script>

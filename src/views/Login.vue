<template>
<form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Home accounting</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
      >
      <label for="email">Email</label>
      <small class="helper-text invalid" 
        v-if="$v.email.$dirty && !$v.email.required"
      >Email field should not be empty!</small>
      <small 
        class="helper-text invalid" 
        v-else-if="$v.email.$dirty && !$v.email.email"
      >
        Invalid email format!
      </small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
      >
      <label for="password">Пароль</label>
      <small class="helper-text invalid"
        v-if="$v.password.$dirty && !$v.password.required"
      >Please insert password</small>
      <small class="helper-text invalid"
        v-else-if="$v.password.$dirty && !$v.password.minLength"
      >Please insert at least {{$v.password.$params.minLength.min}} characters!. Now it's {{password.length}}</small>
    </div>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Войти
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Нет аккаунта?
      <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </div>
</form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
export default {
    name: 'login',
    data: () => ({
        email: '',
        password: ''
    }),
    validations: {
        email: { email, required },
        password: { required, minLength: minLength(6) },
    },
    methods: {
        submitHandler() {
            console.log(this.$v.password)
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            this.$router.push('/');
        }
    }
}
</script>
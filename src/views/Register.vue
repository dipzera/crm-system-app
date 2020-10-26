<template>
    
<form class="card auth-card" @click.prevent="submitHandler">
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
      <label for="password">Password</label>
      <small class="helper-text invalid"
        v-if="$v.password.$dirty && !$v.password.required"
      >Please insert password</small>
      <small class="helper-text invalid"
        v-else-if="$v.password.$dirty && !$v.password.minLength"
      >Please insert at least {{$v.password.$params.minLength.min}} characters!. Now it's {{password.length}}</small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
      >
      <label for="name">Name</label>
      <small 
      class="helper-text invalid"
      v-if="$v.name.$dirty && !$v.name.required"
      >Please insert your name!</small>
    </div>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Sign Up
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Already have an account?
      <router-link to="/login">Sign In!</router-link>
    </p>
  </div>
</form>

</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
export default {
    name: 'register',
    data: () => ({
        email: '',
        password: '',
        name: '',
    }),
    validations: {
        email: { email, required },
        password: { required, minLength: minLength(6) },
        name: { required },
    },
    methods: {
        submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                email: this.email,
                password: this.password,
                name: this.name,
            }
            this.$router.push('/')
            console.log(formData);
        },
    }
}
</script>
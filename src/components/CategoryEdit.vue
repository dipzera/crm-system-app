<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Edit</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <select ref="select" v-model="current">
                        <option
                            v-for="c of categories"
                            :key="c.id"
                            :value="c.id"
                        >
                            {{ c.title }}
                        </option>
                    </select>
                    <label>Select category</label>
                </div>

                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model="title"
                        :class="{
                            invalid: $v.title.$dirty && !$v.title.required,
                        }"
                    />
                    <label for="name">Name</label>
                    <span
                        class="helper-text invalid"
                        v-if="$v.title.$dirty && !$v.title.required"
                    >
                        Insert category name
                    </span>
                </div>

                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model.number="limit"
                        :class="{
                            invalid: $v.limit.$dirty && !$v.limit.minValue,
                        }"
                    />
                    <label for="limit">Limit</label>
                    <span
                        class="helper-text invalid"
                        v-if="$v.limit.$dirty && !$v.limit.minValue"
                    >
                        Minimal value {{ $v.limit.$params.minValue.min }}
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Submit
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
    validations: {
        title: { required },
        limit: { minValue: minValue(1) },
    },
    watch: {
        current(catId) {
            const { title, limit } = this.categories.find(
                (c) => c.id === catId
            );
            this.limit = limit;
            this.title = title;
        },
    },
    created() {
        const { title, id, limit } = this.categories[0];
        this.current = id;
        this.title = title;
        this.limit = limit;
    },
    props: {
        categories: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        select: null,
        title: "",
        limit: 1,
        current: null,
    }),
    mounted() {
        M.updateTextFields();
        this.select = M.FormSelect.init(this.$refs.select);
    },
    destroyed() {
        if (this.select && this.select.destroy) {
            this.select.destroy();
        }
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }
            const categoryData = {
                id: this.current,
                title: this.title,
                limit: this.limit,
            };
            await this.$store.dispatch("updateCategory", categoryData);
            this.$message("Category successfully updated!");
            this.$emit("updated", categoryData);
        },
    },
};
</script>

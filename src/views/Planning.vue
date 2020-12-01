<template>
    <div>
        <div class="page-title">
            <h3>Planning</h3>
            <h4>{{ info.bill | currency("RON") }}</h4>
        </div>

        <Loader v-if="loading" />
        <p class="center" v-else-if="!categories.length">
            No categories yet!
            <router-link to="/categories">Add new category</router-link>
        </p>
        <section v-else>
            <div v-for="cat of categories" :key="cat.id">
                <p>
                    <strong>{{ cat.title }}</strong>
                    {{ cat.spent | currency("RON") }} out of
                    {{ cat.limit | currency("RON") }}
                </p>
                <div class="progress" v-tooltip="cat.tooltip">
                    <div
                        class="determinate"
                        :class="[cat.progressColor]"
                        :style="{ width: cat.progressPercent + '%' }"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import currencyFilter from "@/filters/currency.filter";
export default {
    name: "planning",
    data: () => ({
        loading: true,
        categories: [],
    }),
    computed: {
        ...mapGetters(["info"]),
    },
    async mounted() {
        const records = await this.$store.dispatch("fetchRecords");
        const categories = await this.$store.dispatch("fetchCategories");
        this.categories = categories.map((cat) => {
            const spent = records
                .filter((r) => r.categoryId === cat.id)
                .filter((r) => r.type === "expense")
                .reduce((total, record) => {
                    return (total += +record.amount);
                }, 0);

            const percent = (100 * spent) / cat.limit;
            const progressPercent = percent > 100 ? 100 : percent;
            const progressColor =
                percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
            const tooltipValue = cat.limit - spent;
            const tooltip = `${
                tooltipValue < 0 ? "Limit succeded by" : "Left"
            } ${currencyFilter(Math.abs(tooltipValue))}`;
            return {
                ...cat,
                progressPercent,
                progressColor,
                spent,
                tooltip,
            };
        });
        this.loading = false;
    },
};
</script>

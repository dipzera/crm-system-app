<template>
    <div>
        <div class="page-title">
            <h3>History of records</h3>
        </div>

        <div class="history-chart">
            <canvas ref="canvas"></canvas>
        </div>
        <Loader v-if="loading" />
        <p class="center" v-else-if="!records.length">
            No records yet!
            <router-link to="/record">Add your first record!</router-link>
        </p>
        <section v-else>
            <HistoryTable :records="items" />

            <Paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
            />
        </section>
    </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable";
import { Pie } from "vue-chartjs";
export default {
    metaInfo() {
        return {
            title: this.$title("History"),
        };
    },
    name: "history",
    extends: Pie,
    mixins: [paginationMixin],
    data: () => ({
        loading: true,
        records: [],
    }),
    components: {
        HistoryTable,
    },
    async mounted() {
        this.records = await this.$store.dispatch("fetchRecords");
        const categories = await this.$store.dispatch("fetchCategories");
        this.setup(categories);
        this.loading = false;
    },
    methods: {
        setup(categories) {
            this.setupPagination(
                this.records.map((record) => {
                    return {
                        ...record,
                        categoryName: categories.find(
                            (cat) => cat.id === record.categoryId
                        ).title,
                        typeClass: record.type === "income" ? "green" : "red",
                        typeText:
                            record.type === "income" ? "Income" : "Expense",
                    };
                })
            );
            this.renderChart({
                labels: categories.map((cat) => cat.title),
                datasets: [
                    {
                        label: "Expenses by category",
                        data: categories.map((cat) => {
                            return this.records.reduce((total, r) => {
                                if (
                                    r.categoryId === cat.id &&
                                    r.type === "expense"
                                ) {
                                    total += +r.amount;
                                }
                                return total;
                            }, 0);
                        }),
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        },
    },
};
</script>

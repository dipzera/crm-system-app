<template>
    <div>
        <div class="page-title">
            <h3>Accounting</h3>
            <button
                class="btn waves-effect waves-light btn-small"
                @click="refresh"
            >
                <i class="material-icons">refresh</i>
            </button>
        </div>
        <Loader v-if="loading" />
        <div v-else class="row">
            <HomeBill :rates="currency.rates" />
            <HomeCurrency :rates="currency.rates" :date="currency.date" />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";

export default {
    name: "Home",
    data: () => ({
        loading: true,
        currency: null,
    }),
    async mounted() {
        this.currency = await this.$store.dispatch("fetchCurrency");
        this.loading = false;
    },
    methods: {
        async refresh() {
            this.loading = true;
            setTimeout(async () => {
                this.currency = await this.$store.dispatch("fetchCurrency");
                this.loading = false;
            }, 1000);
        },
    },
    components: {
        HomeBill,
        HomeCurrency,
    },
};
</script>

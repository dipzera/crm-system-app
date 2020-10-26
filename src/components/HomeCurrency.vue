<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Exchange rate</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Currecy</th>
                            <th>Rate</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="currency of currencies" :key="currency">
                            <td>{{ currency }}</td>
                            <td>{{ rates[currency] }}</td>
                            <td>{{ date | date("date") }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["rates", "date"],
    data: () => ({
        currencies: ["RON", "USD", "EUR"],
    }),
};
</script>

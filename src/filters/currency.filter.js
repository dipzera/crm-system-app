export default function currencyFilter(value, currency = "RON") {
    return new Intl.NumberFormat("ro-RO", {
        style: "currency",
        currency,
    }).format(value);
}

<template>
    <div>
        <div class="page-title">
            <h3>Categories</h3>
        </div>
        <section>
            <div class="row">
                <CategoryCreate @created="addNewCategory" />
                <CategoryEdit />
            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
export default {
    name: "categories",
    data: () => ({
        caetgories: [],
    }),
    components: {
        CategoryCreate,
        CategoryEdit,
    },
    methods: {
        addNewCategory(category) {
            this.categories.push(category);
            console.log(this.categories);
        },
    },
};
</script>

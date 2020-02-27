import VueRouter from 'vue-router'
import main from './view/main.vue'
import categoryEdit from './view/CategoryEdit.vue'
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'main',
            component: main,
            children: [{
                path: '/categories/create',
                component: categoryEdit,
                name: 'categoryEdit',
            }]

        }
    ]
})
export default router
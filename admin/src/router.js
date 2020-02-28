import VueRouter from 'vue-router'
import main from './view/main.vue'
import categoryEdit from './view/CategoryEdit.vue'
import categoryList from './view/CategoryList.vue'
import ItemEdit from './view/itemEdit.vue'
import ItemList from './view/itemList.vue'


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
            },
            {
                path: '/categories/list',
                component: categoryList,
                name: 'categoryList',
            },
            {
                path: '/categories/edit/:id',
                component: categoryEdit,
                props: true  // props 将组件和路由解耦
            },
            {
                path: '/items/create',
                component: ItemEdit,
                name: 'ItemEdit',
            },
            {
                path: '/items/list',
                component: ItemList,
                // name: 'categoryList',
            },
            {
                path: '/items/edit/:id',
                component: ItemEdit,
                props: true  // props 将组件和路由解耦
            },
            ]

        }

    ]
})
export default router
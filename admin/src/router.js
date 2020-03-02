import VueRouter from 'vue-router'
import main from './view/main.vue'
import categoryEdit from './view/Category/CategoryEdit.vue'
import categoryList from './view/Category/CategoryList.vue'
import ItemEdit from './view/Item/itemEdit.vue'
import ItemList from './view/Item/itemList.vue'
import heroList from './view/Hero/heroList.vue'
import heroEdit from './view/Hero/heroEdit.vue'
import ArticleEdit from './view/Article/articleEdit.vue'
import ArticleList from './view/Article/articleList.vue'
import AdsEdit from './view/Ads/edit.vue'
import AdsList from './view/Ads/list.vue'
import UserEdit from './view/Admin_User/edit.vue'
import UserList from './view/Admin_User/list.vue'
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/view/Login')
        },
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
            {
                path: '/heroes/create',
                component: heroEdit,
                // name: 'ItemEdit',
            },
            {
                path: '/heroes/list',
                component: heroList,
                // name: 'categoryList',
            },
            {
                path: '/heroes/edit/:id',
                component: heroEdit,
                props: true  // props 将组件和路由解耦
            },

            {
                path: '/articles/create',
                component: ArticleEdit,
            },
            {
                path: '/articles/list',
                component: ArticleList,
                // name: 'categoryList',
            },
            {
                path: '/articles/edit/:id',
                component: ArticleEdit,
                props: true  // props 将组件和路由解耦
            },

            {
                path: '/ads/create',
                component: AdsEdit,
            },
            {
                path: '/ads/list',
                component: AdsList,
                // name: 'categoryList',
            },
            {
                path: '/ads/edit/:id',
                component: AdsEdit,
                props: true  // props 将组件和路由解耦
            },

            {
                path: '/admin_users/create',
                component: UserEdit,
            },
            {
                path: '/admin_users/list',
                component: UserList,
                // name: 'categoryList',
            },
            {
                path: '/admin_users/edit/:id',
                component: UserEdit,
                props: true  // props 将组件和路由解耦
            },
            ]

        }

    ]
})
export default router
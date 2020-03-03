import VueRouter from 'vue-router'


export const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'main',
            meta: {
                isPublic: true
            },
            component: () => import('@/view/main'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    meta: {
                        isPublic: true
                    },
                    component: () => import('@/view/Home/index'),
                }
            ]
        },
        {
            path: '/about',
            name: 'about',
            meta: {
                isPublic: true
            },
            component: () => import('@/view/about'),
        }
    ]
})

import VueRouter from 'vue-router'


export const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home',
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
                },
                {
                    path: '/article/:id',
                    name: 'article',
                    component: () => import('@/view/Alticle'),
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
        },
        {
            path: '/heroes/:id',
            name: 'heroes',
            component: () => import('@/view/Heroes'),
        }
    ]
})

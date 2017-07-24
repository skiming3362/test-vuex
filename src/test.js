/*
* @Author: skiming
* @Date:   2017-07-16 22:00:55
* @Last Modified by:   chenming
* @Last Modified time: 2017-07-24 16:46:44
*/

import './test.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import App from './component/App.vue';

import index from './component/index.vue';
import User from './component/user.vue';
import User2 from './component/user2.vue';
import UserProfile from './component/user-profile.vue';
import UserHome from './component/user-home.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);

const routes = [
    { path: '/foo', alias: '/bar', component: index, name: 'index' },
    { 
        path: '/user/:id/post/:post_id', 
        components: {
            default: User,
            a: User2
        },
        props: {
            default: true,
            a: false
        },
        // name: 'user',
        children: [
            {
                path: 'profile/:profile_id',
                component: UserProfile
            },
            {
                path: 'home',
                name: 'user-home',
                component: UserHome,
                meta: { requiresAuth: true },
                beforeEnter: (to, from, next) => {
                    console.log('this is only called in route UserHome');
                    next();
                }
            },
        ]
    },
    { path: '/', redirect: '/foo' }
];

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log(123);
        next();
    } else {
        next();
    }
});

router.afterEach(route => {
    console.log('afterEach called');
    console.log(route);
});

const store = new Vuex.Store({
    state: {
        count: 0,
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        doneTodos: state => state.todos.filter(todo => todo.done),
        doneTodosCount: (state, getters) => getters.doneTodos.length,
        getTodoById: (state, getters) => id => state.todos.find(todo => todo.id === id)
    },
    mutations: {
        increment: state => state.count++
    }
});

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
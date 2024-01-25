// 페이지를 관리해주는 구성 파일
import {createRouter,createWebHashHistory} from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter({
    // Hash와 history모드로 나뉜다.
    // hash 모드는 특정 주소로 이동할때, /#/를 붙여서 접근하는 방식
    // hash모드를 사용하면 특정 주소가 없을때 방지할 수 있다.
    history:createWebHashHistory(),
    scrollBehavior(){
        return{ top:0 }
    },
    // pages
    // https://google.com
    routes:[
        {
            path: '/',
            component: Home
        },
        {
            path: '/movie/:id',
            component: Movie
        }
        ,
        {
            path: '/about',
            component: About
        },{
            path: '/:notFound(.*)',
            component: NotFound
        }
    ]
})
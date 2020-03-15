import vuerouter from 'vue-router'
import Vue from 'vue'
import home from '../components/home.vue'
import songlist from '../components/songlist.vue'
import playsong from '../components/playsong.vue'
import playmv from '../components/playmv.vue'
import comment from '../components/comment.vue'

Vue.use(vuerouter)

const router=new vuerouter({
    routes:[
        {
            path:'/',
            component:home
        },
        {
            path:'/songlist',
            component:songlist
        },
        {
            path:'/playsong',
            component:playsong
        },{
            path:'/playmv',
            component:playmv
        },
        {
            path:'/comment',
            component:comment
        }
    ]
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { isIOS } from '/@/utils'
import store from '/@/store'

const Home = () => import('/@/views/home.vue')
const Deposit = () => import('/@/views/deposit.vue')
const Member = () => import('/@/views/member.vue')
const Register = () => import('/@/views/register.vue')
const Login = () => import('/@/views/login.vue')
const Password = () => import('/@/views/password.vue')
const Category = () => import('/@/views/category.vue')
const More = () => import('/@/views/more.vue')
const Bulletin = () => import('/@/views/bulletin.vue')
const BulletinPage = () => import('/@/views/bulletinPage.vue')
const Read = () => import('/@/views/read.vue')
const Bookshelf = () => import('/@/views/bookshelf.vue')
const HistoryBooks = () => import('/@/components/bookshelf/HistoryBooks.vue')
const MyBooks = () => import('/@/components/bookshelf/MyBooks.vue')
const Directory = () => import('/@/views/directory.vue')
const Search = () => import('/@/views/search.vue')
const Download = () => import('/@/views/download.vue')
const Retrieve = () => import('/@/views/retrieve.vue')
const Recommend = () => import('/@/views/recommend.vue')
const Record = () => import('/@/views/record.vue')
const Customer = () => import('/@/views/customer.vue')
const NotFound = () => import('/@/views/notFound.vue')

// 視頻
const Video = () => import('/@/views/video/index.vue')
const Player = () => import('/@/views/video/player.vue')
const Tag = () => import('/@/views/video/tag.vue')
const MyVideo = () => import('/@/views/video/myVideo.vue')
const HistoryVideos = () => import('/@/components/video/myVideo/HistoryVideos.vue')
const MyVideos = () => import('/@/components/video/myVideo/MyVideos.vue')
const SearchVideo = () => import('/@/views/video/search.vue')
const Ranking = () => import('/@/views/video/ranking.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '奈斯漫画' }
  },
  {
    path: '/deposit',
    name: 'Deposit',
    component: Deposit,
    meta: { title: '充值中心' }
  },
  {
    path: '/member',
    name: 'Member',
    component: Member,
    meta: { title: '个人中心' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: '注册会员' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录会员' }
  },
  {
    path: '/password',
    name: 'Password',
    component: Password,
    meta: { title: '修改密码' }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: { title: '漫画分类' }
  },
  {
    path: '/more/:id',
    name: 'More',
    component: More,
    meta: { title: '更多' }
  },
  {
    path: '/bulletin',
    name: 'Bulletin',
    component: Bulletin,
    meta: { title: '公告中心' }
  },
  {
    path: '/bulletin/:id',
    name: 'BulletinPage',
    component: BulletinPage,
    meta: { title: '公告中心' }
  },
  {
    path: '/read/:chapterId(\\d+)?',
    name: 'Read',
    component: Read,
    meta: { title: '' }
  },
  {
    path: '/bookshelf',
    name: 'Bookshelf',
    component: Bookshelf,
    meta: { title: '书架' },
    children: [
      {
        path: 'favorite',
        component: MyBooks,
        meta: { title: '我的书架' }
      },
      {
        path: 'history',
        component: HistoryBooks,
        meta: { title: '阅读记录' }
      }
    ]
  },
  {
    path: '/directory/:id',
    name: 'Directory',
    component: Directory,
    meta: { title: '目录' }
  },
  {
    path: '/search/:keyword',
    name: 'Search',
    component: Search,
    meta: { title: '书籍搜索' }
  },
  {
    path: '/download',
    name: 'Download',
    component: Download,
    meta: { title: '下载中心' }
  },
  {
    path: '/retrieve',
    name: 'Retrieve',
    component: Retrieve,
    meta: { title: '找回用户' }
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    meta: { title: '分享推广' }
  },
  {
    path: '/record',
    name: 'Record',
    component: Record,
    meta: { title: '消费记录' }
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    meta: { title: '客服中心' }
  },

  // 影音
  {
    path: '/video',
    name: 'Medio',
    component: Video,
    meta: { title: '奈斯视频' }
  },
  {
    path: '/video/tag/:id',
    name: 'Tag',
    component: Tag,
    meta: { title: '视频分类' }
  },
  {
    path: '/video/player/:id',
    name: 'Player',
    component: Player,
    meta: { title: '视频播放' }
  },
  {
    path: '/video/myVideo',
    name: 'MyVideo',
    component: MyVideo,
    meta: { title: '我的视频' },
    children: [
      {
        path: 'favorite',
        component: MyVideos,
        meta: { title: '我的视频' }
      },
      {
        path: 'history',
        component: HistoryVideos,
        meta: { title: '观看记录' }
      }
    ]
  },
  {
    path: '/video/search/:keyword',
    name: 'SearchVideo',
    component: SearchVideo,
    meta: { title: '视频搜索' }
  },
  {
    path: '/video/ranking/:id',
    name: 'Ranking',
    component: Ranking,
    meta: { title: '视频榜单' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  },
  routes
})

router.beforeEach(to => {
  if (isIOS() && to.path.indexOf('video') !== -1) {
    return ElMessageBox.alert('苹果系统暂未开放视频服务，<br>请使用安卓系统装置访问', '抱歉 (シ_ _)シ', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true,
      showClose: false,
      type: 'warning'
    }).then(() => {
      return {
        path: '/'
      }
    })
  }
  document.title = to.meta.title || ''
})

router.afterEach(() => {
  const { state, getters, dispatch } = store
  const waitInitLoading = () => {
    setTimeout(() => {
      if (state.isAppInitialComplete) {
        // 判斷資料裡是否有返回的書本
        if (!getters['backRecommendchapterIds'].length) return
        // 判斷是否是最後一頁要做返回事件
        if (window.history.state.back) {
          // 不是最後一頁: 如果有返回過則重置返回紀錄 及 返回開始
          if (state.comebackCount) {
            dispatch('setComebackCount', 0)
            dispatch('toggleBackStart', false)
          }
          window.removeEventListener('popstate', backRecommend)
        } else {
          window.history.pushState(null, null)
          if (state.isBackStart) return
          window.addEventListener('popstate', backRecommend, false)
        }
      } else {
        waitInitLoading()
      }
    }, 500)
  }

  if (window.history && window.history.pushState) {
    waitInitLoading()
  }
})

const backRecommend = async () => {
  const { dispatch, state, getters } = store

  // 判斷是否返回開始
  if (!state.isBackStart) dispatch('toggleBackStart', true)

  // 判斷返回到哪層
  if (state.comebackCount >= getters['backRecommendchapterIds'].length) {
    await dispatch('setComebackCount', 0)
    return ElMessageBox.confirm(
      `现在 <span style="color: red">下载APP</span> 即可每日自动领取 <span style="color: red">80金币</span>`,
      '要走了吗?',
      {
        dangerouslyUseHTMLString: true,
        showClose: false,
        cancelButtonText: '取消',
        confirmButtonText: '去下载'
      }
    )
      .then(() => {
        router.replace({
          path: '/download'
        })
      })
      .catch(() => {
        router.replace({
          path: '/'
        })
      })
  }

  await dispatch('setComebackCount', state.comebackCount + 1)
  router.replace({
    path: `/read/${getters['backRecommendchapterIds'][state.comebackCount - 1]}`
  })
}

export default router

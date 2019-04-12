import Vue from 'vue';
import Router from 'vue-router';

//IGK社区管理
const community = () => import ('@/view/Community/Community.vue');
//我的社员
const myMember = () => import ('@/view/Community/myMember.vue');
//激活记录
const actRecord = () => import ('@/view/Community/actRecord.vue');
//激活社員
const actMembers = () => import ('@/view/Community/actMembers.vue');
//申請加入
const applications = () => import ('@/view/Community/applications.vue');
//激活社員（投票）
const actVoting = () => import ('@/view/Community/actVoting.vue');
//激活记录
const comLevel = () => import ('@/view/Community/ComLevel.vue');
//挖矿记录
const treasureRecord = () => import ('@/view/Community/treasureRecord.vue');
//领取奖励
const receiveAwards = () => import ('@/view/Community/receiveAwards.vue');
//邀请好友
const InviteFriends = () => import ('@/view/Community/InviteFriends.vue');
//資訊詳情
const detail = () => import ('@/view/Community/detail.vue');
//資訊詳情
const reg_ag = () => import ('@/view/Community/reg_ag.vue');
//客服留言
const chat = () => import ('@/view/Community/chat.vue');
//我的好友
const myFriends = () => import ('@/view/Community/myFriends.vue');
//igk社區
const Igkcom = () => import ('@/view/Community/Igkcom.vue');

//igk注册
const register = () => import ('@/view/Community/register.vue');


Vue.use(Router);

export default new Router({
  routes: [
    //IGK社区管理
    {path: '/community',name:'community', component: community},
    //我的社员
    {path: '/myMember',name:'myMember', component: myMember},
    //激活记录
    {path: '/actRecord',name:'actRecord', component: actRecord},
    //激活社員
    {path: '/actMembers',name:'actMembers',component: actMembers},
    //申請加入
    {path: '/applications',name:'applications',component: applications},
    //激活社員
    {path: '/actVoting',name:'actVoting', component: actVoting},
    //IGK 社區管理等级
    {path: '/comLevel',name:'comLevel', component: comLevel},
    //领取奖励
    {path: '/receiveAwards',name:'receiveAwards', component: receiveAwards},
    //邀请好友
    {path: '/InviteFriends',name:'inviteFriends', component: InviteFriends},
    //資訊詳情
    {path: '/detail/:id',name:'detail', component: detail},
    //資訊詳情
    {path: '/reg_ag/:id',name:'reg_ag', component: reg_ag},
    //客服留言
    {path: '/chat',name:'chat', component: chat},
    //我的好友
    {path: '/myFriends',name:'myFriends', component: myFriends},
    //挖矿记录
    {path: '/treasureRecord',name:'treasureRecord', component: treasureRecord},
    //igk社區
    {path: '/Igkcom',name:'Igkcom', component: Igkcom},
    //注册
    {path: '/register', name: 'register', component: register},

  ]
})

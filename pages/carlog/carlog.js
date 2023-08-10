

Page({
  data: {
     tabelData: {
       data: []
 },
 pageindex: 0,
 pagesize: 20,
 value_carno: "",
 value_driver: "",



},

onLoad() {

  this.setData({
    pageindex: 0,
    value_hidden: true,

  });
  this.getdata();

  
},
onPullDownRefresh() {
 
console.log("下拉");

},
onReachBottom(){
 console.log("上拉");
 this.setData({pageindex: this.data.pageindex + 1});
 this.getdata();
},


async getdata(){
// console.log(this.data.tabelData.data);
dd.showLoading({ content: '加载中...' });

const res = await dd.httpRequest({
 headers: {
   "Content-Type": "application/json"
 },
 url: 'http://wlsl3q.forestpacking.com:8887/api/CarLog/Select',
 method: 'POST',
 
 // 需要手动调用JSON.stringify将数据进行序列化
 data: JSON.stringify({
  
   carNo: this.data.value_carno,
   driver: this.data.value_driver,
   pageindex: this.data.pageindex,
   pagesize: this.data.pagesize,

 }),
 dataType: 'json',

 success: function(res) {
   
   
  
 }, 
 fail: function(res) {
   console.log(JSON.stringify(res.data));
   
 },
 complete: function(res) {
   // console.log("1");

 }
   });



dd.hideLoading();

//绑定数据
if(this.data.pageindex==0){

   this.setData(
     {
       tabelData: {
         data: res.data,
       }
     }
   );

}else{
   //加载数据
   this.setData(
     {
       tabelData: {
         data: [...this.data.tabelData.data ,...res.data],
       }
     }
   );

}
  


},
// 搜索栏

_onNavItemTap(e) {
const index = e.currentTarget.dataset.index;

if (this.onDropdownNavItemTap) {
 this.onDropdownNavItemTap(e, index);
} else {
 console.warn('no onDropdownNavItemTap method');
}
},
_catchListItemTap(e) {
const { index, parentIndex, title } = e.currentTarget.dataset;

if (this.catchDropdownNavItemTap) {
 this.catchDropdownNavItemTap(e, parentIndex, index, title);
} else {
 console.warn('no catchDropdownNavItemTap method');
}
},
_catchBgTap(e) {
if (this.catchDropdownBgTap) {
 this.catchDropdownBgTap(e);
} else {
 console.warn('no catchDropdownBgTap method');
}
},

onDropdownNavItemTap(e, index) {

if(this.data.value_hidden ){
 this.setData({
   value_hidden: false,
 });

}else  {
 this.setData({
   value_hidden: true,
   pageindex: 0,
 });
 this.getdata();

}

console.log(this.data.value_hidden);



},
catchDropdownNavItemTap(e, parentIndex, index, title) {


},
catchDropdownBgTap(e) {


},
handle_carno(e){
this.setData({
  value_carno: e.detail.value} )
},
handle_driver(e){
this.setData({
  value_driver: e.detail.value} )
},





});

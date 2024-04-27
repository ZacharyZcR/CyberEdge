import{d as o,c as i,n as l}from"./index-92736d81.js";import{C as r}from"./close-circle-filled-fba6f61a.js";import{C as c,E as h}from"./error-circle-filled-7a90e8e3.js";const u={components:{SearchIcon:o},data(){return this.$createElement,{data:[],originalData:[],size:"medium",tableLayout:!1,stripe:!0,bordered:!0,hover:!1,showHeader:!0,selectedRowKeys:[1],searchData:"",isSearchFocus:!1,columns:[{colKey:"row-select",type:"multiple",width:50},{colKey:"task_id",title:"任务ID",width:"300",ellipsis:!0},{colKey:"target",title:"扫描目标",width:"200",ellipsis:!0},{colKey:"status",title:"状态",width:"100",cell:(e,{row:t})=>{const s={P:{label:"待处理",theme:"warning",icon:r},R:{label:"进行中",theme:"success",icon:r},C:{label:"已完成",theme:"success",icon:c},E:{label:"错误",theme:"danger",icon:h}}[t.status]||{label:"未知",theme:"default",icon:r};return e("t-tag",{attrs:{shape:"round",theme:s.theme,variant:"light-outline",icon:e(s.icon)}},[s.label])}},{colKey:"result_count",title:"结果条数",width:"100"},{colKey:"start_time",title:"开始时间",width:"200"},{colKey:"end_time",title:"结束时间",width:"200"},{colKey:"from",title:"上游资产",width:"200"},{colKey:"operation",title:"操作",width:200,cell:(e,{row:t})=>{const a=!(t.status==="E"||t.status==="C");return e("div",[e("t-button",{props:{theme:"primary",ghost:!0,disabled:a},style:{marginRight:"8px"},on:{click:()=>this.viewDetails(t.task_id)}},"查看详情"),e("t-button",{props:{theme:"danger",ghost:!0},on:{click:()=>this.deleteTask(t.task_id)}},"删除")])}}],pagination:{current:1,pageSize:50,total:0,showJumper:!0}}},methods:{changeSearchFocus(e){this.isSearchFocus=e,e||this.filterData()},filterData(){this.searchData?this.data=this.originalData.filter(e=>Object.values(e).some(a=>a&&a.toString().toLowerCase().includes(this.searchData.toLowerCase()))):this.data=this.originalData},fetchResults(){this.$request.get("/api/port_scanner/all_tasks",{headers:{"Content-Type":"application/json"}}).then(e=>{i.success("所有任务已获取"),this.data=e.data.tasks,this.originalData=e.data.tasks,this.pagination.total=e.data.tasks.length}).catch(e=>{console.log(e),i.error("获取失败")})},viewDetails(e){this.$router.push({path:"/port/list",query:{task_id:e}})},deleteTask(e){this.$request.delete(`/api/port_scanner/tasks/${e}/delete`,{headers:{"Content-Type":"application/json"}}).then(()=>{i.success("任务删除成功"),this.data=this.data.filter(t=>t.task_id!==e),this.pagination.total=this.data.length}).catch(t=>{console.error(t),i.error("删除失败")})},rehandleSelectChange(e,{selectedRowData:t}){this.selectedRowKeys=e},onPageChange(e,t){this.pagination.defaultCurrent||(this.pagination.current=e.current,this.pagination.pageSize=e.pageSize)}},mounted(){this.fetchResults()}};var d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("t-space",{attrs:{direction:"vertical"}},[a("t-input",{class:{"hover-active":e.isSearchFocus},attrs:{placeholder:"请输入搜索内容"},on:{blur:function(s){return e.changeSearchFocus(!1)},focus:function(s){return e.changeSearchFocus(!0)},input:e.filterData},scopedSlots:e._u([{key:"prefix-icon",fn:function(){return[a("search-icon",{staticClass:"icon",attrs:{size:"16"}})]},proxy:!0}]),model:{value:e.searchData,callback:function(s){e.searchData=s},expression:"searchData"}}),a("t-table",{attrs:{rowKey:"task_id",data:e.data,columns:e.columns,stripe:e.stripe,bordered:e.bordered,hover:e.hover,size:e.size,"table-layout":e.tableLayout?"auto":"fixed",pagination:e.pagination,showHeader:e.showHeader,"selected-row-keys":e.selectedRowKeys,cellEmptyContent:"-",resizable:""},on:{"select-change":e.rehandleSelectChange,"page-change":e.onPageChange}})],1)},p=[];const n={};var g=l(u,d,p,!1,m,null,null,null);function m(e){for(let t in n)this[t]=n[t]}const v=function(){return g.exports}();export{v as default};

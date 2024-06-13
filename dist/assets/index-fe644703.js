import{d as u,c as i,n as h}from"./index-00af24fc.js";import{C as o}from"./close-circle-filled-93cbb8bf.js";import{C as d,E as p}from"./error-circle-filled-1a5e5a65.js";const f={components:{SearchIcon:u},data(){return this.$createElement,{data:[],originalData:[],size:"medium",tableLayout:!1,stripe:!0,bordered:!0,hover:!1,showHeader:!0,selectedRowKeys:[1],inputValue:null,searchData:"",isSearchFocus:!1,columns:[{colKey:"id",title:"#",width:"50",ellipsis:!0},{colKey:"url",title:"URL",width:"300",cell:(t,{row:e})=>t("t-link",{attrs:{theme:"primary",hover:"color",href:e.url,target:"_blank"}},[e.url,t("JumpIcon",{slot:"suffixIcon"})])},{colKey:"path",title:"路径",width:"300",cell:(t,{row:e})=>t("t-link",{attrs:{theme:"primary",hover:"color",href:e.path,target:"_blank"}},[e.path,t("JumpIcon",{slot:"suffixIcon"})])},{colKey:"content_type",title:"内容类型",width:"200",ellipsis:!0},{colKey:"status",title:"状态码",width:"100",cell:(t,{row:e})=>{let a={label:`HTTP (${e.status})`,theme:"default",icon:t(o)};return e.status>=200&&e.status<300?a={label:`HTTP (${e.status})`,theme:"success",icon:t(d)}:e.status>=300&&e.status<500?a={label:`HTTP (${e.status})`,theme:"warning",icon:t(p)}:e.status>=500&&(a={label:`HTTP (${e.status})`,theme:"danger",icon:t(o)}),t("t-tag",{attrs:{shape:"round",theme:a.theme,variant:"light-outline"}},[a.icon,a.label])}},{colKey:"length",title:"响应长度",width:"150"},{colKey:"from_asset",title:"上游资产",width:"200",ellipsis:!0},{colKey:"operation",title:"操作",width:120,cell:(t,{row:e})=>t("t-button",{attrs:{theme:"danger",ghost:!0},on:{click:()=>this.deleteResult(e.id)}},["删除"])}],pagination:{current:1,pageSize:50,total:0,showJumper:!0}}},methods:{changeSearchFocus(t){this.isSearchFocus=t,t||this.filterData()},filterData(){this.searchData?this.data=this.originalData.filter(t=>Object.values(t).some(a=>a&&a.toString().toLowerCase().includes(this.searchData.toLowerCase()))):this.data=this.originalData},fetchResults(t){const e={task_id:t};this.$request.post("/api/path_scanner/task_status",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}).then(a=>{const s=a.data.task_result.paths,n=s.length;n>0?(i.success(`路径扫描结果已获取，共${n}条数据。`),this.data=s,this.originalData=s,this.pagination.total=n):(this.data=s,this.originalData=s,this.pagination.total=n,i.info("没有获取到路径扫描结果。"))}).catch(a=>{console.log(a),i.error("获取失败")})},deleteResult(t){this.$request.delete(`/api/path_scanner/paths/${t}/delete`,{headers:{"Content-Type":"application/json"}}).then(()=>{i.success("结果删除成功"),this.data=this.data.filter(e=>e.id!==t),this.pagination.total=this.data.length}).catch(e=>{console.error(e),i.error("删除失败")})},rehandleSelectChange(t,{selectedRowData:e}){this.selectedRowKeys=t},onPageChange(t,e){this.pagination.defaultCurrent||(this.pagination.current=t.current,this.pagination.pageSize=t.pageSize)},pruningStatus(t){const e=this.$route.query.task_id;this.$request.delete(`/api/path_scanner/pruning/${e}/status?status_code=${t}`).then(a=>{i.success(a.data.message),this.fetchResults(e)}).catch(a=>{console.error(a),i.error("删除特定状态的访问路径失败")})},exportToCSV(){const t=[],e=["ID","URL","内容类型","状态码","响应长度"];t.push(e.join(",")),this.data.forEach(r=>{const c=[r.id,`"${r.url}"`,r.content_type,r.status,r.length];t.push(c.join(","))});const a=t.join(`
`),s=new Blob([a],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(s),n.download="path-scan-results.csv",n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}},mounted(){const t=this.$route.query.task_id;this.fetchResults(t)}};var g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("t-space",{attrs:{direction:"vertical"}},[a("t-input",{class:{"hover-active":t.isSearchFocus},attrs:{placeholder:"请输入搜索内容"},on:{blur:function(s){return t.changeSearchFocus(!1)},focus:function(s){return t.changeSearchFocus(!0)},input:t.filterData},scopedSlots:t._u([{key:"prefix-icon",fn:function(){return[a("search-icon",{staticClass:"icon",attrs:{size:"16"}})]},proxy:!0}]),model:{value:t.searchData,callback:function(s){t.searchData=s},expression:"searchData"}}),[a("t-space",[a("t-input",{attrs:{placeholder:"请输入状态码"},model:{value:t.inputValue,callback:function(s){t.inputValue=s},expression:"inputValue"}}),a("t-button",{attrs:{theme:"primary"},on:{click:function(s){return t.pruningStatus(t.inputValue)}}},[t._v("剪枝 XXX状态码去除")])],1)],[a("t-space",[a("t-button",{attrs:{theme:"primary"},on:{click:t.exportToCSV}},[t._v("导出CSV")])],1)],a("t-table",{attrs:{rowKey:"id",data:t.data,columns:t.columns,stripe:t.stripe,bordered:t.bordered,hover:t.hover,size:t.size,"table-layout":t.tableLayout?"auto":"fixed",pagination:t.pagination,showHeader:t.showHeader,"selected-row-keys":t.selectedRowKeys,cellEmptyContent:"-",resizable:""},on:{"select-change":t.rehandleSelectChange,"page-change":t.onPageChange}})],2)},m=[];const l={};var _=h(f,g,m,!1,y,null,null,null);function y(t){for(let e in l)this[e]=l[e]}const S=function(){return _.exports}();export{S as default};
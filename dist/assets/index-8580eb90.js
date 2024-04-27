import{J as h}from"./jump-039b2cc4.js";import{d as m,c,n as T}from"./index-92736d81.js";import{C as _,E as S}from"./error-circle-filled-7a90e8e3.js";const f={components:{JumpIcon:h,SearchIcon:m},data(){const t=this.$createElement;return{data:[],originalData:[],size:"medium",tableLayout:!1,stripe:!0,bordered:!0,hover:!1,showHeader:!0,selectedRowKeys:[1],searchData:"",isSearchFocus:!1,renderSuffixIcon:()=>t(h),columns:[{colKey:"row-select",type:"multiple",width:50},{colKey:"id",title:"#",width:"50",ellipsis:!0},{colKey:"url",title:"URL",width:"150",cell:(a,{row:e})=>a("t-link",{attrs:{theme:"primary",hover:"color",href:"//"+e.url,target:"_blank"}},[e.url,a(h,{slot:"suffixIcon"})])},{colKey:"ip_address",title:"IP 地址",width:"150",ellipsis:!0},{colKey:"port_number",title:"端口号",width:"100"},{colKey:"service_name",title:"服务名称",width:"200",ellipsis:!0},{colKey:"protocol",title:"协议",width:"100"},{colKey:"state",title:"状态",width:"150",cell:(a,{row:e})=>{const s={open:{label:"开放",theme:"success",icon:a(_)},closed:{label:"关闭",theme:"danger",icon:a(S)}}[e.state.toLowerCase()]||{label:e.state,theme:"default"};return a("t-tag",{attrs:{shape:"round",theme:s.theme,variant:"light-outline"}},[s.icon,s.label])}},{colKey:"http_code",title:"HTTP状态码",width:"100",ellipsis:!0},{colKey:"http_title",title:"HTTP标题",width:"200",ellipsis:!0},{colKey:"https_code",title:"HTTPS状态码",width:"100",ellipsis:!0},{colKey:"https_title",title:"HTTP标题",width:"200",ellipsis:!0},{colKey:"operation",title:"操作",width:120,cell:(a,{row:e})=>a("t-button",{attrs:{theme:"danger",ghost:!0},on:{click:()=>this.deleteResult(e.id)}},["删除"])}],pagination:{current:1,pageSize:50,total:0,showJumper:!0}}},methods:{changeSearchFocus(t){this.isSearchFocus=t,t||this.filterData()},filterData(){this.searchData?this.data=this.originalData.filter(t=>Object.values(t).some(e=>e&&e.toString().toLowerCase().includes(this.searchData.toLowerCase()))):this.data=this.originalData},fetchResults(t){const a={task_id:t};this.$request.post("/api/port_scanner/task_status",JSON.stringify(a),{headers:{"Content-Type":"application/json"}}).then(e=>{const o=e.data.task_result.ports,s=o.length;s>0?(c.success(`端口扫描结果已获取，共${s}条数据。`),this.data=o,this.originalData=o,this.pagination.total=s):c.info("没有获取到端口扫描结果。")}).catch(e=>{console.log(e),c.error("获取失败")})},deleteResult(t){this.$request.delete(`/api/port_scanner/ports/${t}/delete`,{headers:{"Content-Type":"application/json"}}).then(()=>{c.success("结果删除成功"),this.data=this.data.filter(a=>a.id!==t),this.pagination.total=this.data.length}).catch(a=>{console.error(a),c.error("删除失败")})},rehandleSelectChange(t,{selectedRowData:a}){this.selectedRowKeys=t},startPathScan(t,a=null){const o=new URLSearchParams(window.location.search).get("task_id"),s=this.selectedRowKeys.map(n=>{const i=this.data.find(d=>d.id===n);if(i&&i.ip_address&&i.port_number)return`${t.includes("HTTPS")?"https":"http"}://${i.ip_address}:${i.port_number}/FUZZ`}).filter(n=>n),r=[...new Set(s)],l=t.includes("Simple")?"./wordlist/default_wordlist.txt":"./wordlist/top7000.txt",p={urls:r,wordlist:l,...a&&{delay:a},from_id:o};this.$request.post("/api/path_scanner/scan",p,{headers:{"Content-Type":"application/json"}}).then(()=>{this.$message.success("路径扫描任务已启动")}).catch(n=>{console.error(n),this.$message.error("启动路径扫描任务失败")})},startHTTPPathScan(){this.startPathScan("HTTP")},startHTTPSPathScan(){this.startPathScan("HTTPS")},startHTTPPathSimpleScan(){this.startPathScan("HTTP Simple","0.5")},startHTTPSPathSimpleScan(){this.startPathScan("HTTPS Simple","0.5")},onPageChange(t,a){this.pagination.defaultCurrent||(this.pagination.current=t.current,this.pagination.pageSize=t.pageSize)},exportToCSV(){const t=[],a=["ID","IP 地址","端口号","服务名称","协议","状态","HTTP状态码","HTTP标题","HTTPS状态码","HTTPS标题"];t.push(a.join(",")),this.data.forEach(r=>{const l=[r.id,r.url,`"${r.ip_address}"`,r.port_number,`"${r.service_name}"`,r.protocol,r.state,r.http_code,r.http_title,r.https_code,r.https_title];t.push(l.join(","))});const e=t.join(`
`),o=new Blob([e],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(o),s.download="port-scan-results.csv",s.style.display="none",document.body.appendChild(s),s.click(),document.body.removeChild(s)},exportToTXT(){const t=Array.from(new Set(this.data.map(o=>o.url))).sort(),a=new Blob([t.join(`
`)],{type:"text/plain;charset=utf-8;"}),e=document.createElement("a");e.href=URL.createObjectURL(a),e.download="unique-urls.txt",e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)}},mounted(){const t=this.$route.query.task_id;this.fetchResults(t)}};var y=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("t-space",{attrs:{direction:"vertical"}},[e("t-input",{class:{"hover-active":t.isSearchFocus},attrs:{placeholder:"请输入搜索内容"},on:{blur:function(o){return t.changeSearchFocus(!1)},focus:function(o){return t.changeSearchFocus(!0)},input:t.filterData},scopedSlots:t._u([{key:"prefix-icon",fn:function(){return[e("search-icon",{staticClass:"icon",attrs:{size:"16"}})]},proxy:!0}]),model:{value:t.searchData,callback:function(o){t.searchData=o},expression:"searchData"}}),[e("t-space",[e("t-button",{attrs:{theme:"primary"},on:{click:t.startHTTPPathScan}},[t._v("对选定的项目启动 HTTP路径 扫描")]),e("t-button",{attrs:{theme:"primary"},on:{click:t.startHTTPSPathScan}},[t._v("对选定的项目启动 HTTPS路径 扫描")]),e("t-button",{attrs:{theme:"primary"},on:{click:t.startHTTPPathSimpleScan}},[t._v("对选定的项目启动 简单HTTP路径 扫描")]),e("t-button",{attrs:{theme:"primary"},on:{click:t.startHTTPSPathSimpleScan}},[t._v("对选定的项目启动 简单HTTPS路径 扫描")]),e("t-button",{attrs:{theme:"primary"},on:{click:t.exportToCSV}},[t._v("导出CSV")]),e("t-button",{attrs:{theme:"primary"},on:{click:t.exportToTXT}},[t._v("导出TXT")])],1)],e("t-table",{attrs:{rowKey:"id",data:t.data,columns:t.columns,stripe:t.stripe,bordered:t.bordered,hover:t.hover,size:t.size,"table-layout":t.tableLayout?"auto":"fixed",pagination:t.pagination,showHeader:t.showHeader,"selected-row-keys":t.selectedRowKeys,cellEmptyContent:"-",resizable:""},on:{"select-change":t.rehandleSelectChange,"page-change":t.onPageChange}})],2)},g=[];const u={};var w=T(f,y,g,!1,P,null,null,null);function P(t){for(let a in u)this[a]=u[a]}const C=function(){return w.exports}();export{C as default};
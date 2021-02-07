(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{15:function(e,t,c){},30:function(e,t,c){"use strict";c.r(t);var a=c(0),s=c(1),n=c(5),i=c.n(n),l=(c(15),c(8)),o=c.n(l),d=c(9),r=c(2),j=c(6),m="".concat(window.location.origin,"/"),u=m+"v1/movies",b=m+"v1/actors",h=m+"v1/movies_cast",v="add:actors add:movies delete:movies delete:actors get:actors get:movies manage:cast update:actors update:movies",O=function(e,t,c,a,s){null!=s?fetch(e,{method:t,body:c?JSON.stringify(c):null,headers:new Headers({"Content-Type":"application/json",Authorization:"Bearer ".concat(s)})}).then((function(e){return e.json()})).then((function(e){!e.success&&e.auth_error&&j.b.error(e.description,{position:"bottom-center"}),a&&a(e)})).catch((function(e){console.log(e)})):console.log("No Authorized token is set!!!!")};var p=function(e){var t=Object(s.useState)([]),c=Object(r.a)(t,2),n=c[0],i=c[1];Object(s.useEffect)((function(e){l()}),[]),Object(s.useEffect)((function(e){l()}),[e.appToken]),Object(s.useEffect)((function(t){e.loadActors&&l()}),[e.loadActors]);var l=function(){var t,c;e.appToken&&(t=function(t){i(t),e.loadActorsList(t)},c=e.appToken,O(b,"GET",null,(function(e){e&&e.success&&t(e.data)}),c))};return Object(a.jsx)("div",{className:"row",children:n.map((function(t){return Object(a.jsx)("div",{className:"col",style:{padding:3,marginLeft:2},children:Object(a.jsx)("div",{className:"card",style:{width:300},children:Object(a.jsxs)("div",{className:"card-body",children:[Object(a.jsx)("h5",{className:"card-title",style:{color:"black"},children:t.name}),Object(a.jsxs)("p",{style:{color:"black"},children:["Age: ",t.age]}),Object(a.jsxs)("p",{style:{color:"black"},children:["Gender: ",t.gender]}),Object(a.jsxs)("div",{className:"row",children:[Object(a.jsx)("div",{className:"col",children:Object(a.jsx)("div",{className:"btn-success btn-sm text-center",id:"actorUpdateBtnContainer"+t.id,"data-toggle":"modal","data-target":"#updateActorModal",style:{cursor:"pointer"},onClick:function(c){return e.chooseUpdate(t)},children:"Update"})}),Object(a.jsx)("div",{className:"col",children:Object(a.jsx)("div",{className:"btn-danger btn-sm text-center",id:"deleteActor_"+t.id,style:{cursor:"pointer"},onClick:function(c){return function(t){window.confirm("Are you sure you want to delete the actor ".concat(t.name," ?"))&&O(b+"/"+t.id,"DELETE",null,(function(t){t.success&&(e.isActorDeleted(),l())}))}(t)},children:"Delete"})})]})]})})})}))})},x=c(3);var f=function(e){var t=Object(s.useState)([]),c=Object(r.a)(t,2),n=c[0],i=c[1];Object(s.useEffect)((function(e){l()}),[]),Object(s.useEffect)((function(e){l()}),[e.appToken]),Object(s.useEffect)((function(t){e.loadMovies&&l()}),[e.loadMovies]);var l=function(){var t,c;e.appToken&&(t=function(t){i(t),e.loadMoviesList(t)},c=e.appToken,O(u,"GET",null,(function(e){e&&e.success&&t(e.data)}),c))};return Object(a.jsx)("div",{className:"row",children:n.map((function(t){return Object(a.jsx)("div",{className:"col",style:{padding:3,marginLeft:2},children:Object(a.jsx)("div",{className:"card bg-light mb-3",style:{width:300},children:Object(a.jsxs)("div",{className:"card-body",children:[Object(a.jsx)("h5",{className:"card-title",style:{color:"black"},children:t.title}),Object(a.jsxs)("p",{children:["Releases on: ",new Date(t.release_date.replace("GMT","")).toDateString()]}),Object(a.jsxs)("div",{className:"row",children:[Object(a.jsx)("div",{className:"col",children:Object(a.jsx)("div",{className:"btn-success btn-sm text-center",id:"movie-id-btn-"+t.id,"data-toggle":"modal","data-target":"#updateMovieModal",style:{cursor:"pointer"},onClick:function(c){return e.chooseUpdate(t)},children:"Update"})}),Object(a.jsx)("div",{className:"col",children:Object(a.jsx)("div",{className:"btn-danger btn-sm text-center",id:"deleteMovie_"+t.id,style:{cursor:"pointer"},onClick:function(c){return function(t){window.confirm("Are you sure you want to delete the movie ".concat(t.title," ?"))&&O(u+"/"+t.id,"DELETE",null,(function(t){t.success&&(e.isMovieDeleted(),l())}),e.appToken)}(t)},children:"Delete"})})]})]})})})}))})};var g=function(e){var t=Object(s.useState)([]),c=Object(r.a)(t,2),n=c[0],i=c[1],l=Object(s.useState)(!1),o=Object(r.a)(l,2);o[0],o[1],Object(s.useEffect)((function(e){d()}),[]),Object(s.useEffect)((function(e){d()}),[e.appToken]),Object(s.useEffect)((function(t){e.isUpdated&&d()}),[e.isUpdated]);var d=function(){O(h,"GET",null,(function(t){t.success?(e.updateShowContent(!0),i(t.data),e.disableIsUpdated()):e.updateShowContent(!1)}),e.appToken)};return Object(a.jsx)("div",{className:"row",children:n.map((function(t){return Object(a.jsx)("div",{className:"col",style:{padding:3,marginLeft:2},children:Object(a.jsx)("div",{className:"card",style:{width:300},children:Object(a.jsxs)("div",{className:"card-body",children:[Object(a.jsx)("h5",{className:"card-title",style:{color:"black"},children:t.movie.title+"'s Actors"}),Object(a.jsxs)("p",{children:["Movie Title: ",t.movie.title]}),Object(a.jsx)("label",{children:"Actors:"}),t.actors.map((function(c){return Object(a.jsxs)("button",{class:"btn btn-primary btn-sm",style:{margin:2},children:[c.name," ",Object(a.jsx)("span",{class:"badge badge-light",onClick:function(a){return function(t,c){window.confirm("This action will remove ".concat(c.name," from the movie ").concat(t.title," ?"))&&O(h+"?actor_id=".concat(c.id,"&movie_id=").concat(t.id),"DELETE",null,(function(e){e.success&&d()}),e.appToken)}(t.movie,c)},children:"\xd7"})]})}))]})})})}))})};var N=function(e){var t=Object(x.b)(),c=t.isAuthenticated,s=t.loginWithRedirect,n=t.logout,i=t.user;return Object(a.jsxs)("div",{children:[c&&Object(a.jsx)("div",{className:"row",children:Object(a.jsxs)("div",{className:"col",children:["Hello ",i.name]})}),Object(a.jsx)("div",{className:"row",children:c?Object(a.jsx)("div",{className:"col-2",children:Object(a.jsx)("div",{className:"btn-danger btn-sm",onClick:function(){e.resetAppToken(),n()},children:"Logout"})}):Object(a.jsx)("div",{className:"col-2",children:Object(a.jsx)("div",{className:"btn-success btn-sm",onClick:function(){return s()},children:"Login"})})})]})};var A=function(e){var t=Object(s.useState)(!1),c=Object(r.a)(t,2),n=c[0],i=c[1],l=Object(s.useState)(!1),j=Object(r.a)(l,2),m=j[0],A=j[1],y=Object(s.useState)(!1),T=Object(r.a)(y,2),k=T[0],M=T[1],E=Object(s.useState)([]),C=Object(r.a)(E,2),_=C[0],w=C[1],D=Object(s.useState)([]),S=Object(r.a)(D,2),I=S[0],U=S[1],P=Object(s.useState)({}),L=Object(r.a)(P,2),B=L[0],R=L[1],H=Object(s.useState)({}),V=Object(r.a)(H,2),F=V[0],G=V[1],q=Object(s.useState)(null),z=Object(r.a)(q,2),W=z[0],J=z[1],K=Object(s.useState)(!0),Y=Object(r.a)(K,2),Q=Y[0],X=Y[1],Z=Object(x.b)(),$=Z.getAccessTokenSilently,ee=Z.loginWithRedirect;Object(s.useEffect)((function(e){Object(d.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=null,e.prev=1,e.next=4,$({audience:"casting",scope:v});case 4:t=e.sent,e.next=11;break;case 7:e.prev=7,e.t0=e.catch(1),"login_required"===e.t0.error&&ee(),"consent_required"===e.t0.error&&ee();case 11:J(t);case 12:case"end":return e.stop()}}),e,null,[[1,7]])})))()}),[]);var te=function(){!function(e,t,c){O(u,"POST",e,t,c)}({title:document.getElementById("movieTitleTxt").value,release_date:document.getElementById("movieReleaseDateVal").value},(function(e){e&&e.success&&i(!0),document.getElementById("dismissMovieModalBtn").click()}),W)},ce=function(){!function(e,t,c){O(b,"POST",e,t,c)}({name:document.getElementById("actorNameTxt").value,age:document.getElementById("actorAgeTxt").value,gender:document.querySelector("input[name = gender]:checked").value},(function(e){e&&e.success&&A(!0),document.getElementById("dismissActorModalBtn").click()}),W)},ae=function(){var e=B.id,t=document.querySelector("input[name='updateActorGender']:checked").value,c=document.getElementById("updateActorTitleText").value,a=document.getElementById("updateActorAgeVal").value;R({id:e,gender:t,name:c,age:a})},se=function(){var e=F.id,t=document.getElementById("updateMovieTitleText").value,c=document.getElementById("updateMovieReleaseDateVal").value;G({id:e,title:t,release_date:c})},ne=function(e){document.getElementById("updateActorModalDismiss").click(),O(b+"/"+e,"PATCH",B,(function(e){e.success&&A(!0)}))},ie=function(e){document.getElementById("updateMovieModalDismiss").click(),O(u+"/"+e,"PATCH",F,(function(e){e.success&&i(!0)}),W)};return Object(a.jsx)("div",{className:"row",children:Object(a.jsxs)("div",{className:"col",children:[Object(a.jsxs)("div",{className:"nav nav-tabs",id:"dashboardTab",role:"tablist",children:[Object(a.jsx)("a",{className:"nav-item nav-link active","data-toggle":"tab",href:"#loginLogout",role:"tab",children:"Login/Logout"}),Object(a.jsx)("a",{className:"nav-item nav-link","data-toggle":"tab",href:"#viewContent",role:"tab",children:"View/Edit"}),Object(a.jsx)("a",{className:"nav-item nav-link","data-toggle":"tab",href:"#manageCastContent",role:"tab",children:"Manage Cast"})]}),Object(a.jsxs)("div",{className:"tab-content",id:"tabDashboardContent",children:[Object(a.jsx)("div",{className:"tab-pane fade show active",id:"loginLogout",role:"tabpanel",children:Object(a.jsx)(N,{resetAppToken:function(){return J(null)}})}),Object(a.jsx)("div",{className:"tab-pane fade",id:"viewContent",role:"tabpanel",children:Object(a.jsxs)("div",{className:"row",children:[Object(a.jsxs)("div",{className:"col",children:[Object(a.jsx)("h3",{children:"Movies"}),Object(a.jsx)("div",{className:"btn-primary btn-lg",id:"createMovieBtn","data-toggle":"modal","data-target":"#addMovieModal",children:"Create Movie"}),Object(a.jsx)("div",{className:"modal fade",id:"addMovieModal",role:"dialog",children:Object(a.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(a.jsxs)("div",{className:"modal-content",children:[Object(a.jsxs)("div",{className:"modal-header",children:[Object(a.jsx)("h5",{className:"modal-title",id:"addMovieModalTitle",children:"Add New Movie"}),Object(a.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",children:Object(a.jsx)("span",{children:"\xd7"})})]}),Object(a.jsxs)("div",{className:"modal-body",children:[Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{className:"input-group",for:"movieTitleTxt",children:"Title:"}),Object(a.jsx)("input",{type:"text",className:"form-control",id:"movieTitleTxt"})]}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{className:"input-group",for:"movieReleaseDateVal",children:"Release Date:"}),Object(a.jsx)("input",{type:"date",className:"form-control",id:"movieReleaseDateVal"})]})]}),Object(a.jsxs)("div",{className:"modal-footer",children:[Object(a.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(e){te()},children:"Add"}),Object(a.jsx)("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal",id:"dismissMovieModalBtn",children:"Close"})]})]})})}),Object(a.jsx)("div",{className:"container",style:{marginLeft:15,marginTop:10},children:Object(a.jsx)(f,{loadMovies:n,appToken:W,isMovieDeleted:function(e){M(!0)},loadMoviesList:function(e){w(e),i(!1)},chooseUpdate:G})}),function(){var e=F.release_date?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-";e=e.replace("GMT","");var c=new Date(e+" "),a=c.getMonth()+1<10?"0"+(c.getMonth()+1):c.getMonth()+1;return"".concat(c.getFullYear()).concat(t).concat(a).concat(t).concat(c.getDate())}(F.release_date):"";return Object(a.jsx)("div",{className:"modal fade",id:"updateMovieModal",role:"dialog",children:Object(a.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(a.jsxs)("div",{className:"modal-content",children:[Object(a.jsxs)("div",{className:"modal-header",children:[Object(a.jsx)("h5",{className:"modal-title",children:"Update Movie"}),Object(a.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",id:"updateMovieModalDismiss",children:Object(a.jsx)("span",{children:"\xd7"})})]}),Object(a.jsxs)("div",{className:"modal-body",children:[Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{className:"input-group",for:"updateMovieTitleText",children:"Title:"}),Object(a.jsx)("input",{type:"text",className:"form-control",id:"updateMovieTitleText",value:F.title,onChange:se})]}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{className:"input-group",for:"updateMovieReleaseDateVal",children:"Release Date:"}),Object(a.jsx)("input",{type:"date",className:"form-control",id:"updateMovieReleaseDateVal",value:e,onChange:se})]})]}),Object(a.jsx)("div",{className:"modal-footer",children:Object(a.jsx)("button",{type:"button",style:{marginLeft:"auto",marginRight:"auto"},className:"btn btn-primary",onClick:function(e){ie(F.id)},children:"Update"})})]})})})}()]}),Object(a.jsxs)("div",{className:"col",children:[Object(a.jsx)("h3",{children:"Actors"}),Object(a.jsx)("div",{className:"btn-primary btn-lg",id:"createActorBtn","data-toggle":"modal","data-target":"#addActorModal",children:"Create Actor"}),Object(a.jsx)("div",{className:"modal fade",id:"addActorModal",role:"dialog",children:Object(a.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(a.jsxs)("div",{className:"modal-content",children:[Object(a.jsxs)("div",{className:"modal-header",children:[Object(a.jsx)("h5",{className:"modal-title",id:"addActorModalTitle",children:"Add Actor"}),Object(a.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",children:Object(a.jsx)("span",{children:"\xd7"})})]}),Object(a.jsxs)("div",{className:"modal-body",children:[Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{className:"input-group",for:"actorNameTxt",children:"Name:"}),Object(a.jsx)("input",{type:"text",className:"form-control",id:"actorNameTxt"})]}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{className:"input-group",for:"actorAgeTxt",children:"Age:"}),Object(a.jsx)("input",{type:"text",className:"form-control",id:"actorAgeTxt"})]}),Object(a.jsx)("div",{className:"form-check-inline",children:Object(a.jsxs)("label",{className:"form-check-label",children:[Object(a.jsx)("input",{type:"radio",className:"form-check-input",name:"gender",value:"male"}),"Male"]})}),Object(a.jsx)("div",{class:"form-check-inline",children:Object(a.jsxs)("label",{className:"form-check-label",children:[Object(a.jsx)("input",{type:"radio",className:"form-check-input",name:"gender",value:"female"}),"Female"]})})]}),Object(a.jsxs)("div",{className:"modal-footer",children:[Object(a.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(e){ce()},children:"Add"}),Object(a.jsx)("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal",id:"dismissActorModalBtn",children:"Close"})]})]})})}),Object(a.jsx)("div",{className:"container",style:{marginLeft:15,marginTop:10},children:Object(a.jsx)(p,{appToken:W,loadActors:m,isActorDeleted:function(e){M(!0)},loadActorsList:function(e){U(e),A(!1)},chooseUpdate:R})}),Object(a.jsx)("div",{className:"modal fade",id:"updateActorModal",role:"dialog",children:Object(a.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(a.jsxs)("div",{className:"modal-content",children:[Object(a.jsxs)("div",{className:"modal-header",children:[Object(a.jsx)("h5",{className:"modal-title",id:"updateActorModalTitle",children:"Update Actor"}),Object(a.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",id:"updateActorModalDismiss",children:Object(a.jsx)("span",{children:"\xd7"})})]}),Object(a.jsxs)("div",{className:"modal-body",children:[Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{className:"input-group",for:"updateActorTitleText",children:"Name:"}),Object(a.jsx)("input",{type:"text",className:"form-control",id:"updateActorTitleText",value:B.name,onChange:ae})]}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("label",{className:"input-group",for:"updateActorAgeVal",children:"Age:"}),Object(a.jsx)("input",{type:"text",className:"form-control",id:"updateActorAgeVal",value:B.age,onChange:ae})]}),Object(a.jsxs)("div",{className:"input-group",children:[Object(a.jsx)("div",{className:"form-check-inline",children:Object(a.jsxs)("label",{className:"form-check-label",children:[Object(a.jsx)("input",{type:"radio",className:"form-check-input",name:"updateActorGender",value:"male",checked:"male"===B.gender&&"checked",onChange:ae}),"Male"]})}),Object(a.jsx)("div",{class:"form-check-inline",children:Object(a.jsxs)("label",{className:"form-check-label",children:[Object(a.jsx)("input",{type:"radio",className:"form-check-input",name:"updateActorGender",value:"female",checked:"female"===B.gender&&"checked",onChange:ae}),"Female"]})})]})]}),Object(a.jsx)("div",{className:"modal-footer",children:Object(a.jsx)("button",{type:"button",style:{marginLeft:"auto",marginRight:"auto"},className:"btn btn-primary",onClick:function(e){ne(B.id)},children:"Update"})})]})})})]})]})}),Object(a.jsx)("div",{className:"tab-pane fade",id:"manageCastContent",role:"tabpanel",children:Object(a.jsx)("div",{className:"row",children:Q?Object(a.jsxs)("div",{className:"col",children:[Object(a.jsxs)("div",{className:"row",style:{marginTop:20},children:[Object(a.jsx)("div",{className:"col",children:Object(a.jsxs)("select",{className:"custom-select",id:"selectedMovie",children:[Object(a.jsx)("option",{disabled:!0,selected:!0,children:"Select Movie"}),_.map((function(e){return Object(a.jsx)("option",{value:e.id,children:e.title})}))]})}),Object(a.jsx)("div",{className:"col",children:Object(a.jsxs)("select",{className:"custom-select",id:"selectedActor",children:[Object(a.jsx)("option",{disabled:!0,selected:!0,children:"Select Actor"}),I.map((function(e){return Object(a.jsx)("option",{value:e.id,children:e.name})}))]})})]}),Object(a.jsx)("div",{className:"row",style:{marginTop:10},children:Object(a.jsx)("div",{className:"col",children:Object(a.jsx)("div",{className:"btn btn-success btn-lg btn-block",onClick:function(){O(h,"POST",{movie_id:document.getElementById("selectedMovie").value,actor_id:document.getElementById("selectedActor").value},(function(e){e.success&&M(!0)}),W)},children:"Cast to the movie"})})}),Object(a.jsx)("div",{className:"row",children:Object(a.jsx)("div",{className:"col",children:Object(a.jsx)(g,{updateShowContent:X,appToken:W,isUpdated:k,disableIsUpdated:function(){return M(!1)}})})})]}):Object(a.jsx)("div",{className:"col d-flex justify-content-center",style:{marginTop:100},children:Object(a.jsx)("div",{class:"card text-white bg-secondary",children:Object(a.jsxs)("div",{class:"card-body",children:[Object(a.jsx)("h5",{class:"card-title",children:"Not Authorized"}),Object(a.jsx)("p",{class:"card-text",children:"You don't have suitable permission to view the content!!!"})]})})})})})]})]})})};c(24);var y=function(){return Object(a.jsxs)("div",{className:"App container-fluid",children:[Object(a.jsxs)("div",{className:"jumbotron",children:[Object(a.jsx)("h1",{children:"Casting Agency"}),Object(a.jsx)("p",{children:"Single place to view movies, actors and assign actors to the movies!!!!!"})]}),Object(a.jsx)(A,{}),Object(a.jsx)(j.a,{})]})},T=(c(25),c(26),c(27),function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,31)).then((function(t){var c=t.getCLS,a=t.getFID,s=t.getFCP,n=t.getLCP,i=t.getTTFB;c(e),a(e),s(e),n(e),i(e)}))}),k=Object({NODE_ENV:"production",PUBLIC_URL:"/static/react",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_AUTH0_API_AUDIENCE:"casting",REACT_APP_AUTH0_API_DOMAIN:"dev-prav-auth.us.auth0.com",REACT_APP_AUTH0_CLIENT_ID:"DavU4i56mMk4qPck3ruSla263xEczzJ5"}),M=k.REACT_APP_AUTH0_API_AUDIENCE,E=k.REACT_APP_AUTH0_API_DOMAIN,C=k.REACT_APP_AUTH0_CLIENT_ID;i.a.render(Object(a.jsx)(x.a,{domain:E,clientId:C,redirectUri:window.location.origin,audience:M,scope:v,children:Object(a.jsx)(y,{})}),document.getElementById("root")),T()}},[[30,1,2]]]);
//# sourceMappingURL=main.0694829b.chunk.js.map
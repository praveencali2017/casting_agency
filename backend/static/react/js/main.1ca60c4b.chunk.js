(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{10:function(e,t,c){},17:function(e,t,c){"use strict";c.r(t);var s=c(0),a=c(1),n=c.n(a),l=c(4),i=c.n(l),d=(c(10),c(2)),o="".concat(window.location.origin,"/"),r=o+"v1/movies",j=o+"v1/actors";var m=function(e){var t=Object(a.useState)([]),c=Object(d.a)(t,2),n=c[0],l=c[1];Object(a.useEffect)((function(e){i()}),[]),Object(a.useEffect)((function(t){e.loadActors&&i()}),[e.loadActors]);var i=function(){fetch(j).then((function(e){return e.json()})).then((function(e){e&&e.success&&l(e.data)}))};return Object(s.jsx)("div",{className:"row",children:n.map((function(e){return Object(s.jsx)("div",{className:"col",style:{padding:3,marginLeft:2},children:Object(s.jsx)("div",{className:"card",style:{width:300},children:Object(s.jsxs)("div",{className:"card-body",children:[Object(s.jsx)("h5",{className:"card-title",style:{color:"black"},children:e.name}),Object(s.jsxs)("p",{style:{color:"black"},children:["Age: ",e.age]}),Object(s.jsxs)("p",{style:{color:"black"},children:["Gender: ",e.gender]}),Object(s.jsx)("div",{className:"btn-success btn-sm text-center",id:"actor-id-btn-"+e.id,children:"Update"})]})})})}))})};var b=function(e){var t=Object(a.useState)([]),c=Object(d.a)(t,2),n=c[0],l=c[1];Object(a.useEffect)((function(e){i()}),[]),Object(a.useEffect)((function(t){e.loadMovies&&i()}),[e.loadMovies]);var i=function(){fetch(r).then((function(e){return e.json()})).then((function(e){e&&e.success&&l(e.data)}))};return Object(s.jsx)("div",{className:"row",children:n.map((function(e){return Object(s.jsx)("div",{className:"col",style:{padding:3,marginLeft:2},children:Object(s.jsx)("div",{className:"card",style:{width:300},children:Object(s.jsxs)("div",{className:"card-body",children:[Object(s.jsx)("h5",{className:"card-title",style:{color:"black"},children:e.title}),Object(s.jsxs)("p",{children:["Releases on: ",e.release_date]}),Object(s.jsx)("div",{className:"btn-success btn-sm text-center",id:"movie-id-btn-"+e.id,children:"Update"})]})})})}))})};var u=function(e){var t=Object(a.useState)(!1),c=Object(d.a)(t,2),n=c[0],l=c[1],i=Object(a.useState)(!1),o=Object(d.a)(i,2),u=o[0],h=o[1];return Object(s.jsx)("div",{className:"row",children:Object(s.jsx)("div",{className:"col",children:Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{className:"col",children:[Object(s.jsx)("h3",{children:"Movies"}),Object(s.jsx)("div",{className:"btn-primary btn-lg",id:"createMovieBtn","data-toggle":"modal","data-target":"#addMovieModal",children:"Create Movie"}),Object(s.jsx)("div",{className:"modal fade",id:"addMovieModal",role:"dialog",children:Object(s.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(s.jsxs)("div",{className:"modal-content",children:[Object(s.jsxs)("div",{className:"modal-header",children:[Object(s.jsx)("h5",{className:"modal-title",id:"addMovieModalTitle",children:"Add New Movie"}),Object(s.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",children:Object(s.jsx)("span",{children:"\xd7"})})]}),Object(s.jsxs)("div",{className:"modal-body",children:[Object(s.jsxs)("div",{className:"input-group",children:[Object(s.jsx)("label",{className:"input-group",for:"movieTitleTxt",children:"Title:"}),Object(s.jsx)("input",{type:"text",className:"form-control",id:"movieTitleTxt"})]}),Object(s.jsxs)("div",{className:"input-group",children:[Object(s.jsx)("label",{className:"input-group",for:"movieReleaseDateVal",children:"Release Date:"}),Object(s.jsx)("input",{type:"date",className:"form-control",id:"movieReleaseDateVal"})]})]}),Object(s.jsxs)("div",{className:"modal-footer",children:[Object(s.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(e){!function(){var e={title:document.getElementById("movieTitleTxt").value,release_date:document.getElementById("movieReleaseDateVal").value};fetch(r,{method:"POST",body:JSON.stringify(e),headers:new Headers({"Content-Type":"application/json"})}).then((function(e){return e.json()})).then((function(e){e&&e.success&&l(!0),document.getElementById("dismissMovieModalBtn").click()}))}()},children:"Add"}),Object(s.jsx)("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal",id:"dismissMovieModalBtn",children:"Close"})]})]})})}),Object(s.jsx)("div",{className:"container",style:{marginLeft:15,marginTop:10},children:Object(s.jsx)(b,{loadMovies:n})})]}),Object(s.jsxs)("div",{className:"col",children:[Object(s.jsx)("h3",{children:"Actors"}),Object(s.jsx)("div",{className:"btn-primary btn-lg",id:"createActorBtn","data-toggle":"modal","data-target":"#addActorModal",children:"Create Actor"}),Object(s.jsx)("div",{className:"modal fade",id:"addActorModal",role:"dialog",children:Object(s.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(s.jsxs)("div",{className:"modal-content",children:[Object(s.jsxs)("div",{className:"modal-header",children:[Object(s.jsx)("h5",{className:"modal-title",id:"addActorModalTitle",children:"Add Actor"}),Object(s.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",children:Object(s.jsx)("span",{children:"\xd7"})})]}),Object(s.jsxs)("div",{className:"modal-body",children:[Object(s.jsxs)("div",{className:"input-group",children:[Object(s.jsx)("label",{className:"input-group",for:"actorNameTxt",children:"Name:"}),Object(s.jsx)("input",{type:"text",className:"form-control",id:"actorNameTxt"})]}),Object(s.jsxs)("div",{className:"input-group",children:[Object(s.jsx)("label",{className:"input-group",for:"actorAgeTxt",children:"Age:"}),Object(s.jsx)("input",{type:"text",className:"form-control",id:"actorAgeTxt"})]}),Object(s.jsx)("div",{className:"form-check-inline",children:Object(s.jsxs)("label",{className:"form-check-label",children:[Object(s.jsx)("input",{type:"radio",className:"form-check-input",name:"gender",value:"male"}),"Male"]})}),Object(s.jsx)("div",{class:"form-check-inline",children:Object(s.jsxs)("label",{className:"form-check-label",children:[Object(s.jsx)("input",{type:"radio",className:"form-check-input",name:"gender",value:"female"}),"Female"]})})]}),Object(s.jsxs)("div",{className:"modal-footer",children:[Object(s.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(e){!function(){var e={name:document.getElementById("actorNameTxt").value,age:document.getElementById("actorAgeTxt").value,gender:document.querySelector("input[name = gender]:checked").value};fetch(j,{method:"POST",body:JSON.stringify(e),headers:new Headers({"Content-Type":"application/json"})}).then((function(e){return e.json()})).then((function(e){e&&e.success&&h(!0),document.getElementById("dismissActorModalBtn").click()}))}()},children:"Add"}),Object(s.jsx)("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal",id:"dismissActorModalBtn",children:"Close"})]})]})})}),Object(s.jsx)("div",{className:"container",style:{marginLeft:15,marginTop:10},children:Object(s.jsx)(m,{loadActors:u})})]})]})})})};var h=function(){return Object(s.jsxs)("div",{className:"App container-fluid",children:[Object(s.jsxs)("div",{className:"jumbotron",children:[Object(s.jsx)("h1",{children:"Casting Agency"}),Object(s.jsx)("p",{children:"Single place to view movies, actors and assign actors to the movies!!!!!"})]}),Object(s.jsx)(u,{})]})},O=(c(11),c(12),c(13),function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,18)).then((function(t){var c=t.getCLS,s=t.getFID,a=t.getFCP,n=t.getLCP,l=t.getTTFB;c(e),s(e),a(e),n(e),l(e)}))});i.a.render(Object(s.jsx)(n.a.StrictMode,{children:Object(s.jsx)(h,{})}),document.getElementById("root")),O()}},[[17,1,2]]]);
//# sourceMappingURL=main.1ca60c4b.chunk.js.map
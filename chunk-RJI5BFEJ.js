import{e as P,g as C}from"./chunk-2J65QV7P.js";import{l as S,n as y,s as j,v as k}from"./chunk-3O6TE6UV.js";import{Ia as u,J as f,Ma as g,T as d,Wa as p,Ya as r,Za as n,_a as x,cb as v,db as h,eb as a,gb as l,hb as b,i as s,ib as m,jb as c,ub as L,vb as w,za as i}from"./chunk-4HL7BTEX.js";var O=e=>["/project",e];function E(e,o){if(e&1&&(r(0,"a",5),x(1,"img",6),n()),e&2){let t=o.$implicit;p("routerLink",b(4,O,t.id)),i(),v("ngSrc",t.photo),h("alt","",t.title,"-image")}}var F=class e{projectList=[];apiService=d(k);unSubscribe$=new s;constructor(){this.apiService.getAllProjects().pipe(f(this.unSubscribe$)).subscribe(o=>{this.projectList=o},o=>{console.error("Error loading JSON:",o)})}ngOnDestroy(){this.unSubscribe$.next(),this.unSubscribe$.complete()}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=u({type:e,selectors:[["app-portfolio"]],decls:9,vars:7,consts:[["id","portfolio-container",1,"container","py-16","md:py-20"],[1,"text-center","font-header","text-4xl","font-semibold","uppercase","text-primary","sm:text-5xl","lg:text-6xl"],[1,"pt-6","text-center","font-header","text-xl","font-medium","text-black","sm:text-2xl","lg:text-3xl"],[1,"mx-auto","grid","grid-cols-1","gap-8","md:gap-10","lg:grid-cols-2","pt-12","w-full","sm:w-3/4","lg:w-full"],["class","mx-auto transform transition-all hover:scale-105 md:mx-0",3,"routerLink",4,"ngFor","ngForOf"],[1,"mx-auto","transform","transition-all","hover:scale-105","md:mx-0",3,"routerLink"],["width","1920","height","1080","priority","",3,"ngSrc","alt"]],template:function(t,I){t&1&&(r(0,"div",0)(1,"h2",1),a(2),m(3,"translate"),n(),r(4,"h3",2),a(5),m(6,"translate"),n(),r(7,"div",3),g(8,E,2,6,"a",4),n()()),t&2&&(i(2),l(" ",c(3,3,"portfolio.title-check")," "),i(3),l(" ",c(6,5,"portfolio.subtitle-have-done")," "),i(3),p("ngForOf",I.projectList))},dependencies:[y,S,w,L,C,P,j],encapsulation:2})};export{F as PortfolioComponent};

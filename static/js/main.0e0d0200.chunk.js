(this["webpackJsonppadel-score-tracker"]=this["webpackJsonppadel-score-tracker"]||[]).push([[0],{68:function(e,t,a){e.exports=a(86)},73:function(e,t,a){},84:function(e,t,a){},86:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(12),o=a.n(l);a(73),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s=a(19),i=a(29),c=r.a.createContext(null),u=function(e){return function(t){return r.a.createElement(c.Consumer,null,(function(a){return r.a.createElement(e,Object.assign({},t,{firebase:a}))}))}},m=c,d=a(14),h=a(44),p=a.n(h),f=(a(74),a(76),{apiKey:"AIzaSyA696uczKAMC7SjAmR69TN-iXXy8M5rxwk",authDomain:"padel-score-tracker.firebaseapp.com",databaseURL:"https://padel-score-tracker.firebaseio.com",projectId:"padel-score-tracker",storageBucket:"padel-score-tracker.appspot.com",messagingSenderId:"769521886024",appId:"1:769521886024:web:a5b9c9a3823500d7a7097d",measurementId:"G-RHCL15SM91"}),b=function e(){var t=this;Object(d.a)(this,e),this.doCreateUserWithEmailAndPassword=function(e,a){return t.auth.createUserWithEmailAndPassword(e,a)},this.doSignInWithEmailAndPassword=function(e,a){return t.auth.signInWithEmailAndPassword(e,a)},this.doSignOut=function(){return t.auth.signOut()},this.doPasswordReset=function(e){return t.auth.sendPasswordResetEmail(e)},this.doPasswordUpdate=function(e){return t.auth.currentUser.updatePassword(e)},this.user=function(e){return t.db.ref("users/".concat(e))},this.users=function(){return t.db.ref("users")},p.a.initializeApp(f),this.auth=p.a.auth(),this.db=p.a.database()},E=u((function(e){var t=e.firebase;return r.a.createElement("button",{type:"button",onClick:t.doSignOut},"Sign Out")})),v="/padel-score-tracker/",g="/padel-score-tracker/signup",w="/padel-score-tracker/signin",O="/padel-score-tracker/home",j="/padel-score-tracker/account",C="/padel-score-tracker/admin",y=r.a.createContext(null),S=a(13),k=a(16),P=a(17),x=a(18),A=function(e){var t=function(t){function a(e){var t;return Object(d.a)(this,a),(t=Object(k.a)(this,Object(P.a)(a).call(this,e))).state={authUser:null},t}return Object(x.a)(a,t),Object(S.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.listener=this.props.firebase.auth.onAuthStateChanged((function(t){t?e.setState({authUser:t}):e.setState({authUser:null})}))}},{key:"componentWillUnmount",value:function(){this.listener()}},{key:"render",value:function(){return r.a.createElement(y.Provider,{value:this.state.authUser},r.a.createElement(e,this.props))}}]),a}(r.a.Component);return u(t)},U=a(43),W=function(e){return function(t){var a=function(a){function n(){return Object(d.a)(this,n),Object(k.a)(this,Object(P.a)(n).apply(this,arguments))}return Object(x.a)(n,a),Object(S.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.listener=this.props.firebase.auth.onAuthStateChanged((function(a){e(a)||t.props.history.push(w)}))}},{key:"componentWillUnmount",value:function(){this.listener()}},{key:"render",value:function(){var a=this;return r.a.createElement(y.Consumer,null,(function(n){return e(n)?r.a.createElement(t,a.props):null}))}}]),n}(r.a.Component);return Object(U.a)(i.e,u)(a)}},I=function(){return r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(s.b,{to:v},"Landing")),r.a.createElement("li",null,r.a.createElement(s.b,{to:O},"Home")),r.a.createElement("li",null,r.a.createElement(s.b,{to:j},"Account")),r.a.createElement("li",null,r.a.createElement(s.b,{to:C},"Admin")),r.a.createElement("li",null,r.a.createElement(E,null)))},D=function(){return r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(s.b,{to:v},"Landing")),r.a.createElement("li",null,r.a.createElement(s.b,{to:w},"Sign In")))},M=function(){return r.a.createElement("div",null,r.a.createElement(y.Consumer,null,(function(e){return e?r.a.createElement(I,null):r.a.createElement(D,null)})))},N=a(88),R=a(115),T=function(){return r.a.createElement(R.a,{maxWidth:"sm"},r.a.createElement(N.a,{component:"div",style:{backgroundColor:"#ccc",height:"100vh"}},r.a.createElement("h1",null,"Landing")))},L=a(9),q=a(20),H=a(119),z=a(121),B=a(123),F={username:"",email:"",passwordOne:"",passwordTwo:"",error:null},J=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(k.a)(this,Object(P.a)(t).call(this,e))).onSubmit=function(e){var t=a.state,n=t.username,r=t.email,l=t.passwordOne;a.props.firebase.doCreateUserWithEmailAndPassword(r,l).then((function(e){return a.props.firebase.user(e.user.uid).set({username:n,email:r})})).then((function(e){a.setState(Object(q.a)({},F)),a.props.history.push(O)})).catch((function(e){a.setState({error:e})})),e.preventDefault()},a.onChange=function(e){a.setState(Object(L.a)({},e.target.name,e.target.value))},a.state=Object(q.a)({},F),a}return Object(x.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this.state,t=e.username,a=e.email,n=e.passwordOne,l=e.passwordTwo,o=e.error,s=n!==l||""===n||""===a||""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"flex-container"},r.a.createElement(z.a,{name:"username",required:!0,id:"outlined-required-name",label:"Full Name",variant:"outlined",value:t,onChange:this.onChange}),r.a.createElement(z.a,{name:"email",required:!0,id:"outlined-required-email",label:"Email Address",variant:"outlined",value:a,onChange:this.onChange}),r.a.createElement(z.a,{name:"passwordOne",id:"outlined-password-input",label:"Password",type:"password",variant:"outlined",onChange:this.onChange,value:n}),r.a.createElement(z.a,{name:"passwordTwo",id:"outlined-password-input2",label:"Confirm Password",type:"password",variant:"outlined",onChange:this.onChange,value:l}),r.a.createElement(B.a,{variant:"contained",color:"primary",disabled:s,type:"submit"},"Sign Up"),o&&r.a.createElement("p",null,o.message)))}}]),t}(n.Component),K=function(){return r.a.createElement(N.a,null,"Don't have an account? ",r.a.createElement(H.a,{href:g},"Link"))},X=Object(i.e)(u(J)),G=function(){return r.a.createElement("div",{className:"flex-container"},r.a.createElement("h1",null,"SignUp"),r.a.createElement(X,null))},$=(a(84),{email:"",password:"",error:null}),Q=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(k.a)(this,Object(P.a)(t).call(this,e))).onSubmit=function(e){var t=a.state,n=t.email,r=t.password;a.props.firebase.doSignInWithEmailAndPassword(n,r).then((function(){a.setState(Object(q.a)({},$)),a.props.history.push(O)})).catch((function(e){a.setState({error:e})})),e.preventDefault()},a.onChange=function(e){a.setState(Object(L.a)({},e.target.name,e.target.value))},a.state=Object(q.a)({},$),a}return Object(x.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.password,n=e.error,l=""===a||""===t;return r.a.createElement(R.a,{maxWidth:"sm"},r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"flex-container"},r.a.createElement(z.a,{name:"email",required:!0,id:"outlined-required",label:"Email address",variant:"outlined",value:t,onChange:this.onChange}),r.a.createElement(z.a,{name:"password",id:"outlined-password-input",label:"Password",type:"password",autoComplete:"current-password",variant:"outlined",onChange:this.onChange}),r.a.createElement(B.a,{variant:"contained",color:"primary",disabled:l,type:"submit"},"Sign In"),n&&r.a.createElement("p",null,n.message))))}}]),t}(n.Component),V=Object(U.a)(i.e,u)(Q),Y=function(){return r.a.createElement("div",{className:"flex-container"},r.a.createElement("h1",null,"SignIn"),r.a.createElement(V,null),r.a.createElement(K,null))},Z={email:"",error:null},_=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(k.a)(this,Object(P.a)(t).call(this,e))).onSubmit=function(e){var t=a.state.email;a.props.firebase.doPasswordReset(t).then((function(){a.setState(Object(q.a)({},Z))})).catch((function(e){a.setState({error:e})})),e.preventDefault()},a.onChange=function(e){a.setState(Object(L.a)({},e.target.name,e.target.value))},a.state=Object(q.a)({},Z),a}return Object(x.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.error,n=""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{name:"email",value:this.state.email,onChange:this.onChange,type:"text",placeholder:"Email Address"}),r.a.createElement("button",{disabled:n,type:"submit"},"Reset My Password"),a&&r.a.createElement("p",null,a.message))}}]),t}(n.Component),ee=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"PasswordForget"),r.a.createElement(te,null))},te=u(_),ae=W((function(e){return!!e}))((function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Home"),r.a.createElement("p",null,"The Home Page is accessible by every signed in user."))})),ne={passwordOne:"",passwordTwo:"",error:null},re=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(k.a)(this,Object(P.a)(t).call(this,e))).onSubmit=function(e){var t=a.state.passwordOne;a.props.firebase.doPasswordUpdate(t).then((function(){a.setState(Object(q.a)({},ne))})).catch((function(e){a.setState({error:e})})),e.preventDefault()},a.onChange=function(e){a.setState(Object(L.a)({},e.target.name,e.target.value))},a.state=Object(q.a)({},ne),a}return Object(x.a)(t,e),Object(S.a)(t,[{key:"render",value:function(){var e=this.state,t=e.passwordOne,a=e.passwordTwo,n=e.error,l=t!==a||""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{name:"passwordOne",value:t,onChange:this.onChange,type:"password",placeholder:"New Password"}),r.a.createElement("input",{name:"passwordTwo",value:a,onChange:this.onChange,type:"password",placeholder:"Confirm New Password"}),r.a.createElement("button",{disabled:l,type:"submit"},"Reset My Password"),n&&r.a.createElement("p",null,n.message))}}]),t}(n.Component),le=u(re),oe=W((function(e){return!!e}))((function(){return r.a.createElement(y.Consumer,null,(function(e){return r.a.createElement("div",null,r.a.createElement("h1",null,"Account: ",e.email),r.a.createElement(te,null),r.a.createElement(le,null))}))})),se=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(k.a)(this,Object(P.a)(t).call(this,e))).state={loading:!1,users:[]},a}return Object(x.a)(t,e),Object(S.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({loading:!0}),this.props.firebase.users().on("value",(function(t){var a=t.val(),n=Object.keys(a).map((function(e){return Object(q.a)({},a[e],{uid:e})}));e.setState({users:n,loading:!1})}))}},{key:"componentWillUnmount",value:function(){this.props.firebase.users().off()}},{key:"render",value:function(){var e=this.state,t=e.users,a=e.loading;return r.a.createElement("div",null,r.a.createElement("h1",null,"Admin"),a&&r.a.createElement("div",null,"Loading ..."),r.a.createElement(ie,{users:t}))}}]),t}(n.Component),ie=function(e){var t=e.users;return r.a.createElement("ul",null,t.map((function(e){return r.a.createElement("li",{key:e.uid},r.a.createElement("span",null,r.a.createElement("strong",null,"ID:")," ",e.uid),r.a.createElement("span",null,r.a.createElement("strong",null,"E-Mail:")," ",e.email),r.a.createElement("span",null,r.a.createElement("strong",null,"Username:")," ",e.username))})))},ce=u(se),ue=(a(85),a(124)),me=a(120),de=a(61);var he=A((function(){var e=r.a.useMemo((function(){return Object(de.a)({palette:{type:"dark"}})}));return r.a.createElement(me.a,{theme:e},r.a.createElement(s.a,null,r.a.createElement(R.a,{maxWidth:"sm"},r.a.createElement(N.a,{component:"div",style:{}},r.a.createElement(ue.a,null),r.a.createElement(M,null),r.a.createElement("hr",null),r.a.createElement(i.a,{exact:!0,path:v,component:T}),r.a.createElement(i.a,{exact:!0,path:g,component:G}),r.a.createElement(i.a,{exact:!0,path:w,component:Y}),r.a.createElement(i.a,{exact:!0,path:"/padel-score-tracker/pw-forget",component:ee}),r.a.createElement(i.a,{exact:!0,path:O,component:ae}),r.a.createElement(i.a,{exact:!0,path:j,component:oe}),r.a.createElement(i.a,{exact:!0,path:C,component:ce})))))}));o.a.render(r.a.createElement(m.Provider,{value:new b},r.a.createElement(he,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[68,1,2]]]);
//# sourceMappingURL=main.0e0d0200.chunk.js.map
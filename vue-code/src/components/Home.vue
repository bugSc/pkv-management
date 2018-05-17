<template>
  <div class="app">
  	<!-- 头部 -->
  	<div class="header">
  		<img @click="openMenu" src="../../static/img/menu.png"/>
  		<span class="title">{{titleName}}</span>
  		<img src="../../static/img/giveOut.png" class="giveOut" @click="takeOff"/>
  	</div>
  	<!-- 菜单 -->
  	<v-menu :open="open" @closeMenu="closeMenu"></v-menu>
  	<!-- 视图层 -->
		<router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
  	return{
  		open: false,
  		titleName:'昨日使用情况'
  	}
  },
  methods:{
  	openMenu(){
  		this.open = this.open ? this.open =false : this.open = true
  	},
  	closeMenu(msg) {
        this.open = msg
   	},
   	takeOff(){
   		if(process.env.NODE_ENV != 'development'){
   			this.$Juqery.ajax({
					type: 'POST',
					cache: false,
	        beforeSend: function(xhr) {
	            xhr.withCredentials = true;
	        },
	        crossDomain: true,
					xhrFields: {
					    withCredentials: true
					},
					url: this.$http + 'api/user/logout',
					dataType:'json',
					success:( res => {
						if(res.code == 0){
							this.$router.push('login')
						}
					})
				})
   		}else{
   			this.$router.push('login')
   		}
   	},
   	getPath(){
			let path = this.$route.path;
			this.titleName =Boolean(this.$route.query.name)? this.$route.query.name: this.titleName;
		}
  },
  created(){
  	this.getPath()
  },
  watch:{
    '$route':'getPath'
  }
}
</script>

<style lang="stylus" scoped>
.header{
	height: 6vh;
	width: 100%;
	z-index: 100;
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	text-align: center;
	border-bottom: 1px solid black;
	position: fixed;
	background-color: #FFFFFF;
	top: 0;
	left: 0;
	color: #000000;
	font-weight: 500;
	font-size: 0.5rem;
	font-family: 'Comic Sans MS';
	img{
		height: 7vw;
		padding-left: 10px;
		width: 7vw;
		vertical-align: middle;
	}
	.giveOut{
		padding-right: 10px;
	}
}
</style>

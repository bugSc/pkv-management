<template>
	<div>
		<transition name="fade">
			<div class="menu" v-if="open" @click="closeMenu">
				<div class="bg-opacity"></div>
				<div class="wrap" @click="isActiveFn">
					<router-link :class="{ active: isActive }" :to="{path:'/todayData',query:{name:'昨日使用情况'}}" class="router-wrapper">
						<span>昨日使用情况</span>
					</router-link>
					<router-link :to="{path:'/historyData',query:{name:'历史统计'}}" class="router-wrapper">
						<span>历史统计</span>
					</router-link>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default{
	name: 'Menu',
	props:{
		open: false,
		titleName: ''
	},
	data() {
		return {
			type: 'home',
			isActive: true
		}
	},
	methods:{
		closeMenu() {
			this.$emit('closeMenu', false)
		},
		isActiveFn(){
			this.isActive = false
		}
	},
	mounted() {
		
	}
}
</script>

<style lang="stylus" scoped>
.menu{
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 6.2vh;
	z-index: 100;
	.bg-opacity{
		width: 100%;
		height: 100%;
		background-color: #333333;
		opacity: 0.1;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -10;
	}
	.wrap{
		width: 48vw;
		height: 93.5vh;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		font-size: 3vh;
		.router-wrapper{
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    padding-left: 15px;
		    padding: 10px 20px;
			span{
				flex: 1;
			}
			img{
				width: 30px;
				height: 30px;
				vertical-align: middle;
			}
		}
	}
	.active{
		color: #5F9DD6;
		border-left: 5px solid #5F9DD6;
	}
}
</style>
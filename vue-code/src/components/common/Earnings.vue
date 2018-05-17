<template>
	<div class="earnings">
		<el-card class="box-card wrap">
			<div class="title">{{childData.title}}</div>
			<div class="content">
				<div class="sub">
					<div class="sub-title">设备总数</div>
					<div class="sub-content">{{childData.devices}}</div>
				</div>
				<div class="sub">
					<div class="sub-title">总增粉数</div>
					<div class="sub-content">{{childData.increases}}</div>
				</div>
				<div class="sub">
					<div class="sub-title">总收益</div>
					<div class="sub-content">{{childData.total}}</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	
export default{
	props:['childData'],
	data() {
		return {
			
		}
	}
}

</script>

<style lang="stylus" scoped>
.earnings{
	width: 90%;
	margin: 20px auto 0 auto;
	.wrap{
		text-align: center;
		font-size: 20px;
		font-family: "微软雅黑";
		.title{
			padding-bottom: 18px;
		}
		.content{
			display: flex;
			justify-content: center;
			font-size: 18px;
			.sub{
				flex: 1;
				.sub-title{
					padding-bottom: 18px;
				}
			}
		}
	}
}
</style>
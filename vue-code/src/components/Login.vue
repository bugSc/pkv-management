<template>
	<div class="login"  v-loading="loading">
		<div class="logo">
			<img src="../../static/img/logo.png"/>
		</div>
		<div class="wrap">
			<div class="ms-login">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
					<el-form-item prop="username">
					    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="passwords">
						<el-input type="password" v-model="ruleForm.passwords" auto-complete="off" placeholder="密码"></el-input>
					</el-form-item>
					<el-form-item class="btn-warp">
						<el-button type="primary" @click="submitForm('ruleForm')" class="btn">登录</el-button>
						<!--<el-button @click="resetForm('ruleForm')" size="medium">重置</el-button>-->
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="footer">© 2018 皮卡充科技有限公司 粤ICP备17061735号-1</div>
	</div>
</template>

<script>
//import 
export default{
	data() {
		return {
			ruleForm: {
				username:'',
				passwords:''
			},
			rules:{
				username:[ { required: true, message: '请输入用户名', trigger: 'blur' }],
				passwords:[ { required: true, message: '请输入密码', trigger: 'blur' }]
			},
			loading: true,
			url: './static/data/login.json'
		}
	},
	created(){
		this.loading = false
	},
	methods:{
		submitForm(ruleForm) {
		    this.$refs[ruleForm].validate((valid) => {
				if (valid) {
					let ms_username = this.ruleForm.username
		    		let ms_password = this.ruleForm.passwords
		    		let self = this
		    		if(process.env.NODE_ENV != 'development'){
		    			var url  = this.$http + "api/user/login?time=" + new Date().getTime();
		    			var type = 'POST';
		    		}else{
		    			var url =this.url
		    			var type = 'GET';
		    		}
	        		this.$Juqery.ajax({
						type: type,
						cache: false,
			            beforeSend: function(xhr) {
			                xhr.withCredentials = true;
			            },
						url: url,
						data: {
							'username': ms_username,
							'password': ms_password
						},
						xhrFields: {
						    withCredentials: true
						},
						crossDomain: true,
						dataType:'json',
						success:(res =>{
							if(res.code == 0){
	        					this.$router.push('todayData')
		        			} else {
		        				this.$message({
									message:'登录失败',
									center: true
								});
		        				return;
		        			}
						})
					})
				} else {
				    return false;
				}
		    });
		}
	}
}
</script>

<style lang="stylus" scoped>
.login{
	width: 100vw;
	height: 100vh;
	background: url('../../static/img/login.jpg') 0 0 no-repeat;
	background-size: 100% 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.logo{
		width: 64px;
		height: 68px;
		text-align: center;
		margin: 0 auto;
		padding-top: 150px;
	}
	.wrap{
		flex: 1;
		width: 280px;
		margin: 10px auto;
		.btn{
			width: 100%;
		}
	}
	.footer{
		text-align: center;
		padding: 20px;
		font-size: 10px;
		color: #666666;
	}
}
</style>
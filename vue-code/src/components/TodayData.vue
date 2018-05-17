<template>
	<div class="todayData" v-loading="loading">
		<v-earnings :childData="childData"></v-earnings>
		<div class="today-details">
			<div class="title">昨日详情</div>
			<div class="wrap">
				<!--<el-table border :data="todayTabelData" style="width: 100%">
					<el-table-column prop="launch_name" label="投放地点" width="320" align="center"></el-table-column>
					<el-table-column prop="address" label="详细地址" width="320" align="center"></el-table-column>
					<el-table-column prop="point_name" label="点位" width="150" align="center"></el-table-column>
					<el-table-column prop="use_num" label="使用人数" align="center"></el-table-column>
					<el-table-column prop="follower" label="新使用人数" width="150" align="center"></el-table-column>
					<el-table-column prop="netgain_use" label="净增人数" align="center"></el-table-column>
					<el-table-column prop="un_follower" label="取关人数" align="center"></el-table-column>
				</el-table>-->
				<ul class="table">
					<li class="header">
						<p>投放地点</p>
						<p>详细地址</p>
						<p>点位</p>
						<p>使用人数</p>
						<p>新使用人数</p>
						<p>净增人数</p>
						<p>取关人数</p>
					</li>
					<li v-if="notData" class="content">
						<div v-for="(item, key) in todayTabelData" :key="key">
							<p>{{item.launch_name}}</p>
							<p>{{item.address}}</p>
							<p>{{item.point_name}}</p>
							<p>{{item.use_num}}</p>
							<p>{{item.follower}}</p>
							<p>{{item.netgain_use}}</p>
							<p>{{item.un_follower}}</p>
						</div>
					</li>
					<li class="not-data" v-else>
						暂无数据
					</li>
				</ul>
		        <div class="pagination pagination-size">
		        	<el-pagination
				      	@current-change="handleCurrentTodayChange"
				      	layout="total, prev, pager, next"
				      	:total="todayTotal"
				      	:current-page.sync="currentPage"
				      	:pager-count.sync="countPage"
				      	background
				      	small>
				    </el-pagination>
		        </div>
			</div>
		</div>
	</div>
</template>

<script>
import vEarnings from './common/Earnings'

export default{
	data() {
		return {
			loading: true,
			childData:{
				devices: 0,
				increases: 0,
				total: 0,
				title:'昨日收益'
			},
			getSum: './static/data/getSum.json',
			getTable: './static/data/gethistory.json',
			todayTabelData: [],
			todayTotal: 0,
			todayPage: 1,
			notData: false,
			currentPage: 1,
			countPage: 5
		}
	},
	components:{
		vEarnings
	},
	created() {
		this.loading = false
		// 获取数据
		this.getTodayEarnings()
		// 获取今日详情表格数据
		this.getTodayData()
	},
	methods:{
		getTodayEarnings(){
			if(process.env.NODE_ENV != 'development'){
				var url  = this.$http + "api/monitor/getsum";
				var type = "POST";
			}else{
				var url  = this.getSum;
				var type = "GET";
			}
			this.$Juqery.ajax({
				type: type,
				cache: false,
	            beforeSend: function(xhr) {
	                xhr.withCredentials = true;
	            },
	            crossDomain: true,
				xhrFields: {
				    withCredentials: true
				},
				url: url,
				dataType:'json',
				success:( res => {
					if(res.code == 0){
						this.childData.devices = res.data.steelyard_num
						this.childData.increases = res.data.yusterday_new_follow_num
						this.childData.total = res.data.yesterday_profit
					}
				})
			})
		},
		getTodayData(){
			if(process.env.NODE_ENV != 'development'){
				var url  = this.$http + "api/monitor/gethistory4list";
				var type = "POST";
			}else{
				var url  = this.getTable;
				var type = "GET";
			}
			this.$Juqery.ajax({
				type: type,
				cache: false,
				data:  {
					page: this.todayPage,
					limit: 10,
					beginTime: this.formatDate('beginTime'),
					endTime: this.formatDate('endTime'),
					placeType: null,
					quota:1
				},
	            beforeSend: function(xhr) {
	                xhr.withCredentials = true;
	            },
	            crossDomain: true,
				xhrFields: {
				    withCredentials: true
				},
				url: url,
				dataType:'json',
				success:( res => {
					this.todayTabelData = [];
					if(res.code == 0){
						let arr = res.data;
						if(arr.length > 0){
							this.notData = true
							for(let i = 0; i<arr.length; i++){
								let obj = {
									launch_name : arr[i].name,
									address: arr[i].address,
									point_name: arr[i].point_name,
									use_num: arr[i].use_num,
									follower: arr[i].follower,
									netgain_use: arr[i].follower - arr[i].un_follower,
									un_follower: arr[i].un_follower
								}
								this.todayTabelData.push(obj)
							}
						}else{
							this.notData = false
						}
						this.todayTotal = res.count
					}
				})
			})
		},
		handleCurrentTodayChange(val){
			this.todayPage = val;
			this.getTodayData();
		},
		formatDate (type) {
			var date = new Date();
		    var y = date.getFullYear();  
		    var m = date.getMonth() + 1;  
		    m = m < 10 ? '0' + m : m;
		    switch(type){
		    	case 'beginTime':
		    		var d = date.getDate() - 1;
		    	break;
		    	case 'endTime':
		    		var d = date.getDate();
		    	break;
		    }
		    d = d < 10 ? ('0' + d) : d;  
		    return y + '-' + m + '-' + d;  
		}
	}
}
</script>

<style lang="stylus" scoped>
.todayData{
	padding-top: 6vh;
	height: 94vh;
	font-size: 20px;
	.today-details{
		margin: 20px auto 0 auto;
		text-align: center;
		.title{
			padding-bottom: 18px;
		}
		.wrap{
			.table{
				text-align: left;
				font-size: 16px;
				padding: 5px;
				display: flex;
				white-space: nowrap;
				li{
					border: 1px solid #EBEEF5;
					&:last-child{
						flex: 1;
						border-left: none;
					}
				}
				.header{
					width: 100px;
				}
				.content{
					display: flex;
					flex-direction: row;
					overflow-x: auto;
					flex-wrap: nowrap;
					white-space: nowrap;
					div{
						flex: 1;
						border-right: 1px solid #EBEEF5;
						display: flex;
						flex-direction: column;
						&:last-child{
							flex: 1;
							border-right: none;
						}
						p{
							flex: 1;
							padding-bottom: 0;
						}
					}
					
				}
				.not-data{
					display: inline-flex;
					justify-content: center;
					align-items: center;
					text-align: center;
				}
				p{
					padding: 8px 20px 8px 5px;
					border-bottom: 1px solid #EBEEF5;
					&:last-child{
						border-bottom: none;
					}
				}
			}
			.pagination-size{
				width: 100%;
			}
		}
	}
}
</style>
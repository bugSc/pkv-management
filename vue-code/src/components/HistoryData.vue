<template>
	<div class="historyData" v-loading="loading">
		<v-earnings :childData="childData"></v-earnings>
		<div class="history-condition">
			<div class="content">
			    <span class="demonstration">开始日期：</span>
			    <el-date-picker
			      v-model="beginTime"
			      type="date"
			      placeholder="选择日期"
			      value-format="yyyy-MM-dd"
			      v-on:change="getTabelData('change')">
			    </el-date-picker>
			</div>
    		<div class="content">
			    <span class="demonstration">结束日期：</span>
			    <el-date-picker
			      v-model="endTime"
			      type="date"
			      align="center"
			      placeholder="选择日期"
			      value-format="yyyy-MM-dd"
			      v-on:change="getTabelData('change')">
			    </el-date-picker>
    		</div>
    		<div class="content">
			    <span class="demonstration">投放类型：</span>
			    <el-select v-model="launchType" placeholder="请选择投放类型"  v-on:change="getTabelData('change')">
			    	<el-option
			      		v-for="item in options"
			      		:key="item.value"
			      		:label="item.label"
			      		:value="item.value">
			    	</el-option>
			  	</el-select>
    		</div>
		</div>
		<div class="history-data">
			<div class="title">历史详情</div>
			<div class="wrap">
				<!--<el-table border :data="tableDate" style="width: 100%">
					<el-table-column prop="launch_name" label="投放地点" width="320" align="center"></el-table-column>
					<el-table-column prop="address" label="详细地址" width="320" align="center"></el-table-column>
					<el-table-column prop="point_name" label="点位" width="150" align="center"></el-table-column>
					<el-table-column prop="date" label="统计天数" width="150" align="center"></el-table-column>
					<el-table-column prop="use_num" label="增粉总数" align="center"></el-table-column>
					<el-table-column prop="commission" label="收益" width="150" align="center"></el-table-column>
				</el-table>-->
				<ul class="table">
					<li class="header">
						<p>投放地点</p>
						<p>详细地址</p>
						<p>点位</p>
						<p>统计日期</p>
						<p>使用人数</p>
						<p>新使用人数</p>
						<p>净增人数</p>
						<p>取关人数</p>
						<p>收益</p>
					</li>
					<li v-if="notData" class="content">
						<div v-for="(item, key) in tableDate" :key="key">
							<p>{{item.launch_name}}</p>
							<p>{{item.address}}</p>
							<p>{{item.point_name}}</p>
							<p>{{item.date}}</p>
							<p>{{item.use_num}}</p>
							<p>{{item.follower}}</p>
							<p>{{item.netgain_use}}</p>
							<p>{{item.un_follower}}</p>
							<p>{{item.commission}}</p>
						</div>
					</li>
					<li class="not-data" v-else>
						暂无数据
					</li>
				</ul>
		        <div class="pagination">
		        	<el-pagination
				      	@current-change="handleCurrentTodayChange"
				      	layout="total, prev, pager, next"
				      	:total="total"
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
				title:'历史收益汇总'
			},
			getSum: './static/data/getSum.json',
			getTable: './static/data/gethistory.json',
			total: 1,
			page: 1,
			tableDate: [],
			options: [{
	          value: '',
	          label: '全部'
	        }, {
	          value: '医院',
	          label: '医院'
	        }, {
	          value: '客运站',
	          label: '客运站'
	        }, {
	          value: '酒店',
	          label: '酒店'
	        }, {
	          value: '公交车站',
	          label: '公交车站'
	        }],
	        endTime: this.formatDate(),
	        beginTime: this.monthdFormatDate(),
	        launchType: '',
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
		this.getEarnings();
		this.getTabelData();
	},
	methods: {
		getEarnings(){
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
						this.childData.increases = res.data.this_month_follow_num
						this.childData.total = res.data.all_profit
					}
				})
			})
		},
		getTabelData(change){
			if(process.env.NODE_ENV != 'development'){
				var url  = this.$http + "api/monitor/gethistory4list";
				var type = "POST";
			}else{
				var url  = this.getTable;
				var type = "GET";
			}
			let page = this.page
			if(change === 'change'){
				page = page > 1 ? 1 : page;
				this.currentPage = page > 1 ? 1 : page;
			}
			this.$Juqery.ajax({
				type: type,
				cache: false,
				data: {
					page: page,
					limit: 10,
					beginTime: this.beginTime,
					endTime: this.endTime,
					placeType: this.launchType,
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
					this.tableDate = [];
					if(res.code == 0){
						let arr = res.data;
						if(arr.length > 0){
							this.notData = true
							for(let i=0; i<arr.length; i++){
								let obj = {
									launch_name : arr[i].name,
									address: arr[i].address,
									point_name: arr[i].point_name,
									date: arr[i].date,
									use_num: arr[i].use_num,
									follower: arr[i].follower,
									netgain_use: arr[i].follower-arr[i].un_follower,
									un_follower: arr[i].un_follower,
									commission: arr[i].commission
								}
								this.tableDate.push(obj)
							}
						}else{
							this.notData = false
						}
						this.total = res.count
					}
				})
			})
		},
		handleCurrentTodayChange(val){
			this.page = val;
			this.getTabelData();
		},
		monthdFormatDate() {
			var now = new Date();
			var date = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
		    var y = date.getFullYear();
		    var m = date.getMonth() + 1;  
		    m = m < 10 ? '0' + m : m;  
		    var d = date.getDate();
		    d = d < 10 ? ('0' + d) : d;
		    return y + '-' + m + '-' + d;  
		},
		formatDate () {
			var date = new Date();
		    var y = date.getFullYear();  
		    var m = date.getMonth() + 1;  
		    m = m < 10 ? '0' + m : m;
		    var d = date.getDate();
		    d = d < 10 ? ('0' + d) : d;  
		    return y + '-' + m + '-' + d;  
		}
	}
}
</script>

<style lang="stylus" scoped>
.historyData{
	padding-top: 6vh;
	height: 94vh;
	font-size: 20px;
	.history-condition{
		margin: 20px auto 0 auto;
		font-size: 16px;
		width: 90%;
		.content{
			margin-bottom: 15px;
		}
	}
	.history-data{
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
		}
	}
}
</style>
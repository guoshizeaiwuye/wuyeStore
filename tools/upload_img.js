/*
	2019-02-27
	lane
	封装 uni-app 图片上传功能
	
	使用前先new 一下
	
	所有方法均返回 promise 对象 可使用then() 写后续业务 或 使用 async await
	
	服务端返回示例
	{
		"code":0,
		"msg":"上传成功",
		"data":"http://www.test.com/uploads/20190227/f2824d2d4dc38f30699f816226b4a578.jpg"
	}
	choose	选择图片
		参数 num 为要选择的图片数量
	upload_one 上传一张图片
		参数 path  选择成功后返回的 缓存文件图片路径
	upload  上传多张图片
		参数 path_arr 选择图片成功后 返回的图片路径数组
	choose_and_upload  选择图片并上传
		参数 num 为要选择的图片数量
		
*/

// 引入配置信息或者自己创建个 config 对象
import config from "../config.js";
// let config = {
// 	// 上传图片的API
// 	upload_img_url:'http://www.test.com/index.php/index/upload'
// }
class Uploader {

	constructor() {

	}
	choose(num) {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: num,
				sizeType: ['compressed'],
				success(res) {
					// console.log(res);
					// 缓存文件路径
					resolve(res.tempFilePaths)
					console.log("当前图片信息：", res);
				},
				fail(err) {
					console.log(err)
					reject(err)
				}
			})
		})

	}
	upload_one(path) { 
		let token = uni.getStorageSync('token'); 
		// token="2a05c611-c1dd-4d5d-a5fa-d0a0b2b36b5c";
		let url = config.base_url + config.upload_img_url;
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '上传中'
			})
			uni.uploadFile({
				url: url, //仅为示例，非真实的接口地址
				filePath: path,
				name: 'file',
				formData: {
					width: '200',
					height: '200',
					token: token?token:''
				},
				success: (uploadFileRes) => {
					if ("string" === typeof uploadFileRes.data) {
						resolve(JSON.parse(uploadFileRes.data).data.url)
					} else {
						resolve(uploadFileRes.data.data)
					}

				},
				complete() {
					uni.hideLoading()
				}
			});
		})
	}
	upload(path_arr) {
		let num = path_arr.length;
		console.log("图片信息", path_arr);
		return new Promise(async (resolve, reject) => {
			let img_urls = []
			for (let i = 0; i < num; i++) {
				let img_url = await this.upload_one(path_arr[i]);
				console.log(img_url)
				img_urls.push(img_url)
			};
			console.log("全部上传成功")
			resolve(img_urls)
		})


	}
	choose_and_upload(num) {
		return new Promise(async (resolve, reject) => {
			let path_arr = await this.choose(num);
			let img_urls = await this.upload(path_arr);
			resolve(img_urls);
		})

	}
}
export default Uploader;

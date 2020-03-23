import config from "../config.js";

function upload(path) {
	uni.showLoading({
		title: '上传中'
	});
	let token = uni.getStorageSync('token');
	let url = config.base_url + config.upload_img_url;
	return new Promise((resolve, reject) => { 
		 uni.uploadFile({
			url: url, //仅为示例，非真实的接口地址
			filePath: path,
			name: 'file',
			formData: {
				token: token ? token.token : ''
			},
			success: (res) => {
				resolve(res.data);
				console.log(res);
			},
			complete() {
				uni.hideLoading()
			}
		}); 
	})
}

export default {
	async upvideo(video) {
		return upload(video);
	}
};

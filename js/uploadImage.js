function uploadImage(base64){
	/**
	 *Base64字符串转二进制
	 */
	function dataURLtoBlob(dataurl) {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {
			type: mime
		});
	}
	var blob=dataURLtoBlob(dataurl);
/*	$.ajax({
		url: "http://waajyun.s1.natapp.cc/file/upload",
		type: "post",
		dataType: "json",
		data:
		contentType: "application/json",
	})*/
}

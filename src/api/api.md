# 自動登入

## /tempuser/login

### 動作 [POST]

- Parameters

    {
		linkid: 0
	}

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		istemp: 1,
      		servertoken: "NTLaqf2wpFo8zvT1vn66cdYHWSoFFVOn",
      			tname: "u_temp_user_0"
      		},
      	msg: "成功"
      }

# 推薦漫畫

## /recommend/lists

### 動作 [POST]

- Parameters

      {
            ids: "1,2,3,4,10,44"
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		1: {
      			list: {
      				author: "JK",
      				bookcover: "uploads/fc15217ed971bc6e8a1164ee5b8944f2.jpg",
      				bookcoverPack: "uploads/fc15217ed971bc6e8a1164ee5b8944f2.jpg",
      				cartoonId: 2226,
      				chapters: 46,
      				desc: "夢想考上公務員的劉聖住進了一間鬧鬼的考試院..."
      				firstcover: "uploads/0a51343ee041114465410e0a3172186d.jpg"
      				id: "2226",
      				status: 2,
      				thumb: "uploads/a6fe24aa767bce3b7d485f130dba75c0.jpg",
      				thumbPack: "uploads/a6fe24aa767bce3b7d485f130dba75c0.jpg",
      				title: "辣魅當家",
      				typename: "都市"
      			}
      		}
      		...
      	}
      	msg: "成功"
      }

# 推薦漫畫 new

## /recommend/newLists

### 動作 [POST]

- Parameters

      {
            ids: [1, 2, 3, 4, 10, 44] // 可帶可不帶，帶則照id提供，不帶則照後台設定
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		choiceId: 2, // 高爆庫 ID
      		mode: 0, // 前端排版方式
      		headline: '精品精粹' // 類別標題名稱
      		cartoons: [{
      			vertical: 'abc.png', // 直式封面
      			verticalPack: 'abc.png', // 直式封面 for 靜態站不露點
      			horizontal: 'abc.png', // 橫式封面
      			horizontalPack: 'abc.png', // 橫式封面 for 靜態站不露點
      			author: 'STUDIO', // 作者
      			id: 2000, // ID
      			title: '30cm 立約人', // 標題
      			tagName: '官場', // 類別
      			tId: 10, // 類別 ID
      			description: '惡魔聽見了你的聲音，但說好30cm卻變成 ...', // 敘述
      			status: 2 // 連載 / 完結
      		}, {
      			vertical: 'abc.png',
      			verticalPack: 'abc.png',
      			horizontal: 'abc.png',
      			horizontalPack: 'abc.png',
      			author: 'STUDIO',
      			id: 2000,
      			title: '30cm 立約人',
      			tagName: '官場',
      			tId: 10,
      			description: '惡魔聽見了你的聲音，但說好30cm卻變成 ...',
      			status: 2
      		}]
      	}],
      	...
      	msg: "成功"
      }

# 用戶資訊

## /user/info

### 動作 [POST]

- Parameters

	{ }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		id:789,
      		tempUid: "cZwzlUWC1wBH3j78urKELUM3VLNJVho7",
      		bookBean: 0,
      		registerTime: 1612429110191,
      		refid: 0,
      		linkid: 0,
      		isVip: 0,
      		vipEndtime: 0,
      		app: 1,
      		visitTime: 1613719521091,
      		isRecharge: 0,
      		isWXAttention: 0,
      		discountType: 0,
      		discountType: 0,
      	} // 遊客資料
      	{
      		app: 1,
      		vipEndtime: 0,
      		registerTime: 1595939685737,
      		discountEndtime: 0,
      		isWXAttention: 0,
      		bookBean: 30,
      		isVip: 0,
      		lastLoginTime: 1615455146884,
      		uid: 5939,
      		password: "111111",
      		linkid: 0,
      		phone: "13111111111",
      		discountType: 0,
      		isRecharge: 0,
      		refid: 0,
      		lang: 1
      	} // 會員資料
      	msg: "成功"
      }

# 用戶登入

## /user/login

### 動作 [POST]

- Parameters

	{
      	phone: 13111111111,
      	password: 111111,
		linkid: 0
	}

- Response 200 (application/json)

      {
      	code: 0,
      	data: null,
      	msg: "成功"
      }

# 用戶註冊

## /user/reg

### 動作 [POST]

- Parameters

      {
      	phone: 13111111111
      	password: 111111
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: null,
      	msg: "成功"
      }

# 漫畫分類清單

## /cartoonType/list

### 動作 [POST]

- Parameters

      {
      	lang: 1,
		sort: 0
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		"id": 5,
      		"lang": 1,
      		"typename": "玄幻",
      		"status": 1,
      		"cover": null,
      		"remark": null,
      		"sextype": 1,
      		"sort": 6
      	}, {
      		"id": 4,
      		"lang": 1,
      		"typename": "黑道",
      		"status": 1,
      		"cover": null,
      		"remark": null,
      		"sextype": 1,
      		"sort": 5
      	}, {
      		"id": 3,
      		"lang": 1,
      		"typename": "校园",
      		"status": 1,
      		"cover": null,
      		"remark": null,
      		"sextype": 1,
      		"sort": 4
      	}]
      	msg: "成功"
      }

# 漫畫分類書籍

## /cartoon/lists

### 動作 [POST]

- Parameters

      {
      	typeId: 1,
      	lang: 1,
      	sexy: 0,
      	status: 0,
      	pagesize: 20,
      	page: 1
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		"id": 2001,
            "tid": 12,
            "typename": "都市",
            "readmode": null,
            "sexy": 1,
            "lang": 1,
            "title": "他的女人",
            "description": "无可奈何的情况下,拜倒于各个石榴裙下的男子,体验偷情的快感...",
            "author": "情话",
            "status": 2,
            "thumb": "mh/2001/20210326/6d4cdc6822a4423fae061d6d03156839.jpg",
            "thumbX": "mh/2001/20210916/ece57b8956a7431a9e9f0ae1ce7d2ef4.jpg",
            "tag": "他的女人",
            "isOffline": 1,
            "isSearch": 1,
            "bookIndex": 0,
            "updateTime": 1650446882448,
            "createTime": 1970,
            "totalPage": 0
      	}, {
      		"id": 101144,
            "tid": 16,
            "typename": "3D",
            "readmode": null,
            "sexy": 1,
            "lang": 1,
            "title": "借你娘子泄泄火外传-女侠程瑶篇01",
            "description": "相公为了练功完全不理我，家里的长工因此得到机会...",
            "author": "haruna1",
            "status": 1,
            "thumb": "newupload/101144/20220401/1fe0c205a91b492296f1faac599a676f.png",
            "thumbX": "newupload/101144/20220401/3a9309633a4a47238912d06b88c55983.png",
            "tag": "",
            "isOffline": 1,
            "isSearch": 1,
            "bookIndex": 0,
            "updateTime": 1648798256351,
            "createTime": 1648687444656,
            "totalPage": 0
      	}]
      	msg: "成功"
      }

# 環境網域

## /domain/getDomainByTypes

### 動作 [POST]

- Parameters

      {
      	typeString: 4
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		"4": [{
      			id: 4,
      			domain: "http://dev.jt.ccgert.com",
      			base64: 1
      		}]
      	}]
      	msg: "成功"
      }

# 產圖 domain

## /domain/get

### 動作 [POST]

- Parameters

      {
      	type: 8 // 8 imgdomain, 99 domainlist
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		"id": 23,
      		"domain": "http://dev.img.ccgert.com/w/",
      		"base64": 1
      	}]
      	msg: "成功"
      }

# 公告列表

## /bulletin/list

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		total: 4,
      		list: [{
      			id: 108,
      			imagePath: "bulletin/20200701/a2242aa.jpg",
      			tag: 2,
      			title: "邀请好友",
      			content: null,
      			status: 2,
      			releaseDate: 1593601043000,
      			createAt: 1593601043000,
      			updateAt: 1597980383000,
      			contentImagePath: null,
      			contentPageId: null,
      			contentBookId: null
      		}],
      		pageNum: 1,
      		pageSize: 20,
      		size: 4,
      		startRow: 1,
      		endRow: 4,
      		pages: 1,
      		prePage: 0,
      		nextPage: 0,
      		isFirstPage: true,
      		isLastPage: true,
      		hasPreviousPage: false,
      		hasNextPage: false,
      		navigatePages: 8,
      		navigatepageNums: [1],
      		"navigateFirstPage": 1,
      		"navigateLastPage": 1
      	}
      	msg: "成功"
      }

# 公告單則

## /bulletin/selectById

### 動作 [POST]

- Parameters

      {
      	id: 1
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		id: 111,
      		imagePath: "bulletin/20210106/ssss111.png",
      		tag: 1,
      		title: "奈斯视频限时免费",
      		content: null,
      		status: 2,
      		releaseDate: 1597129932000,
      		createAt: 1597129932000,
      		updateAt: 1613998237000,
      		contentImagePath: "bulletin/20210106/aaa123.png",
      		contentPageId: 5,
      		contentBookId: 0
      	},
      	msg: "成功"
      }

# 充值列表

## /pay/pricelist

### 動作 [POST]

- Parameters

      {
      	app: 1 // 1. wap, 2. app
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [
      		{
      			id: 23,
      			app: 0,
      			lang: 1,
      			description: "测试",
      			price: 1,
      			bean: 170,
      			status: 1,
      			isVip: 1,
      			vipName: null,
      			vipDay: null,
      			sort: 0,
      			isDefault: 0,
      			isRepeat: 1,
      			tag: "{\"icon\":\"\",\"label\":\"测试\"}",
      			specificPay: null,
      			realBean: 100,
      			givePrice: 6,
      			giveBean: 70,
      			isHot: 1,
      			isPromote: 1
      		}, {
      			"id": 17,
      			"app": 0,
      			"lang": 1,
      			"description": "3000金币+0金币|送0元",
      			"price": 30,
      			"bean": 3000,
      			"status": 1,
      			"isVip": 1,
      			"vipName": "",
      			"vipDay": 0,
      			"sort": 1,
      			"isDefault": 0,
      			"isRepeat": 1,
      			"tag": "{\"icon\":\"\",\"label\":\"\"}",
      			"specificPay": null,
      			"realBean": 3000,
      			"givePrice": 0,
      			"giveBean": 0,
      			"isHot": 0,
      			"isPromote": 0
      		}
      	]
      	msg: "成功"
      }

# 充值列表測試

## /pay/pricetest

### 動作 [POST]

- Parameters

      {
      	app: 1 // 1. wap, 2. app
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [
      		{
      			id: 23,
      			app: 0,
      			lang: 1,
      			description: "测试",
      			price: 1,
      			bean: 170,
      			status: 1,
      			isVip: 1,
      			vipName: null,
      			vipDay: null,
      			sort: 0,
      			isDefault: 0,
      			isRepeat: 1,
      			tag: "{\"icon\":\"\",\"label\":\"测试\"}",
      			specificPay: null,
      			realBean: 100,
      			givePrice: 6,
      			giveBean: 70,
      			isHot: 1,
      			isPromote: 1
      		}, {
      			"id": 17,
      			"app": 0,
      			"lang": 1,
      			"description": "3000金币+0金币|送0元",
      			"price": 30,
      			"bean": 3000,
      			"status": 1,
      			"isVip": 1,
      			"vipName": "",
      			"vipDay": 0,
      			"sort": 1,
      			"isDefault": 0,
      			"isRepeat": 1,
      			"tag": "{\"icon\":\"\",\"label\":\"\"}",
      			"specificPay": null,
      			"realBean": 3000,
      			"givePrice": 0,
      			"giveBean": 0,
      			"isHot": 0,
      			"isPromote": 0
      		}
      	]
      	msg: "成功"
      }

# 付款列表

## /pay/newPayment

### 動作 [POST]

- Parameters

      {
      	price_id: 23
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		id: 10239,
      		sdk: "Weixin"
      	}]
      	msg: "成功"
      }

# 測試付款列表

## /pay/testPayment

### 動作 [POST]

- Parameters

      {
      	price_id: 23
      }

- Response 200 (application/json)ccgert.com

      {
      	code: 0,
      	data: [{
      		id: 10239,
      		sdk: "Weixin"
      	}]
      	msg: "成功"
      }ccgert.com

# 付款

## /order/confirm

### 動作 [POST]

- Parameters

      {
      	priceId: 23,
      	app: 1,
		vid: 15, // 影片id 沒有則給 null
      	paymentId: 10239,
      	callbackUrl: "http://dev.cartoon.ccgert.com/success"
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		orderId: "CTT161536058516425847",
      		payurl: "https://wx.tenpay.com/checkmweb?&redirect_url=http://dev.cartoon.ccgert.com/success"
      	}
      	msg: "成功"
      }

# 取得高爆庫漫畫

## /cartoon/rand

### 動作 [POST]

- Parameters

      {
      	bookId: 2679, // 漫畫 id
      	id: 2 // 類別 id
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		id: 2679,
      		tid: 12,
      		typename: "都市",
      		readmode: 1,
      		sexy: 1,
      		lang: 1,
      		title: "健身教练",
      		description: "贤秀是业绩万年垫底的健身教练，而组长杰森凭着销售能力和亲密的肢体接触长年独佔业绩第一名的宝座。当青梅竹马来到健身房运动时，贤秀要怎么阻止她遭受到杰森的毒手呢？",
      		author: "G.HO & 高孙志",
      		status: 1,
      		thumb: "mh/2679/20201007/d1e351aee68047ceb62e449e71afae13.jpg",
      		thumbX: "mh/2679/20201110/6d4ab5972918419e81c44f0cdad0e556.jpg",
      		tag: "",
      		isOffline: 1,
      		isSearch: 1,
      		bookIndex: 0,
      		updateTime: 1614822702956,
      		createTime: 1578410468039,
      		totalPage: 0
      	}
      	msg: "成功"
      }

# 取得漫畫開始章節

## /history/last

### 動作 [POST]

- Parameters

      {
      	bookId: 2679
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		id: 24957,
      		bookid: 2679,
      		readmode: 1,
      		name: "第1章",
      		thumb: "newupload/20200108/b3ee13282be947448af1f8f1606ad906.jpg",
      		bookBean: 0,
      		sort: 1,
      		isOffline: 1,
      		images: null,
      		image: [
      			"newupload/20200107/fea322d350e743e38c16ecf2991c19d9.jpg",
      			"newupload/20200107/8ab934408ff84b40a07c90328061482a.jpg",
      			"newupload/20200107/0de32292f1b748a5843af2a897d25158.jpg",
      			"newupload/20200107/b5c4efbf380142519847dbd5bf443e69.jpg",
      			"newupload/20200107/92c043faa2a449238f35f836ece7490d.jpg"
      		],
      		nextid: 24958,
      		previd: 0,
      		maxsort: null,
      		minsort: null,
      		book: {
      			id: 2679,
      			tid: 12,
      			typename: "都市",
      			readmode: 1,
      			sexy: 1,
      			lang: 1,
      			title: "健身教练",
      			description: "贤秀是业绩万年垫底的健身教练，而组长杰森凭着销售能力和亲密的肢体接触长年独佔业绩第一名的宝座。当青梅竹马来到健身房运动时，贤秀要怎么阻止她遭受到杰森的毒手呢？",
      			author: "G.HO & 高孙志",
      			status: 1,
      			thumb: "mh/2679/20201007/d1e351aee68047ceb62e449e71afae13.jpg",
      			thumbX: "mh/2679/20201110/6d4ab5972918419e81c44f0cdad0e556.jpg",
      			tag: "",
      			isOffline: 1,
      			isSearch: 1,
      			bookIndex: 0,
      			updateTime: 1604980848810,
      			createTime: 1578410468039,
      			totalPage: 0
      		}
      	}
      	msg: "成功"
      }

# 取得漫畫本章節與下一個章節內容

## /chapter/chapterWithNext

### 動作 [POST]

- Parameters

      {
      	chapterId: 7249
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		id: 7249,
      		bookid: 2202,
      		readmode: 1,
      		name: "第 1 章",
      		thumb: "new/20190328/uploads/11d7dc9b8d9693fb6cf3ca446ef76fa5.jpg",
      		bookBean: 0,
      		sort: 1,
      		isOffline: 1,
      		images: null,
      		image: [
      			"new/20190328/15/aead1d18fcfb5204f070090a00e73cc6.jpg",
      			"new/20190328/15/d9a5699ae87898ddbedeb6dd7e63ffac.jpg"
      		],
      		nextid: 7250,
      		previd: 0,
      		maxsort: null,
      		minsort: null,
      		book: {
      			id: 2202,
      			tid: 12,
      			typename: "都市",
      			readmode: 1,
      			sexy: 1,
      			lang: 1,
      			title: "Video",
      			description: "人生并不是一场电影.令人心情无比悸动的火花只在电影里燃烧…",
      			author: "Hook",
      			status: 2,
      			thumb: "new/20190328/uploads/e02336f52a393c5559b9a4730f3ff471.jpg",
      			thumbX: "new/20190328/uploads/1b9d29940d6afb432486e104d90c6be7.jpg",
      			tag: "巨乳|性感|偷情",
      			isOffline: 1,
      			isSearch: 1,
      			bookIndex: 0,
      			updateTime: 1573808149443,
      			createTime: 1553758832,
      			totalPage: 0
      		}
      	}, {
      		id: 7250,
      		bookid: 2202,
      		readmode: 1,
      		name: "第 2 章",
      		thumb: "new/20190328/uploads/0d256b2bfbb27dbabd6b668b9d34ab1b.jpg",
      		bookBean: 0,
      		sort: 2,
      		isOffline: 1,
      		images: null,
      		image: [
      			"new/20190328/15/d2b31f2f0ee7b1114af2bd4b702c21c0.jpg",
      			"new/20190328/15/bcfe950939c163a7f72540c689c2e5d8.jpg"
      		],
      		nextid: 7251,
      		previd: 7249,
      		maxsort: null,
      		minsort: null,
      		book: {
      			id: 2202,
      			tid: 12,
      			typename: "都市",
      			readmode: 1,
      			sexy: 1,
      			lang: 1,
      			title: "Video",
      			description: "人生并不是一场电影.令人心情无比悸动的火花只在电影里燃烧…",
      			author: "Hook",
      			status: 2,
      			thumb: "new/20190328/uploads/e02336f52a393c5559b9a4730f3ff471.jpg",
      			thumbX: "new/20190328/uploads/1b9d29940d6afb432486e104d90c6be7.jpg",
      			tag: "巨乳|性感|偷情",
      			isOffline: 1,
      			isSearch: 1,
      			bookIndex: 0,
      			updateTime: 1573808149443,
      			createTime: 1553758832,
      			totalPage: 0
      		}
      	}]
      	msg: "成功"
      }

# 閱讀紀錄

## /history/join

### 動作 [POST]

- Parameters

      {
      	bookId: 2201,
      	chapterId: 7225
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: null,
      	msg: "成功"
      }

# 更多漫畫

## /statiscartoon/minlist

### 動作 [POST]

- Parameters

      {
      	num: 20,
      	sort: 1,
      	page: 1,
      	lang: 1,
      	sortField: 'rate_order'
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		id: 5961,
      		tid: 16,
      		typename: "3D",
      		readmode: 2,
      		sexy: 1,
      		lang: 1,
      		title: "宅男浩劫",
      		description: "未来宅男系列剧情很有保证，里头还有当红女星，画得惟妙惟肖",
      		author: "兰陵君",
      		status: 2,
      		thumb: "mh/5961/20201028/7dd4184f80714320881c899b8352bfe6.jpg",
      		thumbX: "mh/5961/20201028/f193f0c4c64f407db9b23cc21f570194.jpg",
      		thumbPack: "",
      		thumbXPack: "",
      		tag: "",
      		isOffline: 1,
      		isSearch: 1,
      		bookIndex: 0,
      		updateTime: 1603935197809,
      		createTime: 1603876712079,
      		totalPage: 0
      	}]
      	msg: "成功"
      }

# 閱讀紀錄

## /history/lists

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		id: 2201,
      		tid: 12,
      		title: "夏美我的爱",
      		author: "TAIRA",
      		thumb: "b77ec4d1b76eb4fcd464d33a1bb0220c.jpg",
      		chapterId: 7226,
      		chapterName: "第 2 章",
      		time: 1616753353819
      	}]
      	msg: "成功"
      }

# 我的書架

## /fav/list

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		id: 3164674,
      		istemp: 1,
      		userid: 6652,
      		bookid: 2200,
      		bookInfo: {
      			id: 2200,
      			tid: 12,
      			typename: "都市",
      			readmode: null,
      			sexy: 1,
      			lang: 1,
      			title: "魔女",
      			description: "永生不死的魔女，却执着于转瞬而逝的爱！",
      			author: "海允",
      			status: 2,
      			thumb: "f2a0e2ea7ae9480b962c1c4651603fc7.jpg",
      			thumbX: "96363eb733fd48f68b89fd071aa1eeb2.jpg",
      			thumbPack: null,
      			thumbXPack: null,
      			tag: "爱情|浪漫|美少女",
      			isOffline: 1,
      			isSearch: 1,
      			bookIndex: 0,
      			updateTime: 1584084668398,
      			createTime: 1553745160,
      			totalPage: 0
      		},
      		"addTime": 1616997107292
      	}]
      	msg: "成功"
      }

# 新增 / 移除 我的書架

## /fav/add

### 動作 [POST]

- Parameters

      {
      	bookid: 2600
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: null
      	msg: "成功 / 该漫画已经移出书架"
      }

# 移除 漫畫紀錄

## /history/remove

### 動作 [POST]

- Parameters

      {
      	bookid: 2600
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: null
      	msg: "成功"
      }

# 移除 漫畫紀錄一鍵清除

## /history/removeAll

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: null
      	msg: "成功"
      }

# 漫畫詳情

## /cartoon/info

### 動作 [POST]

- Parameters

      {
      	cartoonId: 2301
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		id: 2301,
      		tid: 1,
      		typename: "官场",
      		readmode: 1,
      		sexy: 1,
      		lang: 1,
      		title: "ace_禁断的诈欺之夜",
      		description: "專門欺騙女人海撈一筆的高手牛郎佑彬，面對出現在眼前的獵物富家女高韻，他將展開猛烈的攻勢騙取她的一切...",
      		author: "胎毛&野大豆",
      		status: 2,
      		thumb: "newupload/20190920/d1126f30ec3c4b55a0fe38ac5271b646.jpg",
      		thumbX: "newupload/20190910/03b726c93abe4f9e9af5a81edbc2f580.jpg",
      		thumbPack: null,
      		thumbXPack: null,
      		tag: "",
      		isOffline: 1,
      		isSearch: 1,
      		bookIndex: 0,
      		updateTime: 1573795707337,
      		createTime: 1568101344647,
      		totalPage: 0
      	}
      	msg: "成功"
      }

# 漫畫目錄

## /chapter/catalog

### 動作 [POST]

- Parameters

      {
      	cartoonId: 2989,
      	pagesize: 20,
      	page: 1,
      	sort: 0
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		cChapterList: [{
      			id: 37519,
      			bookid: 2989,
      			readmode: null,
      			name: "第1章",
      			thumb: "mh/2989/20200413/f1af3e7727b34d24b16bae93cc794d85.jpg",
      			bookBean: 0,
      			sort: 1,
      			isOffline: null,
      			images: null,
      			image: null,
      			nextid: null,
      			previd: null,
      			maxsort: null,
      			minsort: null,
      			book: null
      		}, {
      			id: 37521,
      			bookid: 2989,
      			readmode: null,
      			name: "第2章",
      			thumb: "mh/2989/20200413/30bcf25c1c334212bb50256a83b94f8c.jpg",
      			bookBean: 0,
      			sort: 2,
      			isOffline: null,
      			images: null,
      			image: null,
      			nextid: null,
      			previd: null,
      			maxsort: null,
      			minsort: null,
      			book: null
      		}]
      		"count": 47
      		}
      	msg: "成功"
      }

# 搜尋漫畫

## /cartoon/search

### 動作 [POST]

- Parameters

      {
      	keyword: '我的'
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		id: 3008,
      		tid: 12,
      		typename: "都市",
      		readmode: null,
      		sexy: 1,
      		lang: 1,
      		title: "我的棉花糖",
      		description: "恋爱4年陷入倦怠期的情侣他们该如何克服频发的危机?",
      		author: "梅雨,斑点",
      		status: 2,
      		thumb: "mh/3008/20200603/38d707f9cad04c2588b9ea535988a10f.jpg",
      		thumbX: "mh/3008/20200603/c5d0849c59be4b0897ec9a5cdb8948e7.jpg",
      		thumbPack: null,
      		thumbXPack: null,
      		tag: "",
      		isOffline: 1,
      		isSearch: 1,
      		bookIndex: 0,
      		updateTime: 1604286577164,
      		createTime: 1585719990562,
      		totalPage: 0
      	}]
      	msg: "成功"ccgert.com
      }

# 下載app

## /index/download

### 動作 [POST]

- Parameters

      {
      	platform: 1, // 裝置 wap
		linkid: 0,
		rechargeFlag: 1 // 是否充值下載 1 否, 2 是
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		updateTime: 0,
			url: "http://dev.download.ccgert.com/version-client/999/debug_124.apk",
			version: "1.2.4"
      	}]
      	msg: "成功"
      }

# 消費紀錄

## /tradeRecord/lists

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
  			total: 73,
  			list: [{
				id: 1915073,
				userid: 1632540,
				bookid: 2514,
				bookName: "漂亮干姊姊",
				chapeterid: 17839,
				chapeterName: "第15章",
				bookBean: 60,
				surplusBookBean: 125492,
				time: 1621422639752
			}],
			pageNum: 1,
			pageSize: 20,
			size: 20,
			startRow: 1,
			endRow: 20,
			pages: 4,
			prePage: 0,
			nextPage: 2,
			isFirstPage: true,
			isLastPage: false,
			hasPreviousPage: false,
			hasNextPage: true,
			navigatePages: 8,
			navigatepageNums: [1, 2, 3, 4],
			navigateFirstPage: 1,
			navigateLastPage: 4
		},
      	msg: "成功"
      }

# 消費紀錄含影片

## tradeRecord/AllTradeRecordlists

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
  			total: 73,
  			list: [{
                type: "cartoon",
                name: "漂亮干姊姊",
                userId: "1632540",
                id: "2514",
                chapeterid: 17834,
                chapeterName: "第10章",
                bookBean: 60,
                surplusBookBean: 125792,
                time: "2021/05/19 19:09:59"
            }, {
                type: "video",
                name: "亚洲巨乳正妹自拍抠穴自慰粉粉大乳晕和鲍鱼好赞",
                userId: "1632540",
                id: "577",
                chapeterid: null,
                chapeterName: null,
                bookBean: 50,
                surplusBookBean: null,
                time: "2021-04-14 18:04:02"
            }],
			pageNum: 1,
			pageSize: 20,
			size: 20,
			startRow: 1,
			endRow: 20,
			pages: 4,
			prePage: 0,
			nextPage: 2,
			isFirstPage: true,
			isLastPage: false,
			hasPreviousPage: false,
			hasNextPage: true,
			navigatePages: 8,
			navigatepageNums: [1, 2, 3, 4],
			navigateFirstPage: 1,
			navigateLastPage: 4
		},
      	msg: "成功"
      }

# 找回用戶

## /order/user

### 動作 [POST]

- Parameters

      { 
		  orderId: "CTT162261633633535094"
	  }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
  			temp: 0,
			uid: "13958375893"
		},
      	msg: "成功"
      }

# 更改密碼

## /user/reset/password

### 動作 [POST]

- Parameters

      { 
		  	phone: 13958375893,
			passwordOrig: "awwwwww",
			password: "wwwwwww"
	  }

- Response 200 (application/json)

      {
      	code: 0,
      	data: "密码更改成功",
      	msg: "成功"ccgert.com
      }

# 我的分享資訊 / 新增分享碼

## /recommend/parent

### 動作 [POST]

- Parameters

      { 
		  recommendcode: 11 // 查詢資訊則不用傳
	  }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
			errmsg: "",
			isTemp: 0,
			parentUid: 0,
			shareUrl: "http://dev.cartoon.ccgert.com/",
			uid: 1641976
		},
      	msg: "成功"
      }

# 首頁公告彈窗

## /event/advertising/latest

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
			createAt: 1597129773000,
			id: 28,
			imagePath: "bulletin/20201223/123.png",
			link: "",
			status: 1,
			type: 1,
			updateAt: 1619576837000
		},
      	msg: "成功"
      }

# 會員等級資訊

## /user/getGiftList

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
			diamondBonusDayN: 29,
			moneyTilLevelUp: 0,
			userGiftList: [{
				level: 1,
				levelName: "青铜",
				userGiftBonus: [{
					reward: 0,
					rewardName: "1000金币",
					status: 0
				}]
			}, {
				level: 3,
				levelName: "黄金",
				userGiftBonus: [{
					reward: 0,
					rewardName: "2000金币",
					status: 0
				}, {
					reward: 1,
					rewardName: "视频一日卡",
					status: 0
				}]
			}]
		},
      	msg: "成功"
      }


# 領取會員等級獎勵

## /user/receiveGift

### 動作 [POST]

- Parameters

      { 
		level: 1,
		reward: 0
	  }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
			msg: "领取成功",
			status: true
		  },
      	msg: "成功"
      }

# 取得視頻分享 linkid

## /config/videosharelinkid

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: "1143",
      	msg: "成功"
      }

# 返回推薦列表

## /positionback/backUrlInfos

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [12345, 33245, 11334],
      	msg: "成功"
      }


# 廣告列表

## /dsp/list
### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
			id: 14,
			zid: 6,
			groupid: 1,
			status: 0,
			user: 0,
			vip: 0,
			recharge: 0,
			close: 1,
			interval: 2,
			sec: 0,
			target: 1,
			apiUrl: "http://dev.api.523.ccgert.com/www/two/jsonapi.php?xid=6",
			apiData: {
				clickurl: "http://dev.api.523.ccgert.com/www/delivery/cl.php?dd6066a2634edf825c__oadest=123",
				imgurl: "http://dev.img.ccgert.com/w/ad/30651ee76ee4473c98bedb1dcd411755.html",
				callbackurl: "http://dev.api.523.ccgert.com/www/delivery/lg.php?bannerid=137__campaignid=1__zoneid=6__cb=c4cf15bf35"
			}
		}]
      	msg: "成功"
      }

# 廣告業務代理聯絡資訊

## /connectionInfo/getList

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
			username: "@mhhzsw",
			software: "Telegram",
			url: "https://t.me/mhhzsw"
		}]
      	msg: "成功"
      }

# 確認域名是否為舊的

## /domain/checkDomain

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: 'http://dev.cartoon.nxgqf.com/', 有比對到當下域名則給 "" 空值
      	msg: "成功"
      }

# 視頻維護列表

## /publicchannel/hide

### 動作 [POST]

- Parameters

      {
		platform: 1
	  }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
			"id": 999,
			"hideVideo": 1
		}, {
			"id": 1150,
			"hideVideo": 2 // 2 為維護渠道
		}, {
			"id": 1156,
			"hideVideo": 2
		}]
      	msg: "成功"
      }

	  
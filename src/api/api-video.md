# 首頁影片列表

## /list

### 動作 [POST]

- Parameters

	{
      	pageCount: 20
	}

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		id: 20994,
      		name: "(迷奸)妹妹的同学好舒服",
      		price: 50,
      		video_path: "",
      		video_long: 363,
      		playcounts: 6774,
      		favcounts: 354,
      		tags: [{
      			id: 42,
      			name: "强奸"
      		}, {
      			id: 2,
      			name: "素人"
      		}],
      		content: "<p>(迷奸)妹妹的同学好舒服</p>",
      		thumbImg: "/mv/20994/thumb_20994.jpeg",
      		thumbWidth: "",
      		thumbHeight: "",
      		isFav: 0
      	}],
      	msg: "成功"
      }

# 首頁影片列表隨機

## /randomlist

### 動作 [POST]

- Parameters

	{
		page: 1,
		pageCount: 20
	}

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		id: 20994,
      		name: "(迷奸)妹妹的同学好舒服",
      		price: 50,
      		video_path: "",
      		video_long: 363,
      		playcounts: 6774,
      		favcounts: 354,
      		tags: [{
      			id: 42,
      			name: "强奸"
      		}, {
      			id: 2,
      			name: "素人"
      		}],
      		content: "<p>(迷奸)妹妹的同学好舒服</p>",
      		thumbImg: "/mv/20994/thumb_20994.jpeg",
      		thumbWidth: "",
      		thumbHeight: "",
      		isFav: 0
      	}],
      	msg: "成功"
      }

# 影片圖片 domain

## /getVideoDomainType

### 動作 [POST]

- Parameters

      {
            typeString: 20
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		"20": [{
      			"id": 1,
      			"domain": "http://dev.vs.ccgert.com",
      			"base64": 1
      		}]
      	}
      	msg: "成功"
      }

# 影片細節 (播放)

## /player

### 動作 [POST]

- Parameters

      {
            vid: 57450
        }

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		id: 57450,
      		name: "【完全素人70】沙也加18歲其之9、超M美少女肛交＆播種中出2連發FC2-PPV-1285772",
      		favorite: 293,
      		view: 5817,
      		img_path: "/mv/57450/thumb_57450.jpeg",
      		m3u8_secs: 4449,
      		video_path: "/playlist/a3612566cb6f2994c56e703028e8b12f/0LzV5",
      		price: 50,
      		nofree: 0,
      		tags: [
      			{
      				id: 2,
      				name: "素人"
      			},
      			{
      				id: 1,
      				name: "巨乳"
      			}
      		],
      		video_previewpath: "/preview/a3612566cb6f2994c56e703028e8b12f/zwZVS",
      		isFav: 0,
      		freetime: {
      			use: 0,
      			count: 1
      		},
      		bookbean: {
      			bookbean: 572
      		}
      	}
      	msg: "成功"
      }

# 影片預覽

## /preview

### 動作 [POST]

- Parameters

	{
		vid: 57450
	}

- Response 200 (application/json)

      {
      	code: 0,
      	data: {
      		video_previewpath: "/preview/d42cf88e8a3e00370f0a2841f868af42pwap33996/8U0f3"
      	}
      	msg: "成功"
      }


# 排行榜標籤

## /showtoptags

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [
      		{
      			id: 25,
      			tag: "排行"
      		}, {
      			id: 50,
      			tag: "日排行"
      		}
      	]
      	msg: "成功"
      }

# 影片標籤

## /showtags

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [
      		{
      			id: 1,
      			tag: "巨乳"
      		}, {
      			id: 2,
      			tag: "素人"
      		}
      	]
      	msg: "成功"
      }

# 影片分類列表

## /catelist

### 動作 [POST]

- Parameters

      {
      	tag: 1,
      	page: 1,
      	pageCount: 20
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
      		id: 272,
      		name: "母猪骑上我",
      		price: 50,
      		video_path: "",
      		video_long: 239,
      		playcounts: 11995,
      		favcounts: 363,
      		tags: [{
      			id: 1,
      			name: "巨乳"
      		}, {
      			id: 3,
      			name: "人妻"
      		}, {
      			id: 10,
      			name: "口交"
      		}],
      		content: "<p>帮我吹喇叭吹到都湿了....</p>",
      		thumbImg: "/mv/272/title.jpeg",
      		thumbWidth: "",
      		thumbHeight: "",
      		isFav: 0
      	}, {
      		id: 548,
      		name: "亚洲下流男子偷拍巨乳学生妹浴室洗澡年轻肉体真棒",
      		price: 50,
      		video_path: "",
      		video_long: 278,
      		playcounts: 10294,
      		favcounts: 640,
      		tags: [{
      			id: 14,
      			name: "偷拍"
      		}, {
      			id: 15,
      			name: "熟女"
      		}],
      		content: "<p>亚洲下流男子偷拍巨乳学生妹浴室洗澡年轻肉体真棒</p>",
      		thumbImg: "/mv/548/thumb_548.jpeg",
      		thumbWidth: "",
      		thumbHeight: "",
      		isFav: 0
      	}]
      	msg: "成功"
      }

# 我的視頻

## /listmyvideo

### 動作 [POST]

- Parameters

      {
      	page: 1,
      	pageCount: 20
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
			id: 272,
			name: "母猪骑上我",
			price: 50,
			video_path: "",
			video_long: 239,
			playcounts: 12000,
			favcounts: 364,
			tags: [{
				id: 1,
				name: "巨乳"
			}, {
				id: 3,
				name: "人妻"
			}],
			content: "<p>帮我吹喇叭吹到都湿了....</p>",
			thumbImg: "/mv/272/title.jpeg",
			thumbWidth: "",
			thumbHeight: "",
			isFav: 1
		}]
      	msg: "成功"
      }

# 觀看紀錄

## /listmyvideo

### 動作 [POST]

- Parameters

      {
      	page: 1,
      	pageCount: 20
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
			id: 272,
			name: "母猪骑上我",
			price: 50,
			video_path: "",
			video_long: 239,
			playcounts: 12000,
			favcounts: 364,
			tags: [{
				id: 1,
				name: "巨乳"
			}, {
				id: 3,
				name: "人妻"
			}],
			content: "<p>帮我吹喇叭吹到都湿了....</p>",
			thumbImg: "/mv/272/title.jpeg",
			thumbWidth: "",
			thumbHeight: "",
			isFav: 1
		}]
      	msg: "成功"
      }

# 刪除我的視頻

## /delmyvideo

### 動作 [POST]

- Parameters

      {
      	vid: 81790
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: null,
      	msg: "成功"
      }

# 刪除觀看紀錄

## /delplayhist

### 動作 [POST]

- Parameters

      {
      	hisid: 81790
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: null,
      	msg: "成功"
      }


# 收藏我的視頻

## /addmyvideo

### 動作 [POST]

- Parameters

      {
      	vid: 81790
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: null,
      	msg: "成功"
      }

# 搜尋影片

## /search

### 動作 [POST]

- Parameters

      {
		vname: '制服',
      	page: 1,
      	pageCount: 20
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [{
			id: 272,
			name: "母猪骑上我",
			price: 50,
			video_path: "",
			video_long: 239,
			playcounts: 12000,
			favcounts: 364,
			tags: [{
				id: 1,
				name: "巨乳"
			}, {
				id: 3,
				name: "人妻"
			}],
			content: "<p>帮我吹喇叭吹到都湿了....</p>",
			thumbImg: "/mv/272/title.jpeg",
			thumbWidth: "",
			thumbHeight: "",
			isFav: 1
		}]
      	msg: "成功"
      }

# tag統計

## /analytics/tag

### 動作 [POST]

- Parameters

      {
		tag: 25
      }

- Response 200 (application/json)

      {
      	code: 0,
      	data: null,
      	msg: "成功"
      }

# 搜尋關鍵字

## /hot/getkeywords

### 動作 [POST]

- Parameters

      { }

- Response 200 (application/json)

      {
      	code: 0,
      	data: [
			"巨乳",
			"妹子",
			"身材",
			"少妇",
			"制服",
			"学生妹",
			"后入",
			"3P",
			"口交",
			"喷水",
			"自拍",
			"女友",
			"美女",
			"酒店",
			"自慰"
		]
      	msg: "成功"
      }

	  getkeywords
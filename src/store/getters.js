const handleAd = (ads, zid) => {
  if (!ads.length) return null
  const ad = ads.find(item => {
    return item.zid === zid
  })
  if (ad) {
    const {
      zid,
      apiData: { clickurl, imgurl, optionstr },
      interval,
      status,
      target: another,
      close: hasClose
    } = ad
    const title = optionstr ? JSON.parse(optionstr).title : '广告'
    const description = optionstr ? JSON.parse(optionstr).desc : ''
    return status === 0
      ? null
      : {
          zid,
          clickurl,
          imgurl,
          interval,
          another,
          hasClose,
          title,
          description
        }
  }
  return null
}

export default {
  hasToken: state => {
    const {
      auth: { token }
    } = state
    return !!token
  },

  isUserLogin: state => {
    const {
      auth: { istemp }
    } = state
    return !istemp
  },

  backRecommendchapterIds: state => {
    const { backBooks } = state
    if (backBooks.length > 0) {
      return backBooks.map(item => {
        return item.chapterId
      })
    } else return []
  },

  isVideoMaintain: state => {
    const {
      videoMaintainList,
      auth: { linkid }
    } = state
    return videoMaintainList.some(item => {
      return item.id === Number(linkid) && (item.hideVideo === 1 || item.hideVideo === 2)
    })
  },

  ad_banner_7: state => {
    const { ads } = state
    return handleAd(ads, 7)
  },

  ad_book_22: state => {
    const { ads } = state
    return handleAd(ads, 22)
  },

  ad_book_23: state => {
    const { ads } = state
    return handleAd(ads, 23)
  },

  ad_flow_18: state => {
    const { ads } = state
    return handleAd(ads, 18)
  },

  ad_flow_20: state => {
    const { ads } = state
    return handleAd(ads, 20)
  },

  ad_flow_28: state => {
    const { ads } = state
    return handleAd(ads, 28)
  },

  ad_video_30: state => {
    const { ads } = state
    return handleAd(ads, 30)
  },

  ad_book_29: state => {
    const { ads } = state
    return handleAd(ads, 29)
  },

  ad_flow_31: state => {
    const { ads } = state
    return handleAd(ads, 31)
  },

  ad_flow_32: state => {
    const { ads } = state
    return handleAd(ads, 32)
  },

  ad_book_84: state => {
    const { ads } = state
    return handleAd(ads, 84)
  },

  ad_video_85: state => {
    const { ads } = state
    return handleAd(ads, 85)
  },

  ad_flow_25: state => {
    const { ads } = state
    return handleAd(ads, 25)
  },

  ad_flow_27: state => {
    const { ads } = state
    return handleAd(ads, 27)
  }
}

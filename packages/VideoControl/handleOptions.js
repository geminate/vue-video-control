const defaultOptions = {
  src: '',
  autoplay: false,
  poster: '',
  control: {
    show: true,
    focusPreview: {
      show: false,
      data: [1]
    },
    videoPreview: {
      show: false,
      imgUrl: '',
      totalNum: 10
    },
    videoTimer: {
      show: true
    },
    speedBtn: {
      show: true,
      speedArray: [0.5, 0.75, 1, 1.5, 2]
    },
    volumeBtn: {
      show: true
    },
    fullScreenBtn: {
      show: true
    }
  }
}

// 深度合并对象
const deepObjectMerge = (FirstOBJ, SecondOBJ) => {
  for (const key in SecondOBJ) {
    FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]' ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key]
  }
  return FirstOBJ
}

export const handleOptions = (options) => {
  return deepObjectMerge(defaultOptions, options)
}

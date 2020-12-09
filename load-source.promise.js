/*!
 * 纯js加载静态资源
 * (1)、 loadSource.style(link, onload) 加载单个css文件
 * (2)、 loadSource.script(link, onload) 加载单个js文件
 * 
 * @author Jiang Yang (Bestime)
 * @QQ 1174295440
 * @see https://github.com/bestime/load-source
 * @update 2020-12-09 17:33
 */

var loadSource = (function () {
  console.log('@see => https://github.com/bestime/load-source');

  var loadMap = {} // 缓存加载过的文件记录
  var autoid = 0 // 为每一次加载文件生成不同id

  function checkLoad (src, resolve) {
    var timer = setInterval(function () {
      if(loadMap[src].load) {
        clearInterval(timer)
        resolve()
      } else if(loadMap[src].fail) {
        clearInterval(timer)
      }
    }, 100)
  }

  /**
   * 懒加载js或css，防止网站首次加载体积太大
   * 同一链接进行了缓存，防止多次载入
   * 
   * @param {String} type 文件类型
   * @param {String} src 文件路径
   * @param {Function} callback 加载成功回调
   */
  function loadStaticSource (type, src) {  
    var srcId;  
    return new Promise(callback => {
      if(loadMap[src]) {
        srcId = loadMap[src]
        checkLoad(src, callback)
      } else {
        srcId = `${type}-${++autoid}`
        loadMap[src] = {
          id: srcId,
          load: false,
          fail: false
        }
        var oScript = document.createElement(type)
        oScript.id = srcId
        var oHead = document.getElementsByTagName('head')[0]
        switch (type) {
          case 'script':
            oScript.src = src
            break;
          case 'style':
            oScript.href = src
            oScript.setAttribute('rel', 'stylesheet')
            break;
        }
        oScript.onload = function () {
          loadMap[src].load = true
          callback()
        }
        oScript.onerror = function () {
          loadMap[src].load = false
          loadMap[src].fail = true
        }
        oHead.insertBefore(oScript, oHead.children[0])
      }
    })
  }

  function loadScript (src) {
    return loadStaticSource('script', src)  
  }

  function loadStyle (href) {
    return loadStaticSource('style', href)
  }

  return {
    script: loadScript,
    style: loadStyle
  }
})();
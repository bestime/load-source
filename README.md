## 动态加载javascript、css资源

> 载入资源

```html
<script src="./load-source.js"></script>
```


> 加载单个javascript文件

```javascript
loadSource.script('https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js', function () {
  console.log('一个javascript加载完毕')
})
```


> 加载单个css文件

```javascript
loadSource.style('./css/test.css', function () {
  console.log('一个样式加载完毕')
})
```

> 批量加载一个资源列表

```javascript
var allList = [
  { type: 'style', link: './css/test.css' },
  { type: 'script', link: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js' },
  { type: 'script', link: 'https://cdn.bootcdn.net/ajax/libs/Chart.js/3.0.0-beta.6/chart.min.js' },
  { type: 'script', link: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js' },
]
loadSource.all(allList, function () {
  console.log('所有资源加载完毕')
})
```
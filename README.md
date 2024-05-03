[更新日志](log.md)

# typewriter.js - 打字机效果JavaScript库

`typewriter.js`&#x202f;是一个用于在网页上创建打字机效果的轻量级JavaScript库。它可以模拟文本的逐字打印和删除效果，适用于网站的标题、介绍或任何需要动态文本效果的地方。

## 使用

```html
<script src="https://cdn.jsdelivr.net/gh/martinSCS/typewriter/typewriter.js"></script>
```

## 特点

- **自定义速度**：可以自定义打字速度和删除速度。
- **暂停时间**：可以分别设置打字和删除后的暂停时间。
- **循环播放**：支持文本的循环播放。
- **路由字典和路由映射**：支持通过路由字典和路由映射来实现复杂的打字效果。

## 使用方法

1. 在HTML文件中引入&#x202f;`typewriter.js`&#x202f;库：

   ```html
   <script src="path/to/typewriter.js"></script>
   ```

2. 创建一个用于显示打字效果的元素：

   ```html
   <div id="typewriter"></div>
   ```

3. 初始化&#x202f;`Typewriter`&#x202f;对象并开始打字效果：

   ```javascript
   const typewriter = new Typewriter(document.getElementById('typewriter'), ['Hello, World!', 'Welcome to my website!']);
   ```

## 配置参数

`Typewriter`&#x202f;构造函数接受以下参数：

- `element`: 要显示文本的DOM元素。
- `texts`: 要打印的文本数组。
- `typingSpeed` **(可选)**: 打字速度（毫秒/字符），默认为100。
- `deletingSpeed` **(可选)**: 删除速度（毫秒/字符），默认为50。
- `typingPauseTime` **(可选)**: 打字后的暂停时间（毫秒），默认为2000。
- `deletingPauseTime` **(可选)**: 删除后的暂停时间（毫秒），默认为0。
- `routeDict` **(可选)**: 路由字典，用于定义特殊字符的打字路径。
- `routeMap` **(可选)**: 路由映射，用于指定文本中特定位置字符的路由路径。
- `additionalFunc`&#x202f;**(可选)**: 可选函数，用于对每一步打字或删除操作产生出来的文字进行处理。

## 示例

```javascript
const typewriter = new Typewriter(
    document.getElementById('typewriter'),       // element
    ['Hello, World!', 'Welcome to my website!'], // texts
    100,                                         // typingSpeed
    50,                                          // deletingSpeed
    2000,                                        // typingPauseTime
    500,                                         // deletingPauseTime
    {},                                          // routeDict
    {}                                           // routeMap
);
```

以上代码会在&#x202f;`#typewriter`&#x202f;元素中创建一个打字机效果，依次打印“Hello, World!”和“Welcome to my website!”，每个字符的打字速度为1字每100毫秒，删除速度为1字每50毫秒，打字后暂停2秒（2,000毫秒），删除后暂停0.5秒（500毫秒）。

## `routeDict`&#x202f;和&#x202f;`routeMap`&#x202f;的使用方法

### `routeDict`&#x202f;的使用方法

`routeDict`&#x202f;是&#x202f;`Typewriter`&#x202f;类中用于定义特殊字符的打字路径的一个对象。当你需要在打字效果中包含特定的字符组合或者在特定的字符上应用特殊的打字效果时，可以使用&#x202f;`routeDict`&#x202f;来实现。`routeDict`&#x202f;也可以设置打字机效果模拟东亚文字的键入过程。

以“<span lang="zh-cn">状</span>”（中文）、“<span lang="ja-jp">唇</span>”（日文）、“<span lang="ko">한</span>”（朝鲜文）为例，我们可以通过定义&#x202f;`routeDict`&#x202f;来控制这些字符的打字路径，使得它们以特定的方式逐步出现。下面是一个简单的示例：

```javascript
texts = [
    '状',
    '唇',
    '한'
]

routeDict = {
    '状': [['z', 'zh', 'zhu', 'zhua', 'zhuan', 'zhuang', '状']],
    '唇': [['く', 'くち', 'くちび', 'くちびる', '唇']],
    '한': [['ㅎ', '하', '한']]
};

const typewriter = new Typewriter(document.querySelector('#typewriter'), texts, routeDict);
```

这样，我们就可以得到这样的效果

<figure>
  <img src="assets/img/type_0.gif" alt="三个字的打字效果">
  <figcaption>图 1 - 三个字的输出效果</figcaption>
</figure>

### `routeMap`&#x202f;的使用方法

routeMap是Typewriter类中用于指定文本中特定位置字符的路由路径的一个对象。它允许你对同一个字符在不同位置有不同的打字路径，这在处理多种语言或特殊打字效果时非常有用。

对于中文和日文，同一个字在不同情况下可能会有不同的键入方式。譬如，中文的“长”在不同的情况下会有“chang”和“zhang”两种键入方式，日文的“高”在不同的情况下也有“<span lang="ja">こう</span>”（<span lang="ja">高校</span>）和“<span lang="ja">たか</span>”（<span lang="ja">高い</span>）两种键入方式。

如果两种键入方式会在同一个打字机效果中出现，那么我们就可以设定&#x202f;`routeMap`&#x202f;，来实现不同情况下文字的键入方式。

比如以下例句：

- <span lang="ja"><ruby>
  高 <rp>(</rp><rt>たか</rt><rp>)</rp>
  </ruby><ruby>
  木 <rp>(</rp><rt>ぎ</rt><rp>)</rp>
  </ruby>さんはこの<ruby>
  高 <rp>(</rp><rt>こう</rt><rp>)</rp>
  </ruby><ruby>
  校 <rp>(</rp><rt>こう</rt><rp>)</rp>
  </ruby>の<ruby>
  生 <rp>(</rp><rt>せい</rt><rp>)</rp>
  </ruby><ruby>
  徒 <rp>(</rp><rt>と</rt><rp>)</rp>
  </ruby>です。</span>
- <span lang="zh-cn">头发<ruby>
  长 <rp>(</rp><rt>zhǎng</rt><rp>)</rp>
  </ruby>得越来越<ruby>
  长 <rp>(</rp><rt>cháng</rt><rp>)</rp>
  </ruby>了。</span>

我们可以将&#x202f;`routeDict`&#x202f;和&#x202f;`routeMap`&#x202f;设定为如下状态：

```javascript
let texts = [
    '高木さんはこの高校の生徒です。',
    '头发长得越来越长了。'
];
            
let routeDict = {
    '长': [
        ['c', 'ch', 'cha', 'chan', 'chang', '长'],
        ['z', 'zh', 'zha', 'zhan', 'zhang', '长']
    ], 
    '高': [
        ['こ','こう','高'],
        ['た','たか','高']
    ]
};
            
let routeMap = {
    '0,0': 1,
    '7,0': 0, 
    '2,1': 1, 
    '7,1': 0
}
            
const typewriter = new Typewriter(
    document.querySelector('#typewriter'), // elements
    texts,                                 // texts
    100, 50, 2000, 0,                      // typingSpeed, deletingSpeed, typingPauseTime, deletingPauseTime
    routeDict,                             // routeDict
    routeMap                               // routeMap
);
```

这样，我们就可以得到同一个字在不同情况下以不同键入方式出现的效果

<figure>
  <img src="assets/img/type_1.gif" alt="两句话的打字效果">
  <figcaption>图 2 - 两句话的输出效果</figcaption>
</figure>

`routeMap`&#x202f;的键由两部分组成，并且以单个半角逗号“`,`”分割。逗号两侧的数字确定了所需要特殊处理的字的坐标。逗号左侧的数字是该字在句子中的位置（以下标 0 为起始计算），逗号右侧是句子在&#x202f;`texts`&#x202f;中的位置（以下标 0 为起始计算）。比如，键&#x202f;`"3,1"`&#x202f;表示对&#x202f;`texts[1]`&#x202f;的第3+1个字（即&#x202f;`texts[1].charAt(3)`）进行特殊处理。`routeMap`&#x202f;的值为一个整形，对应的是&#x202f;`routeDict`&#x202f;中值部分的下标。比如&#x202f;`'7,1': 0`&#x202f;指的是“第 2（1+1）句话的第 8（7+1）个字的组成方式取&#x202f;`route`&#x202f;数组中第 1（0+1）个”。

## `texts`&#x202f;的扩展使用方法

`texts`&#x202f;是一个存储了打字机需要循环打印的句子的数组。`texts`&#x202f;中的元素通常为字符串。但是也可以为数组。

`texts`&#x202f;的一个元素为数组时，意味着该子数组中的各个元素将以整体在&#x202f;`routeDict`&#x202f;中寻找&#x202f;`route`。比如对于

```javascript
texts = [
  [['章魚','を','食','べ','る']],
  [['海老','を','買','う']]
]
```

若不设定&#x202f;`routeDict`，那么“<span lang='ja'><ruby>
章 <rp>(</rp><rt>た</rt><rp>)</rp>
</ruby><ruby>
魚 <rp>(</rp><rt>こ</rt><rp>)</rp>
</ruby></span>”和“<span lang='ja'><ruby>
海 <rp>(</rp><rt>え</rt><rp>)</rp>
</ruby><ruby>
老 <rp>(</rp><rt>び</rt><rp>)</rp>
</ruby></span>”将会以整体的形式一齐出现，而不是两字分开出现。

若设定&#x202f;`routeDict`&#x202f;如下：

```javascript
routeDict = {
  '章魚': ['た', 'たこ', '章魚'],
  '海老': ['え', 'えび', '海老']
}
```

则会以“<span lang="ja">た→たこ→章魚</span>”和“<span lang="ja">え→えび→海老</span>”的顺序打出来。

## `addtionalFunc`&#x202f;的使用方法

`addtionalFunc`&#x202f;是一个函数。其参数其中一个必须是字符串，返回值必须是一个字符串。其默认值是一个会将字符串原封不动返回回来的函数。即

```javascript
additionalFunc = function (text) {return text;}
```

`addtionalFunc`&#x202f;可用于实现&#x202f;`routeDict`、`routeMap`&#x202f;和&#x202f;`texts`&#x202f;达不到的效果。打字机效果每一步都会产生一个新的字符串，然后用这个字符串替换&#x202f;`element`&#x202f;元素中的文本内容。但是用户可能需要以固定的逻辑修改这个字符串，再进行替换。

例如，想要在字符串没有完全显示出来之前的每一次打字，你都希望打乱字符串的顺序，直至字符串被打完。那么你可以这么写：
```javascript
function scrambleString(str, shouldNotScramble) {
    // 如果布尔值为真，直接返回原字符串
    if (shouldNotScramble) {
        return str;
    }
            
    // 将字符串转换为数组以便打乱
    let array = str.split('');
    // 通过 Fisher-Yates 算法打乱数组
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交换元素
    }
    // 将打乱后的数组重新组合成字符串并返回
    return array.join('');
}
let texts = [
    'hello, world'
];
            
const typewriter = new Typewriter(
    document.querySelector('#typewriter'), 
    texts, 
    100, 50, 2000, 0, {}, {}, function (text) {return scrambleString(text, text === this.texts[this.textIndex].join('') || this.isDeleting === true);} //第二个参数在文本打完或正在删除时为真
);
```

<figure>
  <img src="assets/img/type_2.gif" alt="三个字的打字效果">
  <figcaption>图 3 - 以上代码的效果</figcaption>
</figure>

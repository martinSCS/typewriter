<p style="text-align: center"><span lang="zh-hans"><a href="README.md">简体中文</a></span> | <span lang='en'>English</span></p>

[Update Log](log_en-US.md)

# typewriter.js - Typewriter effect JavaScript library

`typewriter.js` It's a lightweight JavaScript library for creating typewriter effects on web pages. It simulates verbatim printing and deletion effects for text, and is suitable for website headings, introductions, or anywhere dynamic text effects are needed. But in a later version, the String in the `texts` used to initialize the object will be transfered to an array, to avoid characters between U+10000 and U+10FFFF from being divided into two characters due to the UTF-16 code.

## Using

```html
<script src="https://cdn.jsdelivr.net/gh/martinSCS/typewriter/typewriter.js"></script>
```

## Features

- **Customized speed**: You can customize the typing speed and deletion speed.
- **Pause time**: You can set the pause time after typing and deleting.
- **Loop play**: Loop play of text is supported.
- **Root Dictionary and Route Mapping.**：Complex typing effects via route dictionary and route map are supported.

## Usage

1. Import the `typewriter.js` in the HTML file:

   ```html
   <script src="path/to/typewriter.js"></script>
   ```

2. Create an element for displaying typing effects:

   ```html
   <div id="typewriter"></div>
   ```

3. Initialize the `Typewriter`&#x202f;object and star the typing effect:

   ```javascript
   const typewriter = new Typewriter(document.getElementById('typewriter'), ['Hello, World!', 'Welcome to my website!']);
   ```

## Configuration Parameters

Construction function of `Typewriter`&#x202f;accepts the following parameters:

- `element`: The DOM element to display the text.
- `texts`: An array of texts to be printed.
- `typingSpeed` **(optional)**: Typing speed in milliseconds per character. Default is 100. 
- `deletingSpeed` **(optional)**: Deletion speed in million seconds per character. Default is 50.
- `typingPauseTime` **(optional)**: The pause time after typing in milliseconds. Default is 2,000.
- `deletingPauseTime` **(optional)**: The pause time after deletion in milliseconds. Default is zero.
- `routeDict` **(optional)**: Route dictionary, used to define type paths for special characters.
- `routeMap` **(optional)**: Route map, used to specify the route path of a character at a specific position in the text.
- `additionalFunc`&#x202f;**(optional)**: Additional function, to process the text produced by each typing or deletion step.

## Examples

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

The above code creates a typewriter effect within the `#typewriter` element, printing ‘Hello, World!’ and ‘Welcome to my website!’. Each character is typed at a rate of 1 character per 100 milliseconds, deleted at a rate of 1 character per 50 million seconds, paused for 2 seconds (2,000 ms) after typing and pause for 0.5 seconds (500 ms) after deleting.

## Usage of `routeDict` and `routeMap`

### Usage of `routeDict`

`routeDict` is an object of the class`Typewriter` used to define typing paths for specific characters. When you need to include a specific combination of characters in a typing effect or apply a special typing effect on a specific character, you can use `routeDict` to realize it. `routeDict` can also set up a typewriter effect to simulate the typing process of East Asian characters.

Taking "<span lang="zh-cn">状</span>"(Chinese; *form, shape*), "<span lang="ja-jp">唇</span>"(Japanese; *lip*)、"<span lang="ko">한</span>"(Korean; *One, Korean*), we can control the typing paths of these characters by defining `routeDict` so that they appear progressively in a specific way. Here is a simple example:

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

This gives us this effect.

<figure>
  <img src="assets/img/type_0.gif" alt="Output effect of these three characters">
  <figcaption>Figure 1 - Output effect of these three characters</figcaption>
</figure>



### Usage of `routeMap`

`routeMap` is an object in the Typewriter class used to specify the route path of a character at a specific position in the text. It allows you to have different typing paths for the same character at different positions, which is useful when dealing with multiple languages or special typing effects. 

For Chinese language and Japanese language, the same character may be typed differently in different situations. For example, the Chinese character "长" can be input by typing "chang"(<span lang="zh-hans">长处</span>) or "zhang"(<span lang="zh-hans">成长</span>) in different cases. And the character "<span lang="ja">高</span>" is typed as "<span lang="ja">こう</span>"(<span lang="ja">高校</span>) and "<span lang="ja">たか</span>"(<span lang="ja">高い</span>) in different cases.

If both types of the same character appear in the same typewriter effect, then we can set `routeMap` to realize how the text will be typed in different situations.

For example, the following example sentence:

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

We can set the `routeDict` and `routeMap` as follows:

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

In this way, we can get the effect of the same word appearing as different types in different situations. 

<figure>
  <img src="assets/img/type_1.gif" alt="Output effect of two sentences">
  <figcaption>Figure 2 - Output effect of two sentences</figcaption>
</figure>

The key of `routeMap` consists of two parts, separated by a single semicolon comma ",". The numbers on either side of the comma determine the coordinates of the characters that needs special treatment. The number to the left of the comma is the position of the character in the sentence (counting from 0), and number to the right of the comma is the position of the sentence in `texts` (counting from 0). For example, the key `"3,1"` means that the 4<sup>th</sup> character of the 2<sup>nd</sup> text of the `texts` will be handled specially. The value should be an integer, which corresponds to the subscripts of the value part in `routeDict`. For example, `"7,1": 0` means that the 8<sup>th</sup>(=7+1) character of the 2<sup>nd</sup>(=1+1) text should be typed through the 1<sup>st</sup>(=0+1) route of it.

## Extended usage of `texts`

`texts` is an array that stores the sentences that the typewriter needs to print in a loop. The elements in `text` are usually strings. But they can also be arrays. 

An element of `texts` is an array means that each element of this subarray will search its `route` in the `routeDict` as a whole. For example,

```javascript
texts = [
  [['章魚','を','食','べ','る']],
  [['海老','を','買','う']]
]
```

If `routeDict` is not set,then "<span lang='ja'><ruby>
章 <rp>(</rp><rt>た</rt><rp>)</rp>
</ruby><ruby>
魚 <rp>(</rp><rt>こ</rt><rp>)</rp>
</ruby></span>"(*tako*, <span lang="ja"><span style="border-top:1px solid black;position:relative;">た<span style="position:absolute;top:0;bottom:67%;right:0%;border-right:1px solid black;">&ZeroWidthSpace;</span></span>こ</span>; *an octopus*) and "<span lang='ja'><ruby>
海 <rp>(</rp><rt>え</rt><rp>)</rp>
</ruby><ruby>
老 <rp>(</rp><rt>び</rt><rp>)</rp>
</ruby></span>"(*ebi*, <span lang="ja">え<span style="border-top:1px solid black">び</span></span>; *a crayfish, a lobster, a prawn, a shrimp*) will appear with both two characters as a whole instead of one by one.

If you set the `routeDict` as follows:

```javascript
routeDict = {
  '章魚': ['た', 'たこ', '章魚'],
  '海老': ['え', 'えび', '海老']
}
```

You will see "<span lang="ja">章魚</span>" being shown in the order of "<span lang="ja">た→たこ→章魚</span>" and "<span lang="ja">海老</span>" in the order of "<span lang="ja">え→えび→海老</span>".

## Usage of `addtionalFunc`

`addtionalFunc` is a function. One of its parameters must be a string and the return value must be a string. Its default value is a function that returns original string, like

```javascript
additionalFunc = function (text) {return text;}
```

The `addtionalFunc` can be used to achieve effects that `routeDict`, `routeMap` and `text` cannot. The typewriter effect generates a new string at each step and replaces the text in the `element` with the string. However, users may need to modify the string with a kind of fixed logic before the replacing.

For example, You want to disrupt the order of the string until the string is fully displayed. Then you could write like this:

```javascript
function scrambleString(str, shouldNotScramble) {
    // if the boolean is true, return the original string directly
    if (shouldNotScramble) {
        return str;
    }
            
    // transfer the string to an array making it easier to disrupt the order
    let array = str.split('');
    // disrupt the order through Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap
    }
    // recombine the disrupted array into a string and return it
    return array.join('');
}
let texts = [
    'hello, world'
];
            
const typewriter = new Typewriter(
    document.querySelector('#typewriter'), 
    texts, 
    100, 50, 2000, 0, {}, {}, function (text) {return scrambleString(text, text === this.texts[this.textIndex].join('') || this.isDeleting === true);} // the second parameter is true when the text is typed or being deleted
);
```

<figure>
  <img src="assets/img/type_2.gif" alt="Effect of the above code">
  <figcaption>Figure 3 - Effect of the above code</figcaption>
</figure>

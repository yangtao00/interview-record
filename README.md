## 准备工作

安装`eslint`相关`npm`包

`npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-taro eslint-plugin-import eslint-plugin-taro eslint-plugin-react --save-dev`

安装`vscode`插件`eslint`，并确保在`./settings.json`开启对 `typescript` 的检测
```
"eslint.validate": [
    "typescript", 
    "typescriptreact",
    ...
],
```

## 配置规则

规则都是配置在`./eslintrc`文件里面，这一步就跟大多数 `eslint` 规则配置一样，下面说一下我在配置过程中遇到的几个需要注意的地方

- 在`extends`里面一定要加上`taro`
![](https://user-gold-cdn.xitu.io/2019/10/25/16e023905e1cf27d?w=1482&h=656&f=png&s=96968)
不然就会报许多奇怪的错误，比如
![](https://user-gold-cdn.xitu.io/2019/10/25/16e023a19d777c91?w=1542&h=598&f=png&s=158181)

- `no-unused-vars`还是`@typescript-eslint/no-unused-vars`?
![](https://user-gold-cdn.xitu.io/2019/10/25/16e021e9eb9528ab?w=1950&h=254&f=png&s=78080)
从红色框中很明显看出我们定义或者导入了一个未使用的变量，但是这里提示了2次同样的错误，因此我尝试关闭掉其中一个规则`(第二个)`
![](https://user-gold-cdn.xitu.io/2019/10/25/16e0224ece82ce12?w=1002&h=112&f=png&s=22354)
然而意想不到的情况发生了
![](https://user-gold-cdn.xitu.io/2019/10/25/16e0226710a8f0ff?w=1638&h=204&f=png&s=102227)
事实上我们使用了 Config 和 ShareAppMessageObject的
![](https://user-gold-cdn.xitu.io/2019/10/25/16e0223c9117dcfd?w=1352&h=184&f=png&s=35707)
![](https://user-gold-cdn.xitu.io/2019/10/25/16e0224283a98ab3?w=1174&h=70&f=png&s=27933)
最终的关于`未使用的变量`的规则配置是这样
![](https://user-gold-cdn.xitu.io/2019/10/25/16e02259c71bc572?w=876&h=98&f=png&s=20369)


## 检查和自动修复
以`iPenguinDoctor_taro/src/packages/common/pages/weight-plan`文件为例

`./package.json`的`script`下面添加 2 条规则
```
"eslint": "eslint --ext .tsx,.ts src/packages/common/pages/weight-plan",
"fix": "eslint --ext --fix .tsx,.ts src/packages/common/pages/weight-plan"
```
控制台执行`yarn eslint`或者`npm run eslint`，前提是你必须安装这2个工具
![](https://user-gold-cdn.xitu.io/2019/10/25/16e02c1407aade9c?w=1516&h=524&f=png&s=189012)
图中可以很清楚的看到错误的文件、位置、原因等等，修正这些错误也很简单，在控制台执行`yarn fix`或者`npm run fix`即可
![](https://user-gold-cdn.xitu.io/2019/10/26/16e08798b5b75f32?w=1892&h=332&f=png&s=88180)
执行完成之后，可以看到错误现在只有3个了，这也说明自动`fix`并不能完全的修复错误，还是避免不了人工操作的过程，所以说代码风格校验的工作越早越好


## 配合 prettier

毫无疑问，我们需要下载`prettier`，然后在`./settings.json`中继续添加以下内容
```
"prettier.jsxSingleQuote": false,
"prettier.trailingComma": "all",
"prettier.singleQuote": true,
"prettier.semi": true,
"[typescriptreact]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
```
这样的好处就是我们在编辑代码之后，直接`shift + option + f`就可以自动帮我们完成格式化

## 总结
- `eslint`相关的配置基本就完成的，与我而言，难点不在于配置，而在于我们如何尽可能的保证代码质量
- 目前的规则基本上都是警告级别，主要是代码体积过大了，如果把规则改成错误级别，那随便打开一个代码，编辑器都是爆红，同时规则也只配置了比较常见的规则，更多的规格可以根据团队进行补充

## 配合`commitlin`+`husky`
可以参考`张小虎`同学的[这篇文章](https://user-gold-cdn.xitu.io/2019/10/26/16e088fac66d1e9a)，这里我没有在`iPenguinDoctor_taro`中去做这样的配置，因为目前的错误太多了，即使自动修复还是会有比较多的一些错误去手动修复


## 安利
不知道大家在写代码时因没有自动全选而觉得很别扭的时候，反正我是有的，特别是写`taro`，就像下面这段代码
```
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
```
基本每一个页面的开头都是这样的，如果硬敲也行，但是如果有一个自动补全的插件必然便利很多，因此我在自己的浏览器上配置了一写代码片段，就像上面这段代码，只需`tarocc`就自动键入，类似的还有`Image`、`Input`标签、`Taro.$loading()`等等我们自己封装的方法，目前也只有一些比较常用的代码片段，以后可能会慢慢收集扩展,以下是我配置的一些代码片段
```
"Print to <View></View>": {
		"prefix": "view",
		"body": [
			"<View className=\"$1\">$2</View>",
		],
		"description": "Log output to <View></View>"
	},
	"Print to <Text></Text>": {
		"prefix": "text",
		"body": [
			"<Text className=\"$1\">$2</Text>",
		],
		"description": "Log output to <Text></Text>"
	},
	"Print to <Image></Image>": {
		"prefix": "img",
		"body": [
			"<Image className=\"$1\" mode=\"aspectFill\" src={$2} />",
		],
		"description": "Log output to <Image></Image>"
	},
	"Print to <Input></Input>": {
		"prefix": "ipt",
		"body": [
			"<Input className=\"$1\" value=\"$2\" placeholder=\"$3\" />",
		],
		"description": "Log output to <Input></Input>"
	},
	"Print to <Button></Button>": {
		"prefix": "btn",
		"body": [
			"<Button className=\"$1\">$2</Button>",
		],
		"description": "Log output to <Button></Button>"
	},
	"Print to tarocc": {
		"prefix": "tarocc",
		"body": [
			"import Taro, { Component } from '@tarojs/taro'",
			"import { View, Button, Text } from '@tarojs/components'\n",
			"type Props = {}",
			"type State = {}\n",
			"export default class Index extends Component<Props, State> {",
			"\trender() {",
			"\t\treturn (<View></View>)",
			"\t}",
			"}"
		],
		"description": "Log output to Taro-template"
	},
	"Print to loading": {
		"prefix": "loading",
		"body": [
			"Taro.$$loading()"
		],
		"description": "Log output to Taro.$loading()"
	},
	"Print to hide": {
		"prefix": "hide",
		"body": [
			"Taro.$$hide()"
		],
		"description": "Log output to Taro.$hide()"
	},
	"Print to toast": {
		"prefix": "toast",
		"body": [
			"Taro.$$toast($1)"
		],
		"description": "Log output to Taro.$hide()"
	},
	"Print to report": {
		"prefix": "report",
		"body": [
			"Taro.$$report($1)"
		],
		"description": "Log output to Taro.$report()"
	},
	"Print to catchrp": {
		"prefix": "catchrp",
		"body": [
			"Taro.$$catchReport($1)"
		],
		"description": "Log output to Taro.$catchReport()"
	}
```
如何配置其实很简单，打开`vscode`，找到`code`->`首选项`->`代码片段`->`新建代码片段`，粘贴进去就可以用了

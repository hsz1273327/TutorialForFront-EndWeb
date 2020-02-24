
# Json

js默认对json有支持使用对象`JSON`. 使用接口`JSON.parse()`可以将json字符串转化为js对象;使用`JSON.stringify()`将js对象转化为json字符串.


```javascript
let json_str = JSON.stringify({a:1,b:2})
json_str
```




    '{"a":1,"b":2}'




```javascript
JSON.parse(json_str)
```




    { a: 1, b: 2 }



## json样式检验

比较常见的样式检验协议是[json schema](https://json-schema.org/),在js中最常用的实现工具是[ajv](https://github.com/epoberezkin/ajv).针对typescript,ajv提供了自己的TypeScript声明,因此不需要安装额外的模块.


```javascript
import Ajv from 'ajv';
var ajv = new Ajv()

schema = {
  "$id": "https://example.com/address.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "An address similar to http://microformats.org/wiki/h-card",
  "type": "object",
  "properties": {
    "post-office-box": {
      "type": "string"
    },
    "extended-address": {
      "type": "string"
    },
    "street-address": {
      "type": "string"
    },
    "locality": {
      "type": "string"
    },
    "region": {
      "type": "string"
    },
    "postal-code": {
      "type": "string"
    },
    "country-name": {
      "type": "string"
    }
  },
  "required": [ "locality", "region", "country-name" ],
  "dependencies": {
    "post-office-box": [ "street-address" ],
    "extended-address": [ "street-address" ]
  }
}
const validate = ajv.compile(schema)
```




    {
      '$id': 'https://example.com/address.schema.json',
      '$schema': 'http://json-schema.org/draft-07/schema#',
      description: 'An address similar to http://microformats.org/wiki/h-card',
      type: 'object',
      properties: {
        'post-office-box': { type: 'string' },
        'extended-address': { type: 'string' },
        'street-address': { type: 'string' },
        locality: { type: 'string' },
        region: { type: 'string' },
        'postal-code': { type: 'string' },
        'country-name': { type: 'string' }
      },
      required: [ 'locality', 'region', 'country-name' ],
      dependencies: {
        'post-office-box': [ 'street-address' ],
        'extended-address': [ 'street-address' ]
      }
    }




```javascript
let data_ok = {
    "locality":"南海大道01号",
    "region":"南山区",
    "country-name":"中国"
}
let data_err = {
    "city":"深圳",
    "region":"南山区",
    "country-name":"中国"
}

```


```javascript
let valid_ok = validate(data_ok)
// 符合格式要求的验证会返回true
if (!valid_ok) {
    console.log(validate.errors)
}
```


```javascript
let valid_err = validate(data_err)
// 不符合格式要求的验证会返回false,并且在validate.errors中保存错误信息
if (!valid_err) {
    console.log(validate.errors)
}
```

    [
      {
        keyword: 'required',
        dataPath: '',
        schemaPath: '#/required',
        params: { missingProperty: 'locality' },
        message: "should have required property 'locality'"
      }
    ]


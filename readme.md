# cep-webpack-plugin


Webpack plugin that emits a CSXS/manifest.xml file for Adobe CEP extensions.

## Installation
<a href='https://npmjs.com/package/cep-webpack-plugin'><img alt='npm logo' src='https://github.com/Jaid/action-readme/raw/master/images/base-assets/npm.png'/></a>
```bash
npm install --save-dev cep-webpack-plugin@^1.0.2
```
<a href='https://yarnpkg.com/package/cep-webpack-plugin'><img alt='Yarn logo' src='https://github.com/Jaid/action-readme/raw/master/images/base-assets/yarn.png'/></a>
```bash
yarn add --dev cep-webpack-plugin@^1.0.2
```



## Documentation

* [cep-webpack-plugin](#module_cep-webpack-plugin)
    * [module.exports](#exp_module_cep-webpack-plugin--module.exports) ⏏
        * [new module.exports([options])](#new_module_cep-webpack-plugin--module.exports_new)
        * _instance_
            * [.options](#module_cep-webpack-plugin--module.exports+options) : <code>Options</code>
        * _inner_
            * [~Options](#module_cep-webpack-plugin--module.exports..Options) : <code>Object</code>

**Kind**: Exported class  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Options</code> | Plugin options |

**Kind**: instance property of [<code>module.exports</code>](#exp_module_cep-webpack-plugin--module.exports)  
**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_cep-webpack-plugin--module.exports)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [fileName] | <code>string</code> | <code>&quot;CSXS/manifest.xml&quot;</code> | 
| identifier | <code>string</code> |  | 
| [version] | <code>string</code> | <code>&quot;1.0.0&quot;</code> | 
| title | <code>string</code> |  | 
| [requiredCefVersion] | <code>string</code> | <code>&quot;5.0&quot;</code> | 
| [apps] | <code>Object.&lt;(&quot;photoshop&quot;\|&quot;illustrator&quot;\|&quot;indesign&quot;\|&quot;incopy&quot;\|&quot;premierePro&quot;\|&quot;prelude&quot;\|&quot;afterEffects&quot;\|&quot;animate&quot;\|&quot;audition&quot;\|&quot;dreamweaver&quot;\|&quot;muse&quot;\|&quot;bridge&quot;\|&quot;rush&quot;), (string\|Array.&lt;string&gt;)&gt;</code> | <code>{photoshop: &quot;20.0&quot;}</code> | 



## License
```text
MIT License

Copyright © 2019, Jaid <jaid.jsx@gmail.com> (github.com/jaid)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

# tfcomplete

a simple extension, provide static tensorflow completion.


## Features

while extension found tf.xxx.xxx, it will show up tensorflow apis (only module/class/function, class method not implemented yet) with really fast speed.

builtin python autocomplete with slow down whole process, you could use ':' instead of '.' to skip that. for example, type "tf:train:Ad" and choose AdamOptimizer, previous ':' with automatically replaced by '.'

## Known Issues

only could be triggered by '.'

## Release Notes

### 1.0.0
First release, with tensorflow 1.4 api support (include TensorflowLite api)

### 1.0.1
allow use ':' to skip slow builtin auto complete

-----------------------------------------------------------------------------------------------------------
### For more information

* [Code](https://github.com/afpro/tfcomplete)
* email: admin@afpro.net

**Enjoy!**
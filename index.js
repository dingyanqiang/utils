/**
 * 克隆函数
 * @param {Any} value 克隆原数据
 * @param {Boolean} isDeep 是否深克隆
 */
function clone(value, isDeep) {
    if(value === null) return null;
    if(typeof value !== 'object') return value;
    if(Array.isArray(value)) {
        if(isDeep) {
            return value.map(item => clone(item, true));
        }
        return [].concat(value);
    } else {
        if(isDeep) {
            let obj = {};
            Object.keys(value).forEach(item => {
                obj[item] = clone(value[item], true);
            });
        }
        return {...value};
    }
}

/**
 * 数据扁平化：使用递归实现
 * @param {Array} array 多维数组
 * @param {Number} depth 扁平几层
 * @return {Array} 返回新数组
 */
function flattenDepth(array, depth=1) {
    let result = [];
    array.forEach(item => {
        if(Array.isArray(item) && depth > 0) {
            result.push(...(flattenDepth(item, --depth)));
        } else {
            result.push(item);
        }
    });
    return result;
}
/* test
console.log(flattenDepth([1,[2,[3,[4]],5]]))
console.log(flattenDepth([1,[2,[3,[4]],5]],2))
console.log(flattenDepth([1,[2,[3,[4]],5]],3))
*/


/**
 * 防抖函数
 * @param {Function} func 要实现节流的原函数
 * @param {Number} delay 防抖的延迟时间
 * @return {Function} 添加防抖功能的函数
 */
function debounce(func, delay) {
    let debounceIdentify = 0;
    return (...args) => {
        debounceIdentify && clearTimeout(debounceIdentify);
        debounceIdentify = setTimeout(() => {
            debounceIdentify = 0;
            func.apply(this, args);
        }, delay);
    }
}

/**
 * 节流函数
 * @param {Function} func 要实现节流的函数
 * @param {Number} interval 节流时间
 * @return {Funciton} 添加节流的函数
 */
function throttle(func, interval) {
    let identify = 0;
    return (...args) => {
        if(identify) return;
        identify = setTimeout(() => identify = 0, interval);
        func.apply(this, args);
    }
}

/**
 * 金额格式化
 * @param {Number} num 数字
 * @return {String} 格式化后的字符串
 */
function toThousands(num) {
    var potStr = '.00'
    num = (num||0).toString()
    if(num.indexOf('.') !== -1){
       potStr = num.substr(num.indexOf('.'),3)
    }
    
    var result = [ ], counter = 0;
    num = num.substring(0,num.indexOf('.')).split('');
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
    }
    return result.join('')+potStr;
}
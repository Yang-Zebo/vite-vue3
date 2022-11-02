// 校验规则

// 合法uri
export function isURL(value) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z\d.-]+(:[a-zA-Z\d.&%$-]+)*@)*((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}|([a-zA-Z\d-]+\.)*[a-zA-Z\d-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:\d+)*(\/($|[a-zA-Z\d.,?'\\+&%$#=~_-]+))*$/
    return reg.test(value)
}

// 是否存在
export function mustExist(value) {
    return !!value
}

// 小写字母
export function isLowerCase(value) {
    const reg = /^[a-z]+$/
    return reg.test(value)
}

// 大写字母
export function isUpperCase(value) {
    const reg = /^[A-Z]+$/
    return reg.test(value)
}

// 验证邮箱
export function isEmail1(value) {
    const reg = /^([a-zA-Z\d_-])+@([a-zA-Z\d_-])+(.[a-zA-Z\d_-])+/
    return reg.test(value)
}

// 验证是否是整数
export function isIntAndZero(value) {
    return /^\d*$/.test(value)
}

// 手机号验证
export function isPhone1(value) {
    const reg = /^1[3|4|5|7|8|9]\d\d{8}$/
    return reg.test(value)
}

// 只能是大小写英文
export function isEnglish(value) {
    const reg = /^\w+$/g
    return reg.test(value)
}

//输入中英文下划线和数字
export function isReasonableText(value) {
    return /^[\u4e00-\u9fa5_a-zA-Z\d]+$/.test(value)
}

// 验证非正整数（负整数和零）
export function isNegativeAndZero(val) {
    return /^((-\d+)|(0+))$/.test(val)
}

// 验证是否是正整数
export function isInt(num) {
    return /^[1-9]\d*$/.test(num)
}

// 是否为金额
export function validateNotNegative(value) {
    return /(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/.test(
        value + ''
    )
}

//适用element-ui库 的自定义校验方法

// 是否为大陆手机号
export function isPhone2(rule, value, callback) {
    const reg = /^1[3|4|5|7|8]\d\d{8}$/
    const rsCheck = reg.test(value)
    if (!rsCheck) {
        callback(new Error('请输入正确的手机号'))
    } else {
        callback()
    }
}

/* 只能是大小写字母*/
export function isAlphabets(rule, value, callback) {
    const reg = /^[A-Z\sa-z\d-_]+$/
    const rsCheck = reg.test(value)
    if (!rsCheck) {
        callback('请输入大小写字母')
    } else {
        callback()
    }
}

// 验证是否是正整数
export function isInteger(rule, value, callback) {
    const reg = /^[1-9]\d*$/
    const rsCheck = reg.test(value)
    if (!rsCheck) {
        callback(new Error('请输入正整数'))
    } else {
        callback()
    }
}

// 验证是否是非负整数
export function isIntegerAndZero(rule, value, callback) {
    if (value === undefined || value === '') {
        return callback(new Error('输入不可以为空'))
    }
    const reg = /^\d*$/
    const rsCheck = reg.test(value)
    if (!rsCheck) {
        callback(new Error('请输入大于0的整数'))
    } else {
        callback()
    }
}

// 是否为非负数 (>= 0)
export function notNegative(rule, value, callback) {
    const reg = /^[+]?(\d+)$|^[+]?(\d+\.\d+)$/
    const rsCheck = reg.test(value)
    if (!rsCheck) {
        callback(new Error('请输入非负数'))
    } else {
        callback()
    }
}

// 是否为大于 0 的数 (> 0)
export function isMoreZero(rule, value, callback) {
    const reg = /^((\d+\.\d*[1-9]\d*)|(\d*[1-9]\d*\.\d+)|(\d*[1-9]\d*))$/
    const rsCheck = reg.test(value)
    if (!rsCheck) {
        callback(new Error('请输入大于0的数'))
    } else {
        callback()
    }
}

// 是否是金额
export function isMoney(rule, value, callback) {
    const reg = /(?:^[1-9](\d+)?(?:\.\d{1,2})?$)|(?:^(?:0)$)|(?:^\d\.\d(?:\d)?$)/
    const rsCheck = reg.test(value)
    if (!rsCheck) {
        callback(new Error('金额格式错误'))
    } else {
        callback()
    }
}

// 只能是数字和字母和下划线
export function isCommonCharacters(rule, value, callback) {
    if (value === undefined || value === '') {
        return callback()
    }
    const reg = /^\w+$/
    const rsCheck = reg.test(value)
    if (!rsCheck) {
        callback(new Error('只能输入数字、字母和下划线'))
    } else {
        callback()
    }
}

/* 邮件*/
export function isEmail2(rule, value, callback) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/
    const rsCheck = reg.test(value)
    if (!rsCheck) {
        callback('请输入正确的Email')
    } else {
        callback()
    }
}

// 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
export function isRobust(rule, value, callback) {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
    const rsCheck = reg.test(value)
    if (!rsCheck) {
        callback('至少8-16个字符，至少存在1个大写字母，1个小写字母和1个数字')
    } else {
        callback()
    }
}


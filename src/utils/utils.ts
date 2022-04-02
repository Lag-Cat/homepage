import objectUtils from './object';

/**
 * 检查是否相同
 * @param initObj 初始化
 * @returns 返回函数检查是否与原数据相同，相同则返回true，不相同则返回false并调用回调函数
 */
export const checkDiff = (initObj?: any) => {
  let preObj = initObj;
  return (currentObj: any, cb?: Function) => {
    if (
      typeof currentObj === 'object' &&
      !objectUtils.equals(preObj, currentObj)
    ) {
      preObj = currentObj;
      cb?.();
      return false;
    } else if (currentObj !== preObj) {
      preObj = currentObj;
      cb?.();
      return false;
    }
    return true;
  };
};

//节流

//防抖

//时间格式化
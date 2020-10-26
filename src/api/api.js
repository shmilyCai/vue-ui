import { get, post } from '@/http/request'

/**
 * 接口demo
 * @param menuId
 */
export const getApis = params => get("/base/api", params);
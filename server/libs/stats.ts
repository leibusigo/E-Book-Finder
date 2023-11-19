/**
 * 统一JSON返回封装类
 */
export class JsonResp {
  // 成功的code以及数据，如果成功code为0
  code: number
  data?: any

  constructor(data?: any, code = 0) {
    this.data = data
    this.code = code
  }
}

/**
 * 错误状态
 */
export class ErrorStat extends JsonResp {
  // 错误需要额外返回状态码和错误信息
  message: string
  status: number

  constructor(code: number, message: string, status = 200) {
    super(undefined, code)
    this.message = message
    this.status = status
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    }
  }
}

/**
 * 业务状态错误码
 */
export enum stats {
  ILLEGAL_PARAMETER = 10001,
  RESPONSE_ERROR,
}

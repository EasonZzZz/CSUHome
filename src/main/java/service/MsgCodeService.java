package service;

/**
 * @author EasonZz
 * @date 2020/11/14 10:05
 */
public interface MsgCodeService {
    /**
     * 判断手机号码是否关联用户
     * @param phone 手机号码
     * @return 是否关联
     */
    boolean phoneIsExist(String phone);

    /**
     * 向传入的手机号码发送短信验证码
     * @param phone 手机号
     * @return 返回随机生成的短信验证码
     */
    String sendMsgCode(String phone);
}

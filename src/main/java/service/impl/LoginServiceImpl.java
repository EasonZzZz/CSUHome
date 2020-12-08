package service.impl;

import entity.User;
import service.LoginService;

/**
 * @author EasonZz
 * @date 2020/11/16 17:28
 */
public class LoginServiceImpl implements LoginService {

    /**
     * 密码登录
     *
     * @param userId 用户账号
     * @param pwd    密码
     * @return 用户
     */
    @Override
    public User loginByPwd(String userId, String pwd) {
        User user = USER_DAO.getUserById(userId);
        if (user == null || !user.getPwd().equals(pwd)){
            return null;
        }
        return user;
    }

    /**
     * 手机号登录
     *
     * @param phone 手机号
     * @return 用户
     */
    @Override
    public User loginByPhone(String phone) {
        return USER_DAO.getUserByPhone("phone");
    }
}

package service;

import dao.UserDao;
import dao.impl.UserDaoImpl;
import entity.User;

/**
 * @author EasonZz
 * @date 2020/11/16 17:25
 */
public interface LoginService {
    UserDao USER_DAO = new UserDaoImpl();

    /**
     * 密码登录
     * @param userId 用户账号
     * @param pwd 密码
     * @return 用户
     */
    User loginByPwd(String userId, String pwd);

    /**
     * 手机号登录
     * @param phone 手机号
     * @return 用户
     */
    User loginByPhone(String phone);
}

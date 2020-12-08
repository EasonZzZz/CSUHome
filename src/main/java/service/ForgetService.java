package service;

import dao.UserDao;
import dao.impl.UserDaoImpl;

/**
 * @author EasonZz
 * @date 2020/11/19 11:27
 */
public interface ForgetService {
    UserDao USER_DAO = new UserDaoImpl();

    /**
     * 判断 id 和 phone 是否匹配
     * @param id id
     * @param phone phone
     * @return 是否匹配
     */
    boolean isMatched(String id, String phone);

    /**
     * 更新密码
     * @param id id
     * @param newPwd 新密码
     */
    void changePwd(String id, String newPwd);
}

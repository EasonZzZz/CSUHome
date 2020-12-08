package service;

import com.google.gson.JsonArray;
import dao.UserDao;
import dao.impl.UserDaoImpl;
import entity.User;

/**
 * @author EasonZz
 * @date 2020/11/18 12:35
 */
public interface AdminService {
    UserDao USER_DAO = new UserDaoImpl();

    /**
     * 获取所有用户
     * @return 用户列表
     */
    JsonArray getAllUser();

    /**
     * 添加用户
     * @param user 添加的用户
     */
    void addUser(User user);

    /**
     * 删除用户
     * @param id 用户 id
     */
    void delUser(String id);

    /**
     * 更新用户
     * @param user 更新的用户
     */
    void updateUser(User user);
}

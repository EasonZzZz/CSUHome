package dao;

import dao.impl.MySqlDao;
import entity.User;

import java.util.List;

/**
 * @author EasonZz
 * @date 2020/11/15 23:47
 */
public interface UserDao {
    MySqlDao MYSQL = MySqlDao.getInstance();

    /**
     * 根据 id 获得 User
     * @param id id
     * @return 用户
     */
    User getUserById(String id);

    /**
     * 根据 phone 获得 User
     * @param phone 手机号码
     * @return 用户
     */
    User getUserByPhone(String phone);

    /**
     * 获得所有的 User
     * @return User 列表
     */
    List<User> getAllUser();

    /**
     * 添加新用户
     * @param user 新用户
     */
    void addUser(User user);

    /**
     * 根据 id 删除用户
     * @param id 用户 id
     */
    void delUser(String id);

    /**
     * 更新用户
     * @param user 更新的用户
     */
    void updateUser(User user);
}

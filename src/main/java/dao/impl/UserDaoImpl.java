package dao.impl;

import dao.UserDao;
import entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author EasonZz
 * @date 2020/11/15 23:49
 */
public class UserDaoImpl implements UserDao {

    @Override
    public User getUserById(String id) {
        String sql = "select * from User where id=" + id;
        Map<String, String> map = MYSQL.fetchRow(sql);
        if (map == null){
            return null;
        }
        return new User(map);
    }

    @Override
    public User getUserByPhone(String phone) {
        String sql = "select * from User where phone=" + phone;
        Map<String, String> map = MYSQL.fetchRow(sql);
        if (map == null){
            return null;
        }
        return new User(map);
    }

    @Override
    public List<User> getAllUser() {
        String sql = "select * from User";
        List<Map<String, String>> list = MYSQL.fetchAll(sql);
        if (list == null) {
            return null;
        }
        List<User> users = new ArrayList<>();
        for (Map<String, String> i : list) {
            users.add(new User(i));
        }
        return users;
    }

    @Override
    public void addUser(User user) {
        String sql = "insert into User values('" + user.getId() + "','" + user.getPwd() + "','"
                + user.getName() + "','" + user.getDept() + "','" + user.getMajor() + "','"
                + user.getsClass() + "','" + user.getPhone() + "')";
        MYSQL.myExecute(sql);
    }

    @Override
    public void delUser(String id) {
        String sql = "delete from User where id="+id;
        MYSQL.myExecute(sql);
    }

    @Override
    public void updateUser(User user) {
        String sql = "update User set " +
                "pwd='" + user.getPwd() +
                "',name='" + user.getName() +
                "',dept='" + user.getDept() +
                "',major='" + user.getMajor() +
                "',class='" + user.getsClass() +
                "',phone='" + user.getPhone() +
                "' where id=" + user.getId();
        MYSQL.myExecute(sql);
    }
}

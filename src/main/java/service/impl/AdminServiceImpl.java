package service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import entity.User;
import service.AdminService;

import java.util.List;

/**
 * @author EasonZz
 * @date 2020/11/18 12:37
 */
public class AdminServiceImpl implements AdminService {

    @Override
    public JsonArray getAllUser() {
        List<User> users = USER_DAO.getAllUser();
        JsonArray array = new JsonArray();
        for (User i : users) {
            array.add(new Gson().toJson(i));
        }
        return array;
    }

    @Override
    public void addUser(User user) {
        USER_DAO.addUser(user);
    }

    @Override
    public void delUser(String id) {
        USER_DAO.delUser(id);
    }

    @Override
    public void updateUser(User user) {
        USER_DAO.updateUser(user);
    }
}

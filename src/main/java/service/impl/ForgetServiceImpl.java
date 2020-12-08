package service.impl;

import entity.User;
import service.ForgetService;

/**
 * @author EasonZz
 * @date 2020/11/19 11:29
 */
public class ForgetServiceImpl implements ForgetService {

    @Override
    public boolean isMatched(String id, String phone) {
        User user = USER_DAO.getUserById(id);
        return user.getPhone().equals(phone);
    }

    @Override
    public void changePwd(String id, String newPwd) {
        User user = USER_DAO.getUserById(id);
        user.setPwd(newPwd);
        USER_DAO.updateUser(user);
    }
}

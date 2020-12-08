package entity;

import java.util.Map;

/**
 * @author EasonZz
 * @date 2020/11/13 17:35
 */
public class User {
    private String id;
    private String pwd;
    private String name;
    private String dept;
    private String major;
    private String sClass;
    private String phone;

    public User(){}

    public User(Map<String, String> map) {
        this.id = map.getOrDefault("id", "");
        this.pwd = map.getOrDefault("pwd", "");
        this.name = map.getOrDefault("name", "");
        this.dept = map.getOrDefault("dept", "");
        this.major = map.getOrDefault("major", "");
        this.sClass = map.getOrDefault("class", "");
        this.phone = map.getOrDefault("phone", "");
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getsClass() {
        return sClass;
    }

    public void setsClass(String sClass) {
        this.sClass = sClass;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", pwd='" + pwd + '\'' +
                ", name='" + name + '\'' +
                ", dept='" + dept + '\'' +
                ", major='" + major + '\'' +
                ", sClass='" + sClass + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}

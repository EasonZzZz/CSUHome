package servlet;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import entity.User;
import service.AdminService;
import service.impl.AdminServiceImpl;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Locale;
import java.util.ResourceBundle;

/**
 * @author EasonZz
 * @date 2020/11/18 12:23
 */
@WebServlet(name = "AdminServlet", urlPatterns = {"/AdminServlet"})
public class AdminServlet extends HttpServlet {
    private final AdminService adminService = new AdminServiceImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");

        String method = request.getParameter("method");
        process(method, request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        this.doPost(request, response);
    }

    public void process(String method, HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter pw = response.getWriter();
        if ("login".equals(method)) {
            login(request, response);
        } else if ("getAll".equals(method)) {
            JsonArray array = getAll();
            pw.write(array.toString());
        } else if ("addUser".equals(method)) {
            addUser(request.getParameter("user"));
        } else if ("delUser".equals(method)) {
            delUser(request.getParameter("id"));
        } else if ("updateUser".equals(method)){
            updateUser(request.getParameter("user"));
        } else {
            JsonObject js = new JsonObject();
            js.addProperty("errorCode", 1);
            js.addProperty("errorMsg", "账号或密码错误");
            pw.write(js.toString());
        }
    }

    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String adminId = request.getParameter("adminId");
        String adminPwd = request.getParameter("adminPwd");
        JsonObject js = new JsonObject();
        ResourceBundle admin = ResourceBundle.getBundle("admin", Locale.getDefault());
        if (!admin.getString("adminId").equals(adminId) ||
                !admin.getString("adminPwd").equals(adminPwd)) {
            js.addProperty("errorCode", 3);
            js.addProperty("errorMsg", "管理员账号或密码错误");

            PrintWriter pw = response.getWriter();
            pw.write(js.toString());
            return;
        }

        HttpSession session = request.getSession();
        session.setAttribute("adminName", admin.getString("adminName"));
    }

    public JsonArray getAll() {
        return adminService.getAllUser();
    }

    public void delUser(String id) {
        adminService.delUser(id);
    }

    public void addUser(String jsonStr) {
        User user = new Gson().fromJson(jsonStr, User.class);
        adminService.addUser(user);
    }

    public void updateUser(String jsonStr) {
        User user = new Gson().fromJson(jsonStr, User.class);
        adminService.updateUser(user);
    }
}

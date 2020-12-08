package servlet;

import com.google.gson.JsonObject;
import entity.User;
import service.LoginService;
import service.impl.LoginServiceImpl;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author EasonZz
 * @date 2020/11/13 22:57
 */
@WebServlet(name = "PwdServlet", urlPatterns = {"/PwdServlet"})
public class PwdServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");

        String userId = request.getParameter("userId");
        String pwd = request.getParameter("pwd");
        User user = loginByPwd(userId, pwd);

        JsonObject js = new JsonObject();

        if (user == null) {
            js.addProperty("errorCode", 1);
            js.addProperty("errorMsg", "账号或密码错误");

            PrintWriter pw = response.getWriter();
            pw.write(js.toString());
            return;
        }

        HttpSession session = request.getSession();
        session.setAttribute("name",user.getName());

        PrintWriter pw = response.getWriter();
        pw.write(js.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        doPost(request, response);
    }

    private User loginByPwd(String userId, String pwd) {
        LoginService loginService = new LoginServiceImpl();
        return loginService.loginByPwd(userId, pwd);
    }
}

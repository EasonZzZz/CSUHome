package servlet;

import com.google.gson.JsonObject;
import service.impl.ForgetServiceImpl;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author EasonZz
 * @date 2020/11/19 11:27
 */
@WebServlet(name = "ForgetServlet", urlPatterns = {"/ForgetServlet"})
public class ForgetServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");

        String method = request.getParameter("method");
        if ("request".equals(method)) {
            request(request, response);
        } else if ("verify".equals(method)) {
            verify(request, response);
        } else if ("change".equals(method)) {
            change(request, response);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        this.doPost(request, response);
    }

    public void request(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        String id = request.getParameter("id");
        String phone = request.getParameter("phone");
        JsonObject js = new JsonObject();
        if (isMatched(id, phone)) {
            session.setAttribute("id", id);
        } else {
            js.addProperty("errorCode", 4);
            js.addProperty("errorMsg", "学工号与手机号不匹配");
            PrintWriter pw = response.getWriter();
            pw.write(js.toString());
        }
    }

    public void verify(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        String code = request.getParameter("msgCode");
        String rightCode = session.getAttribute("msgCode").toString();
        JsonObject js = new JsonObject();
        if (!rightCode.trim().equals(code.trim())) {
            js.addProperty("errorCode", 2);
            js.addProperty("errorMsg", "验证码错误");
            PrintWriter pw = response.getWriter();
            pw.write(js.toString());
        }
    }

    public void change(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        String id = session.getAttribute("id").toString();
        String newPwd = request.getParameter("newPwd");
        changePwd(id, newPwd);
    }

    public boolean isMatched(String id, String phone) {
        return new ForgetServiceImpl().isMatched(id, phone);
    }

    public void changePwd(String id, String newPwd) {
        new ForgetServiceImpl().changePwd(id, newPwd);
    }
}

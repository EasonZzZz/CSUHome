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
 * @date 2020/11/16 16:09
 */
@WebServlet(name = "PhoneServlet", urlPatterns = {"/PhoneServlet"})
public class PhoneServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");

        String phone = request.getParameter("phone");
        String code = request.getParameter("msgCode");

        HttpSession session = request.getSession();
        String rightCode = session.getAttribute("msgCode").toString();

        JsonObject js = new JsonObject();
        if (!rightCode.trim().equals(code.trim())) {

            js.addProperty("errorCode", 2);
            js.addProperty("errorMsg", "验证码错误");

            PrintWriter pw = response.getWriter();
            pw.write(js.toString());
            return;
        }
        User user = loginByMsgCode(phone);

        session.setAttribute("name", user.getName());
        PrintWriter pw = response.getWriter();
        pw.write(js.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        doPost(request, response);
    }

    private User loginByMsgCode(String phone) {
        LoginService loginService = new LoginServiceImpl();
        return loginService.loginByPhone(phone);
    }
}

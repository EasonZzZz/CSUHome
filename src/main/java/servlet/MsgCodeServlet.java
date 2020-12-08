package servlet;

import com.google.gson.JsonObject;
import service.MsgCodeService;
import service.impl.MsgCodeServiceImpl;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author EasonZz
 * @date 2020/11/16 16:17
 */
@WebServlet(name = "MsgCodeServlet", urlPatterns = {"/MsgCodeServlet"})
public class MsgCodeServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");

        String phone = request.getParameter("phone");
        String code = sendMsgCode(phone);
        if (code == null) {
            JsonObject js = new JsonObject();
            js.addProperty("errorCode", 4);
            js.addProperty("errorMsg", "不存在关联账户");

            PrintWriter pw = response.getWriter();
            pw.write(js.toString());
            return;
        }
        HttpSession session = request.getSession();
        session.setAttribute("msgCode", code);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        doPost(request, response);
    }

    private String sendMsgCode(String phone) {
        MsgCodeService msgCodeService = new MsgCodeServiceImpl();
        if (msgCodeService.phoneIsExist(phone)){
            return msgCodeService.sendMsgCode(phone);
        }
        return null;
    }
}

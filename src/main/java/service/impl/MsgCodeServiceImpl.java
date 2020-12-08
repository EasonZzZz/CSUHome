package service.impl;

import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.google.gson.JsonObject;
import dao.UserDao;
import dao.impl.UserDaoImpl;
import service.MsgCodeService;

import java.util.Locale;
import java.util.Random;
import java.util.ResourceBundle;

/**
 * @author EasonZz
 * @date 2020/11/14 12:18
 */
public class MsgCodeServiceImpl implements MsgCodeService{
    private final IAcsClient client;
    private final ResourceBundle resource;

    /**
     * 判断手机号码是否关联用户
     *
     * @param phone 手机号码
     * @return 是否关联
     */
    @Override
    public boolean phoneIsExist(String phone) {
        UserDao userDao = new UserDaoImpl();
        return userDao.getUserByPhone(phone) != null;
    }

    /**
     * 向传入的手机号码发送短信验证码
     * @param phone 手机号
     */
    @Override
    public String sendMsgCode(String phone) {
        // 获取随机验证码
        String code = randomCode();

        // 发送短信请求
        CommonRequest request = new CommonRequest();
        request.setSysMethod(MethodType.POST);
        request.setSysAction("SendSms");
        request.setSysDomain(resource.getString("sysDomain"));
        request.setSysVersion(resource.getString("sysVersion"));
        request.putQueryParameter("RegionId", resource.getString("regionId"));
        request.putQueryParameter("SignName", resource.getString("signName"));
        request.putQueryParameter("TemplateCode", resource.getString("templateCode"));

        request.putQueryParameter("PhoneNumbers", phone);

        JsonObject js = new JsonObject();
        js.addProperty("code", code);
        request.putQueryParameter("TemplateParam", js.toString());
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
        } catch (ClientException e) {
            e.printStackTrace();
        }
        return code;
    }

    private String randomCode() {
        StringBuilder code = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            int r = random.nextInt(10);
            code.append(r);
        }
        return code.toString();
    }

    public MsgCodeServiceImpl() {
        resource = ResourceBundle.getBundle("aliyunMsg", Locale.getDefault());
        DefaultProfile profile = DefaultProfile.getProfile(resource.getString("regionId"),
                resource.getString("accessKeyId"), resource.getString("accessSecret"));
        client = new DefaultAcsClient(profile);
    }
}

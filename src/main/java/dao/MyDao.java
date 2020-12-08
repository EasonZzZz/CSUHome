package dao;

import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

/**
 * @author EasonZz
 * @date 2020/11/13 19:31
 */
public interface MyDao {
    /**
     * 执行一条sql语句
     * @param sql 执行的sql语句
     * @return sql语句的查询结果
     */
    ResultSet myQuery(String sql);

    /**
     * 返回多行多列的查询结果
     * @param sql 一条sql语句
     * @return 返回查询结果的List
     */
    List<Map<String, String>> fetchAll(String sql);

    /**
     * 返回一行多列的查询结果
     * @param sql 一条sql语句
     * @return 返回查询的结果
     */
    Map<String, String> fetchRow(String sql);

    /**
     * 返回单行单列的查询结果(单一值)
     * @param sql 一条sql语句
     * @return 一个单元的查询结果
     */
    String fetchColumn(String sql);

    /**
     * 执行一条 sql 语句
     * @param sql 一条sql语句
     * @return 是否成功
     */
    boolean myExecute(String sql);
}

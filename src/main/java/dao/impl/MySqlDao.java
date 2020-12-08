package dao.impl;

import dao.MyDao;

import java.sql.*;
import java.util.*;

/**
 * @author EasonZz
 * @date 2020/11/13 19:33
 */
public class MySqlDao implements MyDao {

    /**
     * 单例
     */
    private static MySqlDao instance;

    private Connection conn;

    /**
     * 获得单例 MySqlDao
     * @return 单例的 MySqlDao
     */
    public static MySqlDao getInstance() {
        if (instance == null) {
            instance = new MySqlDao();
        }
        return instance;
    }

    @Override
    public ResultSet myQuery(String sql) {
        try {
            PreparedStatement statement = conn.prepareStatement(sql);
            return statement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Map<String, String>> fetchAll(String sql) {
        ResultSet rs = myQuery(sql);
        if (rs != null) {
            List<Map<String, String>> rows = new ArrayList<>();

            try {
                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();
                while (rs.next()) {
                    Map<String, String> row = new HashMap<>(columnCount);
                    for (int i = 1; i <= columnCount; i++) {
                        row.put(metaData.getColumnName(i), rs.getString(i));
                    }
                    rows.add(row);
                }
                rs.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }

            return rows;
        }
        return null;
    }

    @Override
    public Map<String, String> fetchRow(String sql) {
        ResultSet rs = myQuery(sql);
        if (rs != null) {
            try {
                if (rs.next()) {
                    ResultSetMetaData metaData = rs.getMetaData();
                    int columnCount = metaData.getColumnCount();
                    Map<String, String> row = new HashMap<>(columnCount);
                    for (int i = 1; i <= columnCount; i++) {
                        row.put(metaData.getColumnName(i), rs.getString(i));
                    }
                    rs.close();
                    return row;
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;
    }

    @Override
    public String fetchColumn(String sql) {
        ResultSet rs = myQuery(sql);
        if (rs != null) {
            try {
                return rs.getString(1);
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;
    }

    @Override
    public boolean myExecute(String sql) {
        PreparedStatement statement;
        try {
            statement = conn.prepareStatement(sql);
            return statement.execute();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }

    private MySqlDao() {
        ResourceBundle resource = ResourceBundle.getBundle("database", Locale.getDefault());
        try {
            Class.forName(resource.getString("driver"));
            conn = DriverManager.getConnection(resource.getString("url"),
                    resource.getString("user"), resource.getString("pwd"));
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}

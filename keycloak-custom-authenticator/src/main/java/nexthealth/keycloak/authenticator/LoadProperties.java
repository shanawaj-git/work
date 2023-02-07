package nexthealth.keycloak.authenticator;

import java.util.Properties;
import java.io.*;

public class LoadProperties {

    public Properties loadPropertiesFile() {
        Properties properties = new Properties();
        try {

            InputStream input =
                    LoadProperties.class.getClassLoader().getResourceAsStream("config/config.properties");

            properties.load(input);
            input.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return properties;
    }
}

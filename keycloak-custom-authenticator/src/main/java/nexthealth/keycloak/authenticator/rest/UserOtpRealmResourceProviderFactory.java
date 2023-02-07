package nexthealth.keycloak.authenticator.rest;

import org.keycloak.Config;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;
import org.keycloak.services.resource.RealmResourceProviderFactory;

public class UserOtpRealmResourceProviderFactory implements RealmResourceProviderFactory {
    public static final String ID = "nexthealth-sms-otp";

    @Override
    public String getId() {
        return ID;
    }

    @Override
    public UserOtpResourceProvider create(KeycloakSession session) {
        return new UserOtpResourceProvider(session);
    }

    @Override
    public void init(Config.Scope config) {
    }

    @Override
    public void postInit(KeycloakSessionFactory factory) {
    }

    @Override
    public void close() {
    }
}

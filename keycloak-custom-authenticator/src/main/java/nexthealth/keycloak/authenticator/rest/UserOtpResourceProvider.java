package nexthealth.keycloak.authenticator.rest;


import org.keycloak.models.KeycloakSession;
import org.keycloak.services.resource.RealmResourceProvider;


public class UserOtpResourceProvider implements RealmResourceProvider {
    private KeycloakSession session;

    public UserOtpResourceProvider(KeycloakSession session) {
        this.session = session;
    }

    @Override
    public Object getResource() {
        return new UserOtpRestResource(session);
    }

    @Override
    public void close() {
    }

}

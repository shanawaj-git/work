package com.albatha.springsecuritypoc.config;

import com.albatha.springsecuritypoc.model.Album;
import com.albatha.springsecuritypoc.model.CurrentUser;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

public class CustomPermissionEvaluator implements PermissionEvaluator {

    private CurrentUser getUser(Authentication authentication) {
        return (CurrentUser) authentication.getPrincipal();
    }

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        if ((authentication == null) || (targetDomainObject == null) || !(permission instanceof String)) {
            return false;
        }
        CurrentUser user = getUser(authentication);
        if ((user).is("ADMIN"))
            return true;

        // Can have list of condition according to the user save in the DB or listed in a map
        return isOwner(user, (Album) targetDomainObject);
    }

    @Override
    public boolean hasPermission(Authentication auth, Serializable targetId, String targetType, Object permission) {
        if ((auth == null) || (targetType == null) || !(permission instanceof String)) {
            return false;
        }
        return hasPrivilege(auth, targetType.toUpperCase(), permission.toString().toUpperCase());
    }

    private boolean hasPrivilege(CurrentUser user, String targetType, String permission) {
        for (GrantedAuthority grantedAuth : user.getAuthorities()) {
            if (grantedAuth.getAuthority().startsWith(targetType) && grantedAuth.getAuthority().contains(permission)) {
                return true;
            }
        }
        return false;
    }

    private Boolean isOwner(CurrentUser user, Album object) {
        return user.getId().equals(object.getOwner());
    }

    private boolean hasPrivilege(Authentication auth, String targetType, String permission) {
        return true;
    }
}
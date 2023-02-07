package com.albatha.springsecuritypoc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Album extends Resource {
    UUID id;
    String name;
    Boolean isPublic;
    UUID owner;

    public String getId() {
        return id.toString();
    }
}

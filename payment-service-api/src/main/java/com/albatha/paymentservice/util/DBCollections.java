package com.albatha.paymentservice.util;

public enum DBCollections {
    CUSTOMER("customer"), APPLICATION("application");
    public final String collectionName;
    DBCollections(String name) {
        this.collectionName = name;
    }
}

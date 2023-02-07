package com.albatha.nexthealth.prescription.defaultData;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Random;

public class DefaultAddressData {
    public static final Long ADDRESS_ID = new Random().nextLong();
    public static final String ADDRESS_LINE_1 = "Sheikh zayed road";
    public static final String ADDRESS_LINE_2 = "One Central 8th and 9th Floor - Dubai";
    public static final String AREA = "Downtown";
    public static final String CITY = "Dubai";
    public static final String STATE = "Dubai";
    public static final String POSTAL_CODE = "0000";
    public static final String TYPE = "Home";
    public static final String COUNTRY = "United Arab Emirates";
    public static final Timestamp CREATED_DATE = Timestamp.from(Instant.now());
}

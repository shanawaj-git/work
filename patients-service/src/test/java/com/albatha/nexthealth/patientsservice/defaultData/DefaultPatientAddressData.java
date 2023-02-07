package com.albatha.nexthealth.patientsservice.defaultData;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Random;
import java.util.UUID;

public class DefaultPatientAddressData {
    public static final UUID ADDRESS_ID = UUID.randomUUID();
    public static final String FLAT_VILLA_NUMBER = "flat-101";
    public static final String BUILDING_NAME = "Block one";
    public static final String FORMATTED_TEXT = "un named road - dubai - 110";
    public static final String USER_NOTES = "delivery should be before 9 pm";
    public static final String AREA = "Downtown";
    public static final String CITY = "Dubai";
    public static final String STATE = "Dubai";
    public static final String POSTAL_CODE = "0000";
    public static final String TYPE = "Home";
    public static final String COUNTRY = "United Arab Emirates";
    public static final double LATITUDE = 19.221111;
    public static final double LONGITUDE = 19.221111;
    public static final Timestamp CREATED_DATE = Timestamp.from(Instant.now());
}


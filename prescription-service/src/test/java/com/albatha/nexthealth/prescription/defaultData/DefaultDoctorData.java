package com.albatha.nexthealth.prescription.defaultData;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Random;

public class DefaultDoctorData {
    public static final Long DOCTOR_ID = new Random().nextLong();
    public static final String DOC_ID = "XYUIAD";
    public static final String FIRST_NAME = "Ali";
    public static final String MIDDLE_NAME = "Ahmed";
    public static final String LAST_NAME = "Bell";
    public static final String EMAIL = "alibell@healthnext.com";
    public static final String MOBILE_NUMBER = "0553322113";
    public static final Timestamp CREATED_DATE = Timestamp.from(Instant.now());
}

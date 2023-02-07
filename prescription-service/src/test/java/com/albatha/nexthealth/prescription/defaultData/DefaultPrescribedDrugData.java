package com.albatha.nexthealth.prescription.defaultData;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Random;

public class DefaultPrescribedDrugData {
    public static final Long PRESCRIBED_DRUG_ID = new Random().nextLong();
    public static final String FREQUENCY = "3";
    public static final String UNIT = "ML";
    public static final String PERIOD = "1";
    public static final String ROUTE = "3 times";
    public static final String QUANTITY = "10ml";
    public static final String DOCTOR_NOTES = "3 times a day after a meal";
    public static final String TIME_UNIT = "5";
    public static final Timestamp CREATED_DATE = Timestamp.from(Instant.now());
}

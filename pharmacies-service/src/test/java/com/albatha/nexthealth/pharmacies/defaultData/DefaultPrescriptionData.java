package com.albatha.nexthealth.pharmacies.defaultData;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public class DefaultPrescriptionData {
    public static final String PRESCRIPTION_NUMBER = "PRE-386283";
    public static final String RECORD_NUMBER = "REC-4386202";
    public static final Timestamp VISIT_DATE = Timestamp.valueOf(LocalDateTime.now());
    public static final String DIAGNOSIS = "Fever";
    public static final String PIN = "320832";
    public static final Timestamp CREATED_DATE = Timestamp.valueOf(LocalDateTime.now());
}

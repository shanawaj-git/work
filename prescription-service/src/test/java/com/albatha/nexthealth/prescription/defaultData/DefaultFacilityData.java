package com.albatha.nexthealth.prescription.defaultData;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Random;

public class DefaultFacilityData {
    public static final Long ID = new Random().nextLong();
    public static final String FAC_ID = "HEA-209-987";
    public static final String NAME = "Fine Health Clinic";
    public static final String ADDRESS = "Al Barsha, Dubai";
    public static final Timestamp CREATED_DATE = Timestamp.from(Instant.now());
}

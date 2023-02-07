package com.albatha.nexthealth.prescription.defaultData;

import com.albatha.nexthealth.prescription.domain.InsuranceProvider;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Random;

public class DefaultInsuranceData {
    public static final Long ID = new Random().nextLong();
    public static final String INS_ID = "ISN-32242342";
    public static final String POLICY_NUMBER = "3243";
    public static final String NETWORK = "";
    public static final Timestamp EXPIRY_DATE = Timestamp.valueOf(
            LocalDateTime.of(2025,  3, 4, 0, 0)
    );
    public static final InsuranceProvider PROVIDER = null;
    public static final Timestamp CREATED_DATE = Timestamp.from(Instant.now());
}

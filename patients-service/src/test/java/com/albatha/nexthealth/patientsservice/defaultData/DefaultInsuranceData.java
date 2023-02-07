package com.albatha.nexthealth.patientsservice.defaultData;

import com.albatha.nexthealth.patientsservice.model.InsuranceProvider;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.UUID;

public class DefaultInsuranceData {
    public static final UUID ID =null;
    public static final String INS_ID = "ISN-32242342";
    public static final String POLICY_NUMBER = "3243";
    public static final String NETWORK = "";
    public static final Timestamp EXPIRY_DATE = Timestamp.valueOf(
            LocalDateTime.of(2025,  3, 4, 0, 0)
    );
    public static final OffsetDateTime EXPIRY_DATE_OFFSET = OffsetDateTime.now();
    public static final InsuranceProvider PROVIDER = InsuranceProvider.builder().eClaimLinkId("ClaimID").code("code").build();
    public static final Timestamp CREATED_DATE = Timestamp.from(Instant.now());
}

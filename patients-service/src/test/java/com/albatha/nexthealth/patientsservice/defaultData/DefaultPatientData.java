package com.albatha.nexthealth.patientsservice.defaultData;



import com.albatha.nexthealth.patientsservice.model.Address;
import com.albatha.nexthealth.patientsservice.model.Insurance;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;

import static java.util.Collections.emptySet;

public class DefaultPatientData {
    public static final UUID ID = null;
    public static final String PAT_ID = "PAT-32454954";
    public static final String EMIRATES_ID = "784-2000-1234566-1";
    public static final String MOH_ID = "MOH-32345393";
    public static final String FIRST_NAME = "Ali";
    public static final String MIDDLE_NAME = "Sultnan";
    public static final String LAST_NAME = "Ahmed";
    public static final String EMAIL = "aliahmed@email.com";
    public static final String MOBILE_NUMBER = "971559900331";
    public static final OffsetDateTime DATE_OF_BIRTH_OFFSET = OffsetDateTime.now();
    public static final Timestamp DATE_OF_BIRTH = Timestamp.valueOf(
            LocalDateTime.of(1970, 5, 3, 0, 0)
    );
    public static final Set<Address> ADDRESSES = emptySet();
    public static final Set<Insurance> insurances = emptySet();
    public static final Timestamp createdDate = Timestamp.from(Instant.now());
}

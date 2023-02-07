package com.albatha.nexthealth.prescription.defaultData;

import com.albatha.nexthealth.prescription.domain.PrescribedDrug;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Random;
import java.util.Set;
import static java.util.Collections.emptySet;

public class DefaultDrugData {
    public static final Long DRUG_ID = new Random().nextLong();
    public static final Set<PrescribedDrug> PRESCRIBED_DRUGS = emptySet();
    public static final String NAME = "Adol 50gm";
    public static final String CODE = "NDC31054323";
    public static final Timestamp CREATED_DATE = Timestamp.from(Instant.now());
}

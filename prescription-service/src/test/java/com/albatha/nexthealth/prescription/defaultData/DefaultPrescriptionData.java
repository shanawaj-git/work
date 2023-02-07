package com.albatha.nexthealth.prescription.defaultData;

import com.albatha.nexthealth.prescription.domain.Doctor;
import com.albatha.nexthealth.prescription.domain.Patient;
import com.albatha.nexthealth.prescription.domain.Facility;
import com.albatha.nexthealth.prescription.domain.Insurance;
import com.albatha.nexthealth.prescription.domain.PrescribedDrug;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Random;
import java.util.Set;

public class DefaultPrescriptionData {
    public static final Long ID = new Random().nextLong();
    public static final String PRESCRIPTION_NUMBER = "PRE-386283";
    public static final String RECORD_NUMBER = "REC-4386202";
    public static final Timestamp VISIT_DATE = Timestamp.valueOf(LocalDateTime.now());
    public static final String DIAGNOSIS = "Fever";
    public static final String PIN = "320832";
    public static final Patient PATIENT = null;
    public static final Doctor DOCTOR = null;
    public static final Facility SENDING_FACILITY = null;
    public static final Insurance INSURANCE = null;
    public static final Set<PrescribedDrug> PRESCRIBED_DRUGS = Collections.emptySet();
    public static final Timestamp CREATED_DATE = Timestamp.valueOf(LocalDateTime.now());
}

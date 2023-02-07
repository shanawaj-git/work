package com.albatha.nexthealth.prescription.builders;

import com.albatha.nexthealth.prescription.defaultData.DefaultDoctorData;
import com.albatha.nexthealth.prescription.domain.Doctor;

import java.sql.Timestamp;

public class DoctorBuilder {
    public Long doctorId = DefaultDoctorData.DOCTOR_ID;
    public String docId = DefaultDoctorData.DOC_ID;
    public String firstName = DefaultDoctorData.FIRST_NAME;
    public String middleName = DefaultDoctorData.MIDDLE_NAME;
    public String lastName = DefaultDoctorData.LAST_NAME;
    public String email = DefaultDoctorData.EMAIL;
    public String mobileNumber = DefaultDoctorData.MOBILE_NUMBER;
    public Timestamp createdDate = DefaultDoctorData.CREATED_DATE;

    public Doctor build() {
        return new Doctor(
            doctorId,
            docId,
            firstName,
            middleName,
            lastName,
            email,
            mobileNumber,
            createdDate
        );
    }
}

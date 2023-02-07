package com.albatha.nexthealth.prescription.domain;


import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;



@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@EqualsAndHashCode(exclude = "prescribedDrugs")
public class Prescription {

    @Id
    @SequenceGenerator(name = "prescription_sequence", sequenceName = "Prescription_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "prescription_sequence")
    private Long prescriptionId;

    @Column(unique = true)
    private String prescriptionNumber;
    private String recordNumber;
    private Timestamp visitDate;
    private String diagnosis;
    private String pin;

    @ManyToOne(cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "patient_id", referencedColumnName = "patientId")
    private Patient patient;

    @ManyToOne(targetEntity = Doctor.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "doctor_id", referencedColumnName = "doctorId")
    private Doctor doctor;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "sendingfacilityId", referencedColumnName = "facilityId")
    private Facility sendingFacility;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "insuranceId", referencedColumnName = "insuranceId")
    private Insurance insurance;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "prescription")
    private Set<PrescribedDrug> prescribedDrugs = new HashSet<>();

    @CreationTimestamp()
    private Timestamp createdDate;

    @Override
    public String toString() {
        return "Prescription{" +
                "prescriptionId=" + prescriptionId +
                '}';
    }
}

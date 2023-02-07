package com.albatha.nexthealth.prescription.domain;


import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Patient {
    @Id
    @SequenceGenerator(name = "patient_sequence", sequenceName = "patient_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "patient_sequence")
    private Long patientId;

    private String patId;
    private String emiratesId;
    private String mohId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private Timestamp dob;

    @OneToMany(targetEntity = Address.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "patientId", referencedColumnName = "patientId")
    private Set<Address> addressSet = new HashSet<>();

    @OneToMany(targetEntity = Insurance.class, cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "patientId", referencedColumnName = "patientId")
    private Set<Insurance> insuranceSet = new HashSet<>();

    @CreationTimestamp
    private Timestamp createdDate;
}

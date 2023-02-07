package com.albatha.nexthealth.patientsservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@ToString
public class Patient {
    @Id
    @GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
    @Column(updatable = false, nullable = false, unique = true)
    private UUID patientId;
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

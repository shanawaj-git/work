package com.albatha.nexthealth.patientsservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Address {

    @Id
    @GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
    @Column(updatable = false, nullable = false, unique = true)
    private UUID addressId;
    @ManyToOne
    @JoinColumn(name = "patientId", nullable = false)
    private Patient patient;
    private String flatVillaNumber;
    private String buildingName;
    private String formattedText;
    private String area;
    private String city;
    private String state;
    private String userNotes;
    @Column(columnDefinition = "varchar(255) default '00000'")
    private String postalCode;
    private String type;
    @Column(columnDefinition = "varchar(255) default 'UAE'")
    private String country;
    private double latitude;
    private double longitude;

    @CreationTimestamp
    private Timestamp createdDate;
}

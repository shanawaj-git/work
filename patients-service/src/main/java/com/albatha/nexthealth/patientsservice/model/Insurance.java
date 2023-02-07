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
public class Insurance {
    @Id
    @GenericGenerator(name = "UUIDGenerator", strategy = "uuid2")
    @GeneratedValue(generator = "UUIDGenerator")
    @Column(updatable = false, nullable = false, unique = true)
    private UUID insuranceId;
    private String insId;
    private String policyNumber;
    private String network;
    private Timestamp expiryDate;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "insuranceprovider_id", referencedColumnName = "insuranceproviderId")
    private InsuranceProvider insuranceProvider;

    @CreationTimestamp
    private Timestamp createdDate;
}

package com.albatha.nexthealth.prescription.domain;

import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
public class Insurance {

    @Id
    @SequenceGenerator(name = "insurance_sequence", sequenceName = "insurance_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "insurance_sequence")
    private Long insuranceId;

    private String insId;
    private String policyNumber;
    private String network;
    private Timestamp expiryDate;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "insuranceprovider_id", referencedColumnName = "insuranceproviderId")
    private InsuranceProvider provider;

    @CreationTimestamp
    private Timestamp createdDate;

    @Override
    public String toString() {
        return "Insurance{" +
                "insuranceId=" + insuranceId +
                '}';
    }
}

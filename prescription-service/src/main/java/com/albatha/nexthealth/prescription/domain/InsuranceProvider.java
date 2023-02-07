package com.albatha.nexthealth.prescription.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class InsuranceProvider {

    @Id
    @SequenceGenerator(name = "insuranceprovider_sequence", sequenceName = "insuranceprovider_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "insuranceprovider_sequence")
    private Long insuranceproviderId;

    String code;
    String eClaimLinkId;
    String name;

    @CreationTimestamp()
    private Timestamp createdDate;
}
